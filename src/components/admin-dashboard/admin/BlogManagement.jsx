import React, { useState, useEffect } from 'react';
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
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BlogViewModal from './modals/BlogViewModal';
import BlogEditModal from './modals/BlogEditModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';

import {
  useBlogs,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from '@/hooks/useBlogs';
import supabase from '@/supabase/client';

const BlogManagement = () => {
  const { toast } = useToast();
  const blogsQuery = useBlogs();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const [currentUser, setCurrentUser] = useState(null);
  const [selected, setSelected] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    content: '',
    published: false,
  });

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.data.user) setCurrentUser(res.data.user.id);
    });
  }, []);

  const resetForm = () =>
    setForm({
      title: '',
      content: '',
      published: false,
    });

  const handleCreate = async () => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'Not authenticated',
        variant: 'destructive',
      });
      return;
    }
    try {
      await createBlog.mutateAsync({
        ...form,
        author_id: currentUser,
      });
      toast({ title: 'Article created' });
      resetForm();
      setViewOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const openEdit = (a) => {
    setSelected(a);
    setForm({
      title: a.title,
      content: a.content,
      published: a.published,
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateBlog.mutateAsync({ ...selected, ...form });
      toast({ title: 'Article updated' });
      setEditOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog.mutateAsync(selected.id);
      toast({ title: 'Article deleted' });
      setDeleteOpen(false);
    } catch (e) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    blogsQuery;

  if (isLoading) return <p>Loading...</p>;

  const allBlogs = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="space-y-8">
      {/* CREATE */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-gray-600">Create and manage articles</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus size={20} className="mr-2" /> Write Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={10}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                />{' '}
                <Label>Published?</Label>
              </div>
              <Button onClick={handleCreate} className="w-full">
                Create Article
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {allBlogs.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      a.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {a.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {a.content}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelected(a);
                    setViewOpen(true);
                  }}
                >
                  <Eye size={16} />
                </Button>
                <Button size="sm" onClick={() => openEdit(a)}>
                  <Edit size={16} />
                </Button>
                <Button
                  size="sm"
                  className="text-red-600"
                  onClick={() => {
                    setSelected(a);
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

      {/* LOAD MORE */}
      {hasNextPage && (
        <div className="text-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* MODALS */}
      <BlogViewModal
        article={selected}
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
      />
      <BlogEditModal
        form={form}
        setForm={setForm}
        article={selected}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
      />
      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title={`Delete "${selected?.title}"`}
        message="This can't be undone."
      />
    </div>
  );
};

export default BlogManagement;
