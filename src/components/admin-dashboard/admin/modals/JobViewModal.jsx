import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { DollarSign, Calendar } from "lucide-react";

const JobViewModal = ({ job, isOpen, onClose }) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <Badge variant="default">{job.status}</Badge>
            </div>

            <p className="text-gray-600">{job.description}</p>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Transaction Ref</p>
                  <p className="font-semibold">{job.transactionRef}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <p className="font-semibold">{job.postedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobViewModal;
