'use client';

import { useState } from 'react';

import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPlatformUsers } from '@/lib/mock-data';
import { PlatformUser } from '@/lib/types';
import { MoreHorizontal, Shield, Ban, AlertCircle, RotateCcw, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionModalState {
  open: boolean;
  userId?: string;
  userName?: string;
  action?: 'warn' | 'suspend' | 'ban' | 'reset-password' | 'view-logs';
}

export default function UsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(mockPlatformUsers);
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [actionModal, setActionModal] = useState<ActionModalState>({ open: false });

  const columns: DataTableColumn<PlatformUser>[] = [
    {
      key: 'name',
      label: 'User Name',
      sortable: true,
      render: (_, user) => (
        <div>
          <p className="font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <Badge variant={value === 'worker' ? 'default' : 'secondary'} className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value) => (
        <div className="font-medium text-foreground">
          {value} ⭐
        </div>
      ),
    },
    {
      key: 'totalJobs',
      label: 'Total Jobs',
      sortable: true,
      render: (value) => <span className="text-foreground">{value}</span>,
    },
    {
      key: 'verificationStatus',
      label: 'Verification',
      render: (value) => (
        <Badge
          variant="outline"
          className={cn(
            value === 'verified' && 'border-green-500 bg-green-500/10 text-green-500',
            value === 'pending' && 'border-yellow-500 bg-yellow-500/10 text-yellow-500',
            value === 'rejected' && 'border-red-500 bg-red-500/10 text-red-500'
          )}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Account Status',
      render: (value) => (
        <Badge
          variant="outline"
          className={cn(
            value === 'active' && 'border-green-500 bg-green-500/10 text-green-500',
            value === 'suspended' && 'border-yellow-500 bg-yellow-500/10 text-yellow-500',
            value === 'banned' && 'border-red-500 bg-red-500/10 text-red-500'
          )}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'joinedDate',
      label: 'Joined',
      sortable: true,
      render: (value) => (
        <span className="text-foreground">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const handleAction = (userId: string, userName: string, action: ActionModalState['action']) => {
    setActionModal({ open: true, userId, userName, action });
  };

  const closeModal = () => {
    setActionModal({ open: false });
  };

  const executeAction = () => {
    if (!actionModal.userId || !actionModal.action) return;

    setUsers(
      users.map((u) =>
        u.id === actionModal.userId
          ? {
              ...u,
              status:
                actionModal.action === 'ban'
                  ? 'banned'
                  : actionModal.action === 'suspend'
                    ? 'suspended'
                    : u.status,
            }
          : u
      )
    );

    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage platform users, verify identities, and handle user actions
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Verified Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {users.filter((u) => u.verificationStatus === 'verified').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Suspended/Banned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {users.filter((u) => u.status !== 'active').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <DataTable
          title="All Users"
          description="View and manage all platform users"
          columns={columns}
          data={users}
          searchPlaceholder="Search by name, email, or ID..."
          actions={(user) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={actionModal.open && actionModal.userId === user.id} onOpenChange={setActionModal.open ? closeModal : undefined}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUser(user)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border text-foreground">
                  <DialogHeader>
                    <DialogTitle>User Actions</DialogTitle>
                    <DialogDescription>Actions for {user.name}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    {user.status === 'active' && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-border hover:bg-muted"
                          onClick={() => {
                            handleAction(user.id, user.name, 'warn');
                            closeModal();
                          }}
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Send Warning
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-border hover:bg-destructive/10 text-destructive hover:text-destructive"
                          onClick={() => {
                            handleAction(user.id, user.name, 'suspend');
                            closeModal();
                          }}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Suspend Account
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-border hover:bg-destructive/10 text-destructive hover:text-destructive"
                          onClick={() => {
                            handleAction(user.id, user.name, 'ban');
                            closeModal();
                          }}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Ban User
                        </Button>
                      </>
                    )}
                    {user.status !== 'active' && (
                      <Button
                        variant="outline"
                        className="w-full justify-start border-border hover:bg-green-500/10 text-green-500 hover:text-green-500"
                        onClick={() => {
                          setUsers(
                            users.map((u) =>
                              u.id === user.id ? { ...u, status: 'active' } : u
                            )
                          );
                          closeModal();
                        }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Reactivate Account
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full justify-start border-border hover:bg-muted"
                      onClick={() => {
                        handleAction(user.id, user.name, 'reset-password');
                        closeModal();
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-border hover:bg-muted"
                      onClick={() => {
                        handleAction(user.id, user.name, 'view-logs');
                        closeModal();
                      }}
                    >
                      <History className="w-4 h-4 mr-2" />
                      View Activity Log
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        />
      </div>
    </div>
  );
}
