import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const JobEditModal = ({ job, isOpen, onClose, onSave }) => {
  const [editedJob, setEditedJob] = useState(null);

  // Generate work hours options
  const workHoursOptions = Array.from({ length: 36 }, (_, i) =>
    (i + 5).toString()
  );

  useEffect(() => {
    if (job) {
      setEditedJob({ ...job });
    }
  }, [job]);

  const handleSave = () => {
    if (editedJob) {
      onSave(editedJob);
      onClose();
    }
  };

  if (!editedJob) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle>Edit Job Posting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 xl:space-y-6">
          <div>
            <Label htmlFor="edit-job-title">Job Title</Label>
            <Input
              id="edit-job-title"
              value={editedJob.title}
              onChange={(e) =>
                setEditedJob({ ...editedJob, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-job-description">Job Description</Label>
            <Textarea
              id="edit-job-description"
              value={editedJob.description}
              onChange={(e) =>
                setEditedJob({ ...editedJob, description: e.target.value })
              }
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-experience-level">Experience Level</Label>
              <Select
                value={editedJob.experience}
                onValueChange={(value) =>
                  setEditedJob({ ...editedJob, experience: value })
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

            <div>
              <Label htmlFor="edit-hours-needed">Work Hours</Label>
              <Select
                value={editedJob.hoursNeeded?.toString() || ""}
                onValueChange={(value) =>
                  setEditedJob({
                    ...editedJob,
                    hoursNeeded: value,
                  })
                }
                disabled={editedJob.payType === "contract"}
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
              {editedJob.payType === "contract" && (
                <p className="text-xs text-gray-500 mt-1">
                  Work hours are not applicable for contract positions
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-pay-type">Pay Type</Label>
              <Select
                value={editedJob.payType}
                onValueChange={(value) => {
                  setEditedJob({ ...editedJob, payType: value });
                  // Reset hours if switching to contract
                  if (value === "contract") {
                    setEditedJob((prev) => ({
                      ...prev,
                      payType: value,
                      hoursNeeded: "",
                    }));
                  } else if (editedJob.hoursNeeded === "") {
                    setEditedJob((prev) => ({
                      ...prev,
                      payType: value,
                      hoursNeeded: "40",
                    }));
                  }
                }}
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

            <div>
              <Label htmlFor="edit-pay-amount">Pay Amount</Label>
              <Input
                id="edit-pay-amount"
                type="number"
                value={editedJob.payAmount}
                onChange={(e) =>
                  setEditedJob({
                    ...editedJob,
                    payAmount: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-job-ref">Transaction Reference</Label>
            <Input
              id="edit-job-ref"
              value={editedJob.transactionRef}
              onChange={(e) =>
                setEditedJob({ ...editedJob, transactionRef: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobEditModal;
