'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockSystemNotifications } from '@/lib/mock-data';
import { SystemNotification } from '@/lib/types';
import { useState } from 'react';
import { Bell, Send } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<SystemNotification[]>(mockSystemNotifications);
  const [newNotif, setNewNotif] = useState({
    title: '',
    message: '',
    targetAudience: 'all' as const,
    type: 'general' as const,
  });

  const handleSendNotification = () => {
    if (!newNotif.title || !newNotif.message) return;

    setNotifications([
      ...notifications,
      {
        id: `notif-${Date.now()}`,
        title: newNotif.title,
        message: newNotif.message,
        targetAudience: newNotif.targetAudience,
        type: newNotif.type,
        createdDate: new Date(),
        status: 'sent',
      },
    ]);

    setNewNotif({
      title: '',
      message: '',
      targetAudience: 'all',
      type: 'general',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Notification Management</h2>
          <p className="text-muted-foreground mt-1">
            Send system-wide notifications and manage alerts
          </p>
        </div>

        {/* Create Notification */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Send New Notification</CardTitle>
            <CardDescription>Create and send a system-wide notification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Title</label>
              <Input
                placeholder="Notification title"
                value={newNotif.title}
                onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                className="bg-input border-border text-foreground placeholder-muted-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Message</label>
              <Textarea
                placeholder="Notification message"
                value={newNotif.message}
                onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                rows={4}
                className="bg-input border-border text-foreground placeholder-muted-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Target Audience</label>
                <Select value={newNotif.targetAudience} onValueChange={(value: any) => setNewNotif({ ...newNotif, targetAudience: value })}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="admins">Admins Only</SelectItem>
                    <SelectItem value="workers">Workers Only</SelectItem>
                    <SelectItem value="customers">Customers Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Notification Type</label>
                <Select value={newNotif.type} onValueChange={(value: any) => setNewNotif({ ...newNotif, type: value })}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="policy-change">Policy Change</SelectItem>
                    <SelectItem value="safety-update">Safety Update</SelectItem>
                    <SelectItem value="system-maintenance">System Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSendNotification}
              disabled={!newNotif.title || !newNotif.message}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </CardContent>
        </Card>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Sent Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {notifications.filter((n) => n.status === 'sent').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {notifications.filter((n) => n.status === 'scheduled').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{notifications.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Notification History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification History
            </CardTitle>
            <CardDescription>Recent notifications sent to users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{notif.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    </div>
                    <Badge className={
                      notif.type === 'policy-change' ? 'bg-blue-500 text-white' :
                      notif.type === 'safety-update' ? 'bg-red-500 text-white' :
                      notif.type === 'system-maintenance' ? 'bg-yellow-500 text-white' :
                      'bg-gray-500 text-white'
                    }>
                      {notif.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="capitalize">Target: {notif.targetAudience}</span>
                    <span>{new Date(notif.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
