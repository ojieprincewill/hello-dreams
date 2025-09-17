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
import { Plus, Edit, Trash2, Eye, Calendar, Upload, User } from "lucide-react";
import { toast } from "../ui/sonner";
import BlogViewModal from "./modals/BlogViewModal";
import BlogEditModal from "./modals/BlogEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

import {
  useBlogs,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from "@/hooks/useBlogs";
import supabase from "@/supabase/client";

const BlogManagement = () => {
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
    title: "",
    content: "",
    author: "",
    published: true,
  });

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      author: "",
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

  const uploadImage = async (file, folder = "blog-images") => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error("Failed to upload image");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(folder).getPublicUrl(filePath);

    return publicUrl;
  };

  const handleCreate = async () => {
    if (!form.title || !form.content || !form.author) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      let imageUrl = null;
      let authorImageUrl = null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "blog-images");
      }

      if (authorImageFile) {
        authorImageUrl = await uploadImage(authorImageFile, "author-images");
      }

      await createBlog.mutateAsync({
        ...form,
        image_url: imageUrl,
        author_image_url: authorImageUrl,
      });
      toast.success("Article created successfully!");
      resetForm();
      setViewOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const openEdit = (a) => {
    setSelected(a);
    setForm({
      title: a.title,
      content: a.content,
      author: a.author || "",
      published: a.published,
    });
    setImagePreview(a.image_url);
    setAuthorImagePreview(a.author_image_url);
    setImageFile(null);
    setAuthorImageFile(null);
    setEditOpen(true);
  };

  const handleUpdate = async (updatedArticle) => {
    try {
      let imageUrl = updatedArticle.image_url;
      let authorImageUrl = updatedArticle.author_image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "blog-images");
      }

      if (authorImageFile) {
        authorImageUrl = await uploadImage(authorImageFile, "author-images");
      }

      await updateBlog.mutateAsync({
        ...updatedArticle,
        image_url: imageUrl,
        author_image_url: authorImageUrl,
      });
      toast.success("Article updated successfully!");
      setEditOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog.mutateAsync(selected.id);
      toast.success("Article deleted successfully!");
      setDeleteOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    blogsQuery;

  // Extract all blogs from the infinite query data
  const allBlogs = data?.pages?.flatMap((page) => page.items || []) || [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold">Blog Articles</h1>
          <p className="text-sm xl:text-base text-gray-600">
            Create and manage blog content
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
              <Plus size={18} className="mr-2 xl:w-5 xl:h-5" /> Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 xl:space-y-6">
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 xl:p-6 text-center">
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
                          className="mx-auto text-gray-400 mb-4 xl:w-12 xl:h-12"
                        />
                        <p className="text-sm xl:text-base text-gray-600">
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 xl:p-6 text-center">
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
                          className="mx-auto text-gray-400 mb-4 xl:w-12 xl:h-12"
                        />
                        <p className="text-sm xl:text-base text-gray-600">
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

              <Button onClick={handleCreate} className="w-full">
                Create Article
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {allBlogs.length > 0 ? (
          allBlogs.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Calendar size={40} className="xl:w-12 xl:h-12" />
                    </div>
                  )}
                </div>
                <div className="p-4 xl:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base xl:text-lg flex-1 min-w-0">
                      <span className="truncate block">{article.title}</span>
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                        article.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3 xl:mb-4 text-xs xl:text-sm">
                    <div className="flex justify-between">
                      <span>Author:</span>
                      <span className="font-semibold truncate ml-2">
                        {article.author || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span className="truncate ml-2">
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="truncate ml-2">
                        {article.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-1 xl:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelected(article);
                        setViewOpen(true);
                      }}
                      className="flex-1 text-xs xl:text-sm"
                    >
                      <Eye size={14} className="mr-1 xl:w-4 xl:h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(article)}
                      className="flex-1 text-xs xl:text-sm"
                    >
                      <Edit size={14} className="mr-1 xl:w-4 xl:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelected(article);
                        setDeleteOpen(true);
                      }}
                      className="text-red-600 hover:text-red-700 text-xs xl:text-sm"
                    >
                      <Trash2 size={14} className="xl:w-4 xl:h-4" />
                    </Button>
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
            {isFetchingNextPage ? "Loading..." : "Load More"}
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
