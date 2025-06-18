'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { RoleService } from '@/services/api';
import { Role } from '@/types/api';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PlusIcon, EditIcon, TrashIcon, ShieldIcon } from 'lucide-react';

export function RoleManagement() {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: roles, isLoading, error } = useQuery('roles', RoleService.getRoles);

  const deleteRoleMutation = useMutation(RoleService.deleteRole, {
    onSuccess: () => queryClient.invalidateQueries('roles'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          Error loading roles. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Role</span>
        </Button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles?.map((role: Role) => (
          <div key={role._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldIcon className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <EditIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this role?')) {
                      deleteRoleMutation.mutate(role._id);
                    }
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions:</h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((permission) => (
                  <span
                    key={permission._id}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {permission.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!roles || roles.length === 0) && (
        <div className="text-center py-12">
          <ShieldIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No roles</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new role.</p>
          <div className="mt-6">
            <Button onClick={() => setShowCreateModal(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
