'use client';

import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockReports } from '@/lib/mock-data';
import { Report } from '@/lib/types';
import { Eye, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ModerationPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleApprove = (reportId: string) => {
    setReports(
      reports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'resolved',
              resolvedDate: new Date(),
            }
          : r
      )
    );
  };

  const handleReject = (reportId: string) => {
    setReports(
      reports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'resolved',
              resolvedDate: new Date(),
            }
          : r
      )
    );
  };

  const columns: DataTableColumn<Report>[] = [
    {
      key: 'id',
      label: 'Report ID',
      render: (value) => <span className="font-mono text-sm text-foreground">{value}</span>,
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (value) => <span className="text-foreground text-sm">{value}</span>,
    },
    {
      key: 'reportedItemType',
      label: 'Type',
      render: (value) => (
        <Badge variant="outline" className="capitalize">{value}</Badge>
      ),
    },
    {
      key: 'severity',
      label: 'Severity',
      render: (value) => (
        <Badge
          className={cn(
            value === 'high' && 'bg-red-500 text-white',
            value === 'medium' && 'bg-yellow-500 text-white',
            value === 'low' && 'bg-blue-500 text-white'
          )}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          className={cn(
            value === 'resolved' && 'bg-green-500 text-white',
            value === 'in-review' && 'bg-orange-500 text-white',
            value === 'open' && 'bg-red-500 text-white'
          )}
        >
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
          <h2 className="text-3xl font-bold text-foreground">Content Moderation</h2>
          <p className="text-muted-foreground mt-1">
            Review reported content and take moderation actions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Open Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {reports.filter((r) => r.status === 'open').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">In Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {reports.filter((r) => r.status === 'in-review').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {reports.filter((r) => r.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <DataTable
          title="Content Reports"
          description="Review and moderate reported content"
          columns={columns}
          data={reports}
          searchPlaceholder="Search by report ID or reason..."
          actions={(report) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={viewDetailsOpen && selectedReport?.id === report.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border text-foreground">
                  <DialogHeader>
                    <DialogTitle>Report Details</DialogTitle>
                    <DialogDescription>
                      {selectedReport?.reason}
                    </DialogDescription>
                  </DialogHeader>

                  {selectedReport && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Report ID</p>
                          <p className="font-mono text-sm text-foreground">{selectedReport.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Item Type</p>
                          <Badge variant="outline" className="capitalize">{selectedReport.reportedItemType}</Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Severity</p>
                          <Badge className={
                            selectedReport.severity === 'high' ? 'bg-red-500 text-white' :
                            selectedReport.severity === 'medium' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                          }>
                            {selectedReport.severity}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <Badge className={
                            selectedReport.status === 'resolved' ? 'bg-green-500 text-white' :
                            selectedReport.status === 'in-review' ? 'bg-orange-500 text-white' :
                            'bg-red-500 text-white'
                          }>
                            {selectedReport.status}
                          </Badge>
                        </div>
                      </div>

                      {selectedReport.status !== 'resolved' && (
                        <div className="flex gap-3 pt-4 border-t border-border">
                          <Button
                            onClick={() => {
                              handleApprove(selectedReport.id);
                              setViewDetailsOpen(false);
                            }}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve Action
                          </Button>
                          <Button
                            onClick={() => {
                              handleReject(selectedReport.id);
                              setViewDetailsOpen(false);
                            }}
                            variant="outline"
                            className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Dismiss
                          </Button>
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
