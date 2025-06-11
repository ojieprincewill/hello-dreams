import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="text-red-500" size={24} />
            <span>Confirm Delete</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600 mt-2">{message}</p>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;
