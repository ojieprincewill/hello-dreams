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
import { Plus, Edit, Trash2, Eye, Target } from "lucide-react";
import ChallengeViewModal from "./modals/ChallengeViewModal";
import ChallengeEditModal from "./modals/ChallengeEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import { useToast } from "../hooks/use-toast";

const ChallengeManagement = () => {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Mobile App Redesign",
      challenge:
        "Redesign a popular mobile app to improve user experience and modern aesthetics.",
      deliverables:
        "User research, wireframes, high-fidelity mockups, prototype",
      participants: 45,
      deadline: "2024-02-15",
      status: "Active",
    },
    {
      id: 2,
      title: "E-commerce Dashboard",
      challenge:
        "Create an intuitive dashboard for e-commerce store owners to track their business metrics.",
      deliverables:
        "Information architecture, UI designs, interactive prototype",
      participants: 32,
      deadline: "2024-02-28",
      status: "Active",
    },
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newChallenge, setNewChallenge] = useState({
    title: "",
    challenge: "",
    deliverables: "",
  });

  const handleView = (challenge) => {
    setSelectedChallenge(challenge);
    setViewModalOpen(true);
  };

  const handleEdit = (challenge) => {
    setSelectedChallenge(challenge);
    setEditModalOpen(true);
  };

  const handleDelete = (challenge) => {
    setSelectedChallenge(challenge);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedChallenge) {
      setChallenges(challenges.filter((c) => c.id !== selectedChallenge.id));
      toast({
        title: "Challenge deleted",
        description: `${selectedChallenge.title} has been successfully deleted.`,
      });
      setDeleteModalOpen(false);
      setSelectedChallenge(null);
    }
  };

  const handleSave = (updatedChallenge) => {
    setChallenges(
      challenges.map((c) =>
        c.id === updatedChallenge.id ? updatedChallenge : c
      )
    );
    toast({
      title: "Challenge updated",
      description: `${updatedChallenge.title} has been successfully updated.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">UI/UX Challenges</h1>
          <p className="text-gray-600 mt-2">
            Create design challenges to engage the community
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus size={20} className="mr-2" />
              Create Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New UI/UX Challenge</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="challenge-title">Challenge Title</Label>
                <Input
                  id="challenge-title"
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, title: e.target.value })
                  }
                  placeholder="Enter challenge title"
                />
              </div>

              <div>
                <Label htmlFor="challenge-description">
                  Challenge Description
                </Label>
                <Textarea
                  id="challenge-description"
                  value={newChallenge.challenge}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      challenge: e.target.value,
                    })
                  }
                  placeholder="Describe the design challenge in detail"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="challenge-deliverables">Deliverables</Label>
                <Textarea
                  id="challenge-deliverables"
                  value={newChallenge.deliverables}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      deliverables: e.target.value,
                    })
                  }
                  placeholder="List what participants should deliver"
                  rows={3}
                />
              </div>

              <Button className="w-full">Create Challenge</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Target className="text-purple-600" size={24} />
                    <h3 className="font-semibold text-xl text-gray-900">
                      {challenge.title}
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {challenge.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Challenge:
                    </h4>
                    <p className="text-gray-600">{challenge.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Deliverables:
                    </h4>
                    <p className="text-gray-600">{challenge.deliverables}</p>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>{challenge.participants} participants</span>
                    <span>Deadline: {challenge.deadline}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(challenge)}
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(challenge)}
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(challenge)}
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

      <ChallengeViewModal
        challenge={selectedChallenge}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <ChallengeEditModal
        challenge={selectedChallenge}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={`Delete "${selectedChallenge?.title}"`}
        message="Are you sure you want to delete this challenge? This action cannot be undone."
      />
    </div>
  );
};

export default ChallengeManagement;
