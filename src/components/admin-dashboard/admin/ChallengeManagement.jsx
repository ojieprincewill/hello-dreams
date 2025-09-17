import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Edit, Trash2, Eye, Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "../ui/sonner";

import {
  useChallenges,
  useCreateChallenge,
  useUpdateChallenge,
  useDeleteChallenge,
} from "@/hooks/useChallenges";

const ChallengeManagement = () => {
  const { data: challenges = [], isLoading } = useChallenges();
  const createCh = useCreateChallenge();
  const updateCh = useUpdateChallenge();
  const deleteCh = useDeleteChallenge();

  const [selected, setSelected] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: "ui",
    title: "",
    challenge: "",
    deliverables: "",
  });

  const resetForm = () =>
    setFormData({
      type: "ui",
      title: "",
      challenge: "",
      deliverables: "",
    });

  const handleCreate = async () => {
    try {
      await createCh.mutateAsync(formData);
      toast.success("Challenge created successfully!");
      resetForm();
      setViewOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const openEdit = (c) => {
    setSelected(c);
    setFormData({
      type: c.type,
      title: c.title,
      challenge: c.challenge,
      deliverables: c.deliverables,
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateCh.mutateAsync({ ...selected, ...formData });
      toast.success("Challenge updated successfully!");
      setEditOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCh.mutateAsync(selected);
      toast.success("Challenge deleted successfully!");
      setDeleteOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 xl:space-y-8">
      {/* Create */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold">UI/UX Challenges</h1>
          <p className="text-sm xl:text-base text-gray-600">
            Create design challenges for the community
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
              <Plus size={18} className="mr-2 xl:w-5 xl:h-5" /> Create Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl mx-4">
            <DialogHeader>
              <DialogTitle>New Challenge</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* type, title, challenge, deliverables Inputs */}
              <div>
                <Label>Type</Label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="ui">UI Challenge</option>
                  <option value="ux">UX Challenge</option>
                </select>
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Challenge</Label>
                <Textarea
                  value={formData.challenge}
                  onChange={(e) =>
                    setFormData({ ...formData, challenge: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div>
                <Label>Deliverables</Label>
                <Textarea
                  value={formData.deliverables}
                  onChange={(e) =>
                    setFormData({ ...formData, deliverables: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <div className="space-y-4 xl:space-y-6">
        {challenges.map((c) => (
          <Card key={`${c.type}-${c.id}`}>
            <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-start pt-4 xl:pt-6 gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <Target size={18} className="xl:w-5 xl:h-5" />
                    <h3 className="text-base xl:text-lg font-semibold truncate">
                      {c.title}
                    </h3>
                  </div>
                  <Badge
                    className={
                      c.type === "ui"
                        ? "bg-indigo-100 text-indigo-700 text-xs xl:text-sm"
                        : "bg-green-100 text-green-700 text-xs xl:text-sm"
                    }
                  >
                    {c.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm xl:text-base text-gray-600 line-clamp-2">
                  {c.challenge}
                </p>
                <p className="text-xs xl:text-sm text-gray-500 mt-1">
                  <strong>Deliverables:</strong> {c.deliverables}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:space-x-2 sm:ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs xl:text-sm"
                  onClick={() => {
                    setSelected(c);
                    setViewOpen(true);
                  }}
                >
                  <Eye size={14} className="mr-1 xl:w-4 xl:h-4" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs xl:text-sm"
                  onClick={() => openEdit(c)}
                >
                  <Edit size={14} className="mr-1 xl:w-4 xl:h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 text-xs xl:text-sm"
                  onClick={() => {
                    setSelected(c);
                    setDeleteOpen(true);
                  }}
                >
                  <Trash2 size={14} className="xl:w-4 xl:h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={() => setViewOpen(false)}>
        <DialogContent className="max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle>View Challenge</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm xl:text-base">
              <strong>Type:</strong> {selected?.type.toUpperCase()}
            </p>
            <p className="text-sm xl:text-base">
              <strong>Title:</strong> {selected?.title}
            </p>
            <p className="text-sm xl:text-base">
              <strong>Description:</strong> {selected?.challenge}
            </p>
            <p className="text-sm xl:text-base">
              <strong>Deliverables:</strong> {selected?.deliverables}
            </p>
            <Button className="mt-4 w-full" onClick={() => setViewOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={() => setEditOpen(false)}>
        <DialogContent className="max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle>Edit Challenge</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Type</Label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="ui">UI Challenge</option>
                <option value="ux">UX Challenge</option>
              </select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Challenge</Label>
              <Textarea
                value={formData.challenge}
                onChange={(e) =>
                  setFormData({ ...formData, challenge: e.target.value })
                }
                rows={4}
              />
            </div>
            <div>
              <Label>Deliverables</Label>
              <Textarea
                value={formData.deliverables}
                onChange={(e) =>
                  setFormData({ ...formData, deliverables: e.target.value })
                }
                rows={3}
              />
            </div>
            <Button onClick={handleUpdate} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteOpen} onOpenChange={() => setDeleteOpen(false)}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Delete Challenge</DialogTitle>
          </DialogHeader>
          <p className="text-sm xl:text-base">
            Are you sure you want to delete "{selected?.title}"? This cannot be
            undone.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChallengeManagement;
