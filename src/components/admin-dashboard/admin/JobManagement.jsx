import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Clock,
  Award,
} from "lucide-react";
import JobViewModal from "./modals/JobViewModal";
import JobEditModal from "./modals/JobEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import { useToast } from "../hooks/use-toast";

const JobManagement = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior UX Designer",
      description:
        "We are looking for a senior UX designer to join our team and lead design projects.",
      transactionRef: "TXN-2024-001",
      postedDate: "2024-01-15",
      status: "Active",
      hoursNeeded: 40,
      experience: "Senior",
      payAmount: 5000,
      payType: "monthly",
    },
    {
      id: 2,
      title: "Frontend Developer",
      description:
        "Join our development team to build amazing user interfaces with React and TypeScript.",
      transactionRef: "TXN-2024-002",
      postedDate: "2024-01-10",
      status: "Active",
      hoursNeeded: 35,
      experience: "Mid-level",
      payAmount: 50,
      payType: "hourly",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    transactionRef: "",
    hoursNeeded: 40,
    experience: "Entry-level",
    payAmount: 0,
    payType: "hourly",
  });

  const generateTransactionRef = () => {
    const ref = `TXN-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;
    setNewJob({ ...newJob, transactionRef: ref });
  };

  const handleView = (job) => {
    setSelectedJob(job);
    setViewModalOpen(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const handleDelete = (job) => {
    setSelectedJob(job);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedJob) {
      setJobs(jobs.filter((j) => j.id !== selectedJob.id));
      toast({
        title: "Job posting deleted",
        description: `${selectedJob.title} has been successfully deleted.`,
      });
      setDeleteModalOpen(false);
      setSelectedJob(null);
    }
  };

  const handleSave = (updatedJob) => {
    setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    toast({
      title: "Job posting updated",
      description: `${updatedJob.title} has been successfully updated.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600 mt-2">
            Manage job opportunities and track applications
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus size={20} className="mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({ ...newJob, title: e.target.value })
                  }
                  placeholder="Enter job title"
                />
              </div>

              <div>
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                  placeholder="Enter detailed job description"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours-needed">Hours Needed</Label>
                  <Input
                    id="hours-needed"
                    type="number"
                    value={newJob.hoursNeeded}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        hoursNeeded: parseInt(e.target.value),
                      })
                    }
                    placeholder="40"
                  />
                </div>

                <div>
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select
                    value={newJob.experience}
                    onValueChange={(value) =>
                      setNewJob({ ...newJob, experience: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry-level">Entry-level</SelectItem>
                      <SelectItem value="Mid-level">Mid-level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pay-amount">Pay Amount</Label>
                  <Input
                    id="pay-amount"
                    type="number"
                    value={newJob.payAmount}
                    onChange={(e) =>
                      setNewJob({
                        ...newJob,
                        payAmount: parseFloat(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="pay-type">Pay Type</Label>
                  <Select
                    value={newJob.payType}
                    onValueChange={(value) =>
                      setNewJob({ ...newJob, payType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="transaction-ref">Transaction Reference</Label>
                <div className="flex space-x-2">
                  <Input
                    id="transaction-ref"
                    value={newJob.transactionRef}
                    onChange={(e) =>
                      setNewJob({ ...newJob, transactionRef: e.target.value })
                    }
                    placeholder="Transaction reference for payment tracking"
                    readOnly
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateTransactionRef}
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This reference ties the job posting to a successful payment
                </p>
              </div>

              <Button className="w-full">Post Job</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-xl text-gray-900">
                      {job.title}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {job.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{job.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-blue-600" />
                      <span className="text-sm">
                        {job.hoursNeeded} hours/week
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award size={16} className="text-purple-600" />
                      <span className="text-sm">{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-green-600" />
                      <span className="text-sm">
                        ${job.payAmount}/{job.payType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-600" />
                      <span className="text-sm">Ref: {job.transactionRef}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <span>Posted: {job.postedDate}</span>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(job)}
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(job)}
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(job)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
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
        onConfirm={confirmDelete}
        title={`Delete "${selectedJob?.title}"`}
        message="Are you sure you want to delete this job posting? This action cannot be undone."
      />
    </div>
  );
};

export default JobManagement;
