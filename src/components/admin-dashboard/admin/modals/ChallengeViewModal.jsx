import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { Target, Users, Calendar } from "lucide-react";

const ChallengeViewModal = ({ challenge, isOpen, onClose }) => {
  if (!challenge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="text-purple-600" size={24} />
            <span>Challenge Details</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{challenge.title}</h2>
              <Badge
                variant="default"
                className="bg-purple-100 text-purple-800"
              >
                {challenge.status}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Challenge Description:
              </h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {challenge.challenge}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Deliverables:</h3>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {challenge.deliverables}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-semibold">{challenge.participants}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-semibold">{challenge.deadline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeViewModal;
