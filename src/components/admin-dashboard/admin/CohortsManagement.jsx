import React, { useState, useMemo } from "react";
import { useCohorts, useUpsertCohort } from "@/hooks/useCohorts";

const CohortsManagement = () => {
  const { data: cohorts = [], isLoading, isError, error } = useCohorts();
  const upsert = useUpsertCohort();
  const existingUpcoming = useMemo(() => cohorts.find(c => c.is_upcoming), [cohorts]);

  const [form, setForm] = useState({
    id: existingUpcoming?.id || undefined,
    category: existingUpcoming?.category || "UI/UX Cohort",
    course_details: existingUpcoming?.course_details || "",
    requirements: existingUpcoming?.requirements || "",
    curriculum: existingUpcoming?.curriculum || "",
    price: existingUpcoming?.price || 0,
    old_price: existingUpcoming?.old_price || 0,
    currency: existingUpcoming?.currency || "NGN",
    start_date: existingUpcoming?.start_date || "",
    is_upcoming: true,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" || name === "old_price" ? Number(value || 0) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await upsert.mutateAsync(form);
  };

  // Show error message if table doesn't exist
  if (isError && error?.message?.includes('404')) {
    return (
      <div className="space-y-6 xl:space-y-8">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">Cohorts</h1>
          <p className="text-sm xl:text-base text-gray-600 mt-1 xl:mt-2">Manage upcoming cohort details</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Database Setup Required</h3>
          <p className="text-red-700 mb-4">
            The cohorts table doesn't exist yet. Please run the following SQL in your Supabase SQL Editor:
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <code className="text-sm text-gray-800">
              -- Run the SQL from cohorts_table_migration.sql file
            </code>
          </div>
          <p className="text-sm text-red-600">
            After running the migration, refresh this page to access the cohorts management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">Cohorts</h1>
        <p className="text-sm xl:text-base text-gray-600 mt-1 xl:mt-2">Manage upcoming cohort details</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 xl:p-6">
        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <input name="category" value={form.category} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Course details</label>
            <textarea name="course_details" value={form.course_details} onChange={onChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Requirements</label>
            <textarea name="requirements" value={form.requirements} onChange={onChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Curriculum</label>
            <textarea name="curriculum" value={form.curriculum} onChange={onChange} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Price</label>
              <input type="number" name="price" value={form.price} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Old price</label>
              <input type="number" name="old_price" value={form.old_price} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Currency</label>
              <input name="currency" value={form.currency} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Start date</label>
            <input type="date" name="start_date" value={form.start_date || ""} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
          </div>
          <div>
            <button disabled={upsert.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer disabled:opacity-60">
              {upsert.isPending ? "Saving..." : "Save Cohort"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CohortsManagement;


