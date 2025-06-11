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

const ChallengeEditModal = ({ challenge, isOpen, onClose, onSave }) => {
  const [editedChallenge, setEditedChallenge] = useState(null);

  useEffect(() => {
    if (challenge) {
      setEditedChallenge({ ...challenge });
    }
  }, [challenge]);

  const handleSave = () => {
    if (editedChallenge) {
      onSave(editedChallenge);
      onClose();
    }
  };

  if (!editedChallenge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit UI/UX Challenge</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="edit-challenge-title">Challenge Title</Label>
            <Input
              id="edit-challenge-title"
              value={editedChallenge.title}
              onChange={(e) =>
                setEditedChallenge({
                  ...editedChallenge,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-challenge-description">
              Challenge Description
            </Label>
            <Textarea
              id="edit-challenge-description"
              value={editedChallenge.challenge}
              onChange={(e) =>
                setEditedChallenge({
                  ...editedChallenge,
                  challenge: e.target.value,
                })
              }
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="edit-challenge-deliverables">Deliverables</Label>
            <Textarea
              id="edit-challenge-deliverables"
              value={editedChallenge.deliverables}
              onChange={(e) =>
                setEditedChallenge({
                  ...editedChallenge,
                  deliverables: e.target.value,
                })
              }
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="edit-challenge-deadline">Deadline</Label>
            <Input
              id="edit-challenge-deadline"
              type="date"
              value={editedChallenge.deadline}
              onChange={(e) =>
                setEditedChallenge({
                  ...editedChallenge,
                  deadline: e.target.value,
                })
              }
            />
          </div>

          <div className="flex space-x-3">
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

export default ChallengeEditModal;
