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
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BlogManagement;
