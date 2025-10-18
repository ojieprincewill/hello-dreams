import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Search, Edit, UserCheck, UserX } from "lucide-react";
import { toast } from "../ui/sonner";
import supabase from "@/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const queryClient = useQueryClient();
  const { isSuperuser } = useAuth();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Update user role mutation
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role, isAdmin, isInstructor }) => {
      // Check if current user is superuser
      if (!isSuperuser) {
        throw new Error('Only superusers can edit user roles');
      }

      // Update profile table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: role,
          is_admin: isAdmin,
          is_instructor: isInstructor,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      // Update auth metadata for role changes
      const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role: role }
      });
      
      if (authError) throw authError;

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success("User role updated successfully");
      setEditModalOpen(false);
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(`Failed to update user role: ${error.message}`);
    },
  });

  const handleRoleUpdate = () => {
    if (!selectedUser || !newRole) return;

    const isAdmin = newRole === 'admin';
    const isInstructor = newRole === 'tutor' || newRole === 'instructor';

    updateUserRole.mutate({
      userId: selectedUser.id,
      role: newRole,
      isAdmin,
      isInstructor
    });
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role || 'student');
    setEditModalOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getRoleDisplayName = (role, isAdmin, isInstructor) => {
    if (role === 'superuser') return 'Superuser';
    if (isAdmin || role === 'admin') return 'Admin';
    if (isInstructor || role === 'tutor' || role === 'instructor') return 'Instructor';
    return role === 'student' ? 'Student' : role || 'User';
  };

  const getRoleBadgeColor = (role, isAdmin, isInstructor) => {
    if (role === 'superuser') return 'bg-purple-100 text-purple-800';
    if (isAdmin || role === 'admin') return 'bg-red-100 text-red-800';
    if (isInstructor || role === 'tutor' || role === 'instructor') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          {!isSuperuser && (
            <p className="text-sm text-gray-600 mt-1">
              You can view all users but only superusers can edit roles.
            </p>
          )}
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.display_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 font-medium">
                        {user.display_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {user.display_name || 'No name'}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                      user.role,
                      user.is_admin,
                      user.is_instructor
                    )}`}
                  >
                    {getRoleDisplayName(user.role, user.is_admin, user.is_instructor)}
                  </span>
                  
                  {isSuperuser && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(user)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Role
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Role Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User Role</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label>User</Label>
                <p className="text-sm text-gray-600">
                  {selectedUser.display_name || 'No name'} ({selectedUser.email})
                </p>
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="tutor">Instructor/Tutor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="superuser">Superuser</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRoleUpdate}
                  disabled={updateUserRole.isPending}
                >
                  {updateUserRole.isPending ? 'Updating...' : 'Update Role'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
