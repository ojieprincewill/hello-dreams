import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
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
  });

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="text-gray-600">Manage job opportunities</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus size={20} className="mr-2" /> Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
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

              <div className="grid grid-cols-2 gap-4">
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
                  <Input
                    value={newJob.hoursNeeded}
                    onChange={(e) =>
                      setNewJob({ ...newJob, hoursNeeded: e.target.value })
                    }
                    placeholder="e.g., 40 hours/week"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pay Type</Label>
                  <Select
                    value={newJob.payType}
                    onValueChange={(val) =>
                      setNewJob({ ...newJob, payType: val })
                    }
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

              <div className="grid grid-cols-2 gap-4">
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
          <Card key={job.id} className="pt-6">
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <span className="text-sm text-gray-500">
                    {job.experience_level}
                  </span>
                </div>
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedJob(job);
                      setViewModalOpen(true);
                    }}
                  >
                    <Eye size={16} /> View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedJob(job);
                      setEditModalOpen(true);
                    }}
                  >
                    <Edit size={16} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    className="text-red-600"
                    onClick={() => {
                      setSelectedJob(job);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
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
