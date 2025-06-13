import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import BlogViewModal from "./modals/BlogViewModal";
import BlogEditModal from "./modals/BlogEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import { useToast } from "../hooks/use-toast";

const BlogManagement = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "The Future of UI Design",
      content:
        "Exploring upcoming trends and technologies that will shape the future of user interface design...",
      publishDate: "2024-01-20",
      status: "Published",
      views: 1250,
      publisherName: "John Doe",
      publisherImage: "/placeholder-author.jpg",
    },
    {
      id: 2,
      title: "UX Research Best Practices",
      content:
        "A comprehensive guide to conducting effective user experience research that drives design decisions...",
      publishDate: "2024-01-18",
      status: "Published",
      views: 980,
      publisherName: "Jane Smith",
      publisherImage: "/placeholder-author.jpg",
    },
    {
      id: 3,
      title: "Design Systems 101",
      content:
        "Learn how to create and maintain effective design systems for your organization...",
      publishDate: "2024-01-22",
      status: "Draft",
      views: 0,
      publisherName: "Alex Johnson",
      publisherImage: "/placeholder-author.jpg",
    },
  ]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    publisherName: "",
    publisherImage: "",
  });

  const handleView = (article) => {
    setSelectedArticle(article);
    setViewModalOpen(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setEditModalOpen(true);
  };

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedArticle) {
      setArticles(articles.filter((a) => a.id !== selectedArticle.id));
      toast({
        title: "Article deleted",
        description: `${selectedArticle.title} has been successfully deleted.`,
      });
      setDeleteModalOpen(false);
      setSelectedArticle(null);
    }
  };

  const handleSave = (updatedArticle) => {
    setArticles(
      articles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
    );
    toast({
      title: "Article updated",
      description: `${updatedArticle.title} has been successfully updated.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">
            Create and manage educational articles and insights
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus size={20} className="mr-2" />
              Write Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Write New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="article-title">Article Title</Label>
                <Input
                  id="article-title"
                  value={newArticle.title}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <Label htmlFor="publisher-name">Publisher Name</Label>
                <Input
                  id="publisher-name"
                  value={newArticle.publisherName}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      publisherName: e.target.value,
                    })
                  }
                  placeholder="Enter publisher name"
                />
              </div>

              <div>
                <Label htmlFor="publisher-image">Publisher Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <User size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    Click to upload publisher image
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="publisher-image"
                    accept="image/*"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="article-content">Article Content</Label>
                <Textarea
                  id="article-content"
                  value={newArticle.content}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, content: e.target.value })
                  }
                  placeholder="Write your article content here..."
                  rows={15}
                  className="min-h-[300px]"
                />
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
                <Button className="flex-1">Publish Article</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-xl text-gray-900">
                      {article.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        article.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <User size={14} className="text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      By {article.publisherName}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.content}
                  </p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{article.publishDate}</span>
                    </div>
                    <span>{article.views} views</span>
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(article)}
                  >
                    <Eye size={16} className="mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(article)}
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(article)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BlogViewModal
        article={selectedArticle}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />

      <BlogEditModal
        article={selectedArticle}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={`Delete "${selectedArticle?.title}"`}
        message="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
};

export default BlogManagement;
