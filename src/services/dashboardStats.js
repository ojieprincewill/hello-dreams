// services/dashboardStats.js
import supabase  from '../supabase/client';

function getMonthRange(offset = 0) {
  const now = new Date();
  const month = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const start = new Date(month);
  const end = new Date(month);
  end.setMonth(end.getMonth() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

async function getCount(table, timestampCol = 'created_at', offset = 0) {
  const { start, end } = getMonthRange(offset);

  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .gte(timestampCol, start)
    .lt(timestampCol, end);

  if (error) throw error;
  return count ?? 0;
}

function calculateChange(current, previous) {
  if (previous === 0 && current > 0) return 100;
  if (previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
}

export async function fetchDashboardStats() {
  const [studentsThisMonth, studentsLastMonth] = await Promise.all([
    getCount('students'),
    getCount('students', 'created_at', -1),
  ]);

  const [coursesThisMonth, coursesLastMonth] = await Promise.all([
    getCount('courses'),
    getCount('courses', 'created_at', -1),
  ]);

  const [jobsThisMonth, jobsLastMonth] = await Promise.all([
    getCount('job_postings'),
    getCount('job_postings', 'created_at', -1),
  ]);

  const { data: payments, error } = await supabase
    .from('payments')
    .select('amount, created_at');

  if (error) throw error;

  const now = new Date();
  const thisMonthRange = getMonthRange(0);
  const lastMonthRange = getMonthRange(-1);

  const revenueThisMonth = payments
    .filter(
      (p) =>
        new Date(p.created_at) >= new Date(thisMonthRange.start) &&
        new Date(p.created_at) < new Date(thisMonthRange.end)
    )
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const revenueLastMonth = payments
    .filter(
      (p) =>
        new Date(p.created_at) >= new Date(lastMonthRange.start) &&
        new Date(p.created_at) < new Date(lastMonthRange.end)
    )
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return {
    totalStudents: studentsThisMonth,
    studentChange: calculateChange(studentsThisMonth, studentsLastMonth),
    activeCourses: coursesThisMonth,
    courseChange: calculateChange(coursesThisMonth, coursesLastMonth),
    jobPostings: jobsThisMonth,
    jobChange: calculateChange(jobsThisMonth, jobsLastMonth),
    revenue: revenueThisMonth,
    revenueChange: calculateChange(revenueThisMonth, revenueLastMonth),
  };
}

export async function fetchRecentActivity() {
  const { data, error } = await supabase
    .from('recent_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}