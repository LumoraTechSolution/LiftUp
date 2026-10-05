'use client';

import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockAuditLogs } from '@/lib/mock-data';
import { AuditLog } from '@/lib/types';
import { Eye, Download } from 'lucide-react';
import { useState } from 'react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const columns: DataTableColumn<AuditLog>[] = [
    {
      key: 'adminName',
      label: 'Admin',
      sortable: true,
      render: (_, log) => (
        <div>
          <p className="font-medium text-foreground">{log.adminName}</p>
          <p className="text-xs text-muted-foreground font-mono">{log.adminId}</p>
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (value) => (
        <span className="text-foreground text-sm capitalize">{value.replace('_', ' ')}</span>
      ),
    },
    {
      key: 'affectedEntity',
      label: 'Entity',
      render: (value) => (
        <Badge variant="outline" className="capitalize">{value}</Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge className={value === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortable: true,
      render: (value) => (
        <span className="text-foreground text-sm">
          {new Date(value).toLocaleString()}
        </span>
      ),
    },
  ];

  const handleExport = () => {
    const csv = [
      ['Admin', 'Action', 'Entity', 'Entity ID', 'Status', 'Timestamp'],
      ...logs.map((log) => [
        log.adminName,
        log.action,
        log.affectedEntity,
        log.affectedEntityId,
        log.status,
        new Date(log.timestamp).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Audit Logs</h2>
            <p className="text-muted-foreground mt-1">
              Immutable activity logs of all admin actions
            </p>
          </div>
          <Button
            onClick={handleExport}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{logs.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {logs.filter((l) => l.status === 'success').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {logs.filter((l) => l.status === 'failure').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs Table */}
        <DataTable
          title="Activity Log"
          description="Complete audit trail of admin actions"
          columns={columns}
          data={logs}
          searchPlaceholder="Search by admin name or action..."
          actions={(log) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={viewDetailsOpen && selectedLog?.id === log.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    onClick={() => setSelectedLog(log)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border text-foreground">
                  <DialogHeader>
                    <DialogTitle>Audit Log Details</DialogTitle>
                    <DialogDescription>
                      {log.adminName} - {log.action}
                    </DialogDescription>
                  </DialogHeader>

                  {selectedLog && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Admin</p>
                          <p className="font-medium text-foreground">{selectedLog.adminName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Action</p>
                          <p className="font-medium text-foreground capitalize">{selectedLog.action.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Entity</p>
                          <p className="font-medium text-foreground">{selectedLog.affectedEntity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Entity ID</p>
                          <p className="font-mono text-sm text-foreground">{selectedLog.affectedEntityId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <Badge className={selectedLog.status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                            {selectedLog.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                          <p className="text-sm text-foreground">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                        </div>
                      </div>

                      {selectedLog.ipAddress && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">IP Address</p>
                          <p className="font-mono text-sm text-foreground">{selectedLog.ipAddress}</p>
                        </div>
                      )}

                      {Object.keys(selectedLog.changes).length > 0 && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-semibold text-foreground mb-3">Changes</p>
                          <div className="space-y-2">
                            {Object.entries(selectedLog.changes).map(([key, value]) => (
                              <div key={key} className="text-sm text-foreground">
                                <span className="text-muted-foreground">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}
        />
      </div>
    </div>
  );
}
