import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Clock,
  Award,
  Building,
  Mail,
  Calendar,
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import JobViewModal from './modals/JobViewModal';
import JobEditModal from './modals/JobEditModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

import {
  useJobs,
  useCreateJob,
  useUpdateJob,
  useDeleteJob,
} from '@/hooks/useJobs';

const JobManagement = () => {
  const { toast } = useToast();
  const { data: jobs = [], isLoading } = useJobs();
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();

  const [selectedJob, setSelectedJob] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    transactionRef: '',
    hoursNeeded: '40',
    experience: 'Entry-level',
    payAmount: 0,
    payType: 'hourly',
    applicationInstructions: '',
    companyName: '',
    companyEmail: '',
    published: false,
  });

  // Generate work hours options
  const workHoursOptions = Array.from({ length: 36 }, (_, i) =>
    (i + 5).toString(),
  );

  const generateTransactionRef = () =>
    setNewJob((prev) => ({
      ...prev,
      transactionRef: `TXN-${new Date().getFullYear()}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(3, '0')}`,
    }));

  const handleCreate = async () => {
    try {
      await createJob.mutateAsync({
        title: newJob.title,
        description: newJob.description,
        experience_level: newJob.experience,
        work_hours: newJob.hoursNeeded,
        pay_type: newJob.payType,
        transaction_id: null,
        payment_reference: newJob.transactionRef,
        application_instructions: newJob.applicationInstructions,
        company_name: newJob.companyName,
        company_email: newJob.companyEmail,
        published: newJob.published,
      });
      toast({
        title: 'Job posted',
        description: `${newJob.title} is now live.`,
      });
      setNewJob({
        title: '',
        description: '',
        transactionRef: '',
        hoursNeeded: '40',
        experience: 'Entry-level',
        payAmount: 0,
        payType: 'hourly',
        applicationInstructions: '',
        companyName: '',
        companyEmail: '',
        published: false,
      });
      setViewModalOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleSave = async (job) => {
    try {
      await updateJob.mutateAsync({
        ...job,
        hoursNeeded: job.hoursNeeded,
        transactionRef: job.payment_reference,
        applicationInstructions: job.application_instructions,
        companyName: job.company_name,
        companyEmail: job.company_email,
      });
      toast({ title: 'Job updated', description: `${job.title} was updated.` });
      setEditModalOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob.mutateAsync({ id: selectedJob.id });
      toast({ title: 'Deleted', description: `${selectedJob.title} removed.` });
      setDeleteModalOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleTogglePublished = async (job) => {
    try {
      const newPublishedState = !job.published;

      await updateJob.mutateAsync({
        ...job,
        published: newPublishedState,
      });

      toast({
        title: newPublishedState ? 'Job published' : 'Job unpublished',
        description: `${job.title} is now ${
          newPublishedState ? 'published' : 'unpublished'
        }.`,
      });
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Job Postings</h1>
          <p className="text-sm lg:text-base text-gray-600">
            Manage job opportunities
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              <Plus size={18} className="mr-2 lg:w-5 lg:h-5" /> Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 lg:space-y-6">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({ ...newJob, title: e.target.value })
                  }
                  placeholder="e.g., Frontend Developer"
                />
              </div>

              <div>
                <Label>Job Description</Label>
                <Textarea
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Experience Level</Label>
                  <Select
                    value={newJob.experience}
                    onValueChange={(val) =>
                      setNewJob({ ...newJob, experience: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry-level">Entry-level</SelectItem>
                      <SelectItem value="Mid-level">Mid-level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Work Hours</Label>
                  <Select
                    value={newJob.hoursNeeded}
                    onValueChange={(val) =>
                      setNewJob({ ...newJob, hoursNeeded: val })
                    }
                    disabled={newJob.payType === 'contract'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {workHoursOptions.map((hours) => (
                        <SelectItem key={hours} value={hours}>
                          {hours} hours/week
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {newJob.payType === 'contract' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Work hours are not applicable for contract positions
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Pay Type</Label>
                  <Select
                    value={newJob.payType}
                    onValueChange={(val) => {
                      setNewJob({ ...newJob, payType: val });
                      // Reset hours if switching to contract
                      if (val === 'contract') {
                        setNewJob((prev) => ({
                          ...prev,
                          payType: val,
                          hoursNeeded: '',
                        }));
                      } else if (newJob.hoursNeeded === '') {
                        setNewJob((prev) => ({
                          ...prev,
                          payType: val,
                          hoursNeeded: '40',
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pay type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Pay Amount</Label>
                  <Input
                    type="number"
                    value={newJob.payAmount}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        payAmount: parseFloat(e.target.value),
                      })
                    }
                    placeholder="e.g., 5000"
                  />
                </div>
              </div>

              <div>
                <Label>Application Instructions</Label>
                <Textarea
                  value={newJob.applicationInstructions}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      applicationInstructions: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={newJob.companyName}
                    onChange={(e) =>
                      setNewJob({ ...newJob, companyName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Company Email</Label>
                  <Input
                    type="email"
                    value={newJob.companyEmail}
                    onChange={(e) =>
                      setNewJob({ ...newJob, companyEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Published</Label>
                <Select
                  value={newJob.published ? 'true' : 'false'}
                  onValueChange={(val) =>
                    setNewJob({ ...newJob, published: val === 'true' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Published</SelectItem>
                    <SelectItem value="false">Unpublished</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Only published jobs will be visible on the site.
                </p>
              </div>

              <Button className="w-full" onClick={handleCreate}>
                Post Job
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="pt-4 lg:pt-6">
            <CardContent>
              <div className="space-y-4">
                {/* Header with title and actions */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base lg:text-lg text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 mb-2">
                      <Building size={14} className="lg:w-4 lg:h-4" />
                      <span className="truncate">
                        {job.company_name || 'Company not specified'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs lg:text-sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setViewModalOpen(true);
                      }}
                    >
                      <Eye size={14} className="mr-1 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs lg:text-sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setEditModalOpen(true);
                      }}
                    >
                      <Edit size={14} className="mr-1 lg:w-4 lg:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 text-xs lg:text-sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 size={14} className="lg:w-4 lg:h-4" />
                    </Button>
                  </div>
                </div>

                {/* Job details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <Award
                      size={14}
                      className="text-blue-600 lg:w-4 lg:h-4 flex-shrink-0"
                    />
                    <div>
                      <span className="text-gray-500">Experience:</span>
                      <span className="ml-1 font-medium">
                        {job.experience_level}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <Clock
                      size={14}
                      className="text-green-600 lg:w-4 lg:h-4 flex-shrink-0"
                    />
                    <div>
                      <span className="text-gray-500">Hours:</span>
                      <span className="ml-1 font-medium">
                        {job.pay_type === 'contract'
                          ? 'Contract'
                          : `${job.work_hours || 'N/A'} hrs/week`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <DollarSign
                      size={14}
                      className="text-purple-600 lg:w-4 lg:h-4 flex-shrink-0"
                    />
                    <div>
                      <span className="text-gray-500">Pay:</span>
                      <span className="ml-1 font-medium">
                        {job.pay_type === 'contract'
                          ? 'Contract'
                          : `${job.pay_type} rate`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <Calendar
                      size={14}
                      className="text-orange-600 lg:w-4 lg:h-4 flex-shrink-0"
                    />
                    <div>
                      <span className="text-gray-500">Posted:</span>
                      <span className="ml-1 font-medium">
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description preview */}
                {job.description && (
                  <div className="text-xs lg:text-sm text-gray-600 line-clamp-2">
                    {job.description}
                  </div>
                )}

                {/* Company contact info */}
                {job.company_email && (
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                    <Mail size={14} className="lg:w-4 lg:h-4" />
                    <span className="truncate">{job.company_email}</span>
                  </div>
                )}

                {/* Published toggle switch */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs lg:text-sm font-medium text-gray-700">
                      Published Status:
                    </span>
                    <span
                      className={`text-xs lg:text-sm font-medium ${
                        job.published ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {job.published ? 'Published' : 'Unpublished'}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2 ">
                    <Switch
                      checked={job.published}
                      onCheckedChange={() => handleTogglePublished(job)}
                      className={`${
                        job.published
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    />
                    <span className="text-xs text-green-500">
                      {job.published ? 'Live' : 'Draft'}
                    </span>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <JobViewModal
        job={selectedJob}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <JobEditModal
        job={selectedJob}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={`Delete "${selectedJob?.title}"`}
        message="This cannot be undone."
      />
    </div>
  );
};

export default JobManagement;
