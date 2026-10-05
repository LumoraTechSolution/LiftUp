'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { mockSOSAlerts } from '@/lib/mock-data';
import { SOSAlert } from '@/lib/types';
import { AlertTriangle, MapPin, Phone, Clock } from 'lucide-react';

export default function SafetyPage() {
  const sosAlerts: SOSAlert[] = mockSOSAlerts;

  const columns: DataTableColumn<SOSAlert>[] = [
    {
      key: 'id',
      label: 'Alert ID',
      render: (value) => <span className="font-mono text-sm text-foreground">{value}</span>,
    },
    {
      key: 'workerId',
      label: 'Worker ID',
      render: (value) => <span className="font-mono text-sm text-foreground">{value}</span>,
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) => (
        <div className="flex items-center gap-1 text-foreground">
          <MapPin className="w-4 h-4" />
          {value}
        </div>
      ),
    },
    {
      key: 'timestamp',
      label: 'Time',
      render: (value) => (
        <div className="text-foreground text-sm">
          {new Date(value).toLocaleString()}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge className={value === 'resolved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Safety & Emergency Monitoring</h2>
          <p className="text-muted-foreground mt-1">
            Monitor SOS alerts and emergency worker situations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active SOS Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">0</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Resolved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">1</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3.2 min</div>
            </CardContent>
          </Card>
        </div>

        {/* SOS Alerts Table */}
        <DataTable
          title="SOS Alerts"
          description="Monitor emergency alerts from workers"
          columns={columns}
          data={sosAlerts}
          searchPlaceholder="Search by worker ID or location..."
        />

        {/* Emergency Contacts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Emergency Services
            </CardTitle>
            <CardDescription>Contact information for emergency response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Police Department', number: '911' },
                { name: 'Emergency Medical', number: '911' },
                { name: 'Fire Department', number: '911' },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.number}</p>
                  </div>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Contact Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
