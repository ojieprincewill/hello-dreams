import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Plus, Edit, Trash2, Eye, Target } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useToast } from '../hooks/use-toast';

import {
  useChallenges,
  useCreateChallenge,
  useUpdateChallenge,
  useDeleteChallenge,
} from '@/hooks/useChallenges';

const ChallengeManagement = () => {
  const { toast } = useToast();
  const { data: challenges = [], isLoading } = useChallenges();
  const createCh = useCreateChallenge();
  const updateCh = useUpdateChallenge();
  const deleteCh = useDeleteChallenge();

  const [selected, setSelected] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: 'ui',
    title: '',
    challenge: '',
    deliverables: '',
  });

  const resetForm = () =>
    setFormData({
      type: 'ui',
      title: '',
      challenge: '',
      deliverables: '',
    });

  const handleCreate = async () => {
    try {
      await createCh.mutateAsync(formData);
      toast({ title: 'Challenge created' });
      resetForm();
      setViewOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
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
      toast({ title: 'Challenge updated' });
      setEditOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCh.mutateAsync(selected);
      toast({ title: 'Challenge deleted' });
      setDeleteOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      {/* Create */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">UI/UX Challenges</h1>
          <p className="text-gray-600">
            Create design challenges for the community
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus size={20} className="mr-2" /> Create Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
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
      <div className="space-y-6">
        {challenges.map((c) => (
          <Card key={`${c.type}-${c.id}`}>
            <CardContent className="flex justify-between items-center pt-6">
              <div>
                <div className="flex items-center space-x-2">
                  <Target size={20} />
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <Badge
                    className={
                      c.type === 'ui'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-green-100 text-green-700'
                    }
                  >
                    {c.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-gray-600 max-w-[45ch]">{c.challenge}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Deliverables:</strong> {c.deliverables}
                </p>
              </div>
              <div className="space-x-2 ml-4">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelected(c);
                    setViewOpen(true);
                  }}
                >
                  <Eye size={16} />
                </Button>
                <Button size="sm" onClick={() => openEdit(c)}>
                  <Edit size={16} />
                </Button>
                <Button
                  size="sm"
                  className="text-red-600"
                  onClick={() => {
                    setSelected(c);
                    setDeleteOpen(true);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={viewOpen} onOpenChange={() => setViewOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>View Challenge</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <strong>Type:</strong> {selected?.type.toUpperCase()}
            </p>
            <p>
              <strong>Title:</strong> {selected?.title}
            </p>
            <p>
              <strong>Description:</strong> {selected?.challenge}
            </p>
            <p>
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
        <DialogContent className="max-w-2xl">
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
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Challenge</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete "{selected?.title}"? This cannot be
            undone.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
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
