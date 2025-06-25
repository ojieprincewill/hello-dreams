import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Badge } from '../../ui/badge';

const JobViewModal = ({ job, isOpen, onClose }) => {
  if (!job) return null;

  function formatDate(isoDateStr) {
    const date = new Date(isoDateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title + Status */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{job.title}</div>
            <Badge variant="default">{job.status || 'Open'}</Badge>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Application Instructions */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Application Instructions</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.application_instructions?.trim()
                ? job.application_instructions
                : 'Not provided'}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-500">Company</p>
              <p className="font-medium">{job.company_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Company Email</p>
              <p className="font-medium">{job.company_email}</p>
            </div>
            <div>
              <p className="text-gray-500">Experience Level</p>
              <p className="font-medium">{job.experience_level}</p>
            </div>
            <div>
              <p className="text-gray-500">Pay Type</p>
              <p className="font-medium capitalize">{job.pay_type}</p>
            </div>
            <div>
              <p className="text-gray-500">Work Hours</p>
              <p className="font-medium">{job.work_hours} hours/week</p>
            </div>
            <div>
              <p className="text-gray-500">Transaction Ref</p>
              <p className="font-medium">
                {job.payment_reference || 'Not available'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Published</p>
              <p className="font-medium">
                {job.published === 'true' ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Posted On</p>
              <p className="font-medium">{formatDate(job.created_at)}</p>
            </div>
            <div>
              <p className="text-gray-500">Last Updated</p>
              <p className="font-medium">{formatDate(job.updated_at)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobViewModal;
