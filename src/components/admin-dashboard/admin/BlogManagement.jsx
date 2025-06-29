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
import { Plus, Edit, Trash2, Eye, Calendar, Upload, User } from 'lucide-react';
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

  const [selected, setSelected] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [authorImageFile, setAuthorImageFile] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    published: true,
  });

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      author: '',
      published: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setAuthorImageFile(null);
    setAuthorImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAuthorImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthorImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file, folder = 'blog-images') => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Failed to upload image');
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(folder).getPublicUrl(filePath);

    return publicUrl;
  };

  const handleCreate = async () => {
    if (!form.title || !form.content || !form.author) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      let imageUrl = null;
      let authorImageUrl = null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'blog-images');
      }

      if (authorImageFile) {
        authorImageUrl = await uploadImage(authorImageFile, 'author-images');
      }

      await createBlog.mutateAsync({
        ...form,
        image_url: imageUrl,
        author_image_url: authorImageUrl,
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
      author: a.author || '',
      published: a.published,
    });
    setImagePreview(a.image_url);
    setAuthorImagePreview(a.author_image_url);
    setImageFile(null);
    setAuthorImageFile(null);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = selected.image_url;
      let authorImageUrl = selected.author_image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'blog-images');
      }

      if (authorImageFile) {
        authorImageUrl = await uploadImage(authorImageFile, 'author-images');
      }

      await updateBlog.mutateAsync({
        ...selected,
        ...form,
        image_url: imageUrl,
        author_image_url: authorImageUrl,
      });
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

  // Extract all blogs from the infinite query data
  const allBlogs = data?.pages?.flatMap((page) => page.items || []) || [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Blog Articles</h1>
          <p className="text-sm lg:text-base text-gray-600">
            Create and manage blog content
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
              <Plus size={18} className="mr-2 lg:w-5 lg:h-5" /> Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 lg:space-y-6">
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <Label>Content</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={8}
                  placeholder="Write your article content..."
                />
              </div>

              <div>
                <Label>Author</Label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Featured Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto max-h-32 rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload
                          size={40}
                          className="mx-auto text-gray-400 mb-4 lg:w-12 lg:h-12"
                        />
                        <p className="text-sm lg:text-base text-gray-600">
                          Click to upload featured image
                        </p>
                      </>
                    )}
                    <div className="mt-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Author Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                    {authorImagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={authorImagePreview}
                          alt="Author Preview"
                          className="mx-auto max-h-32 rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setAuthorImageFile(null);
                            setAuthorImagePreview(null);
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <>
                        <User
                          size={40}
                          className="mx-auto text-gray-400 mb-4 lg:w-12 lg:h-12"
                        />
                        <p className="text-sm lg:text-base text-gray-600">
                          Click to upload author image
                        </p>
                      </>
                    )}
                    <div className="mt-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAuthorImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#010413] text-white"
                onClick={handleCreate}
              >
                Create Article
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {allBlogs.length > 0 ? (
          allBlogs.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm lg:text-base">
                      Article Image
                    </span>
                  )}
                </div>
                <div className="p-4 lg:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base lg:text-lg text-gray-900 flex-1 min-w-0">
                      <span className="truncate block">{article.title}</span>
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                        article.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2">
                    {article.content}
                  </p>

                  <div className="flex items-center text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">
                    <User size={14} className="mr-1 lg:w-4 lg:h-4" />
                    <span className="truncate">{article.author}</span>
                    <Calendar size={14} className="ml-3 mr-1 lg:w-4 lg:h-4" />
                    <span>
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex space-x-1 lg:space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7] text-xs lg:text-sm"
                        onClick={() => {
                          setSelected(article);
                          setViewOpen(true);
                        }}
                      >
                        <Eye size={14} className="mr-1 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7] text-xs lg:text-sm"
                        onClick={() => openEdit(article)}
                      >
                        <Edit size={14} className="mr-1 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelected(article);
                          setDeleteOpen(true);
                        }}
                        className="text-red-600 hover:text-red-700 border-[#eaecf0] hover:bg-[#f0f5f7] text-xs lg:text-sm"
                      >
                        <Trash2 size={14} className="lg:w-4 lg:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No blog articles found</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first article to get started
            </p>
          </div>
        )}
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
        imageFile={imageFile}
        setImageFile={setImageFile}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleImageChange={handleImageChange}
        authorImageFile={authorImageFile}
        setAuthorImageFile={setAuthorImageFile}
        authorImagePreview={authorImagePreview}
        setAuthorImagePreview={setAuthorImagePreview}
        handleAuthorImageChange={handleAuthorImageChange}
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
