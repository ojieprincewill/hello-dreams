import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { Calendar, Eye } from "lucide-react";

const BlogViewModal = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Article Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{article.title}</h1>
              <Badge
                variant={
                  article.status === "Published" ? "default" : "secondary"
                }
              >
                {article.status}
              </Badge>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500 pb-4 border-b">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={16} />
                <span>{article.views} views</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {article.content}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogViewModal;
