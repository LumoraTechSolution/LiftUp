'use client';

import { useState } from 'react';
import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockDisputes, mockJobs } from '@/lib/mock-data';
import { Dispute } from '@/lib/types';
import { Eye, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [resolutionData, setResolutionData] = useState({
    decision: 'refund' as const,
    refundAmount: 0,
    reason: '',
  });

  const getJobDetails = (jobId: string) => {
    return mockJobs.find((j) => j.id === jobId);
  };

  const handleResolve = () => {
    if (!selectedDispute) return;

    setDisputes(
      disputes.map((d) =>
        d.id === selectedDispute.id
          ? {
              ...d,
              status: 'resolved',
              resolvedDate: new Date(),
              resolution: {
                decision: resolutionData.decision,
                refundAmount: resolutionData.decision === 'refund' ? resolutionData.refundAmount : undefined,
                reason: resolutionData.reason,
                resolvedBy: 'Sarah Johnson',
                penaltyApplied: resolutionData.decision === 'refund' && resolutionData.refundAmount === 0,
              },
            }
          : d
      )
    );

    setViewDetailsOpen(false);
    setResolutionData({ decision: 'refund', refundAmount: 0, reason: '' });
  };

  const columns: DataTableColumn<Dispute>[] = [
    {
      key: 'id',
      label: 'Dispute ID',
      render: (value) => <span className="font-mono text-sm text-foreground">{value}</span>,
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (value) => <span className="text-foreground text-sm">{value}</span>,
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
            value === 'closed' && 'bg-gray-500 text-white',
            value === 'open' && 'bg-red-500 text-white'
          )}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdDate',
      label: 'Created',
      sortable: true,
      render: (value) => (
        <span className="text-foreground text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dispute Resolution</h2>
          <p className="text-muted-foreground mt-1">
            Review disputes, analyze evidence, and make resolution decisions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Open Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {disputes.filter((d) => d.status === 'open').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">In Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {disputes.filter((d) => d.status === 'in-review').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {disputes.filter((d) => d.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Avg Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">18h</div>
            </CardContent>
          </Card>
        </div>

        {/* Disputes Table */}
        <DataTable
          title="All Disputes"
          description="Review and resolve dispute cases"
          columns={columns}
          data={disputes}
          searchPlaceholder="Search by dispute ID or reason..."
          actions={(dispute) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={viewDetailsOpen && selectedDispute?.id === dispute.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border text-foreground max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Dispute Review</DialogTitle>
                    <DialogDescription>
                      {selectedDispute?.reason}
                    </DialogDescription>
                  </DialogHeader>

                  {selectedDispute && (
                    <div className="space-y-6">
                      {/* Dispute Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Dispute ID</p>
                          <p className="font-mono text-sm text-foreground">{selectedDispute.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Job ID</p>
                          <p className="font-mono text-sm text-foreground">{selectedDispute.jobId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Severity</p>
                          <Badge className={cn(
                            selectedDispute.severity === 'high' && 'bg-red-500 text-white',
                            selectedDispute.severity === 'medium' && 'bg-yellow-500 text-white',
                            selectedDispute.severity === 'low' && 'bg-blue-500 text-white'
                          )}>
                            {selectedDispute.severity}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <Badge className={cn(
                            selectedDispute.status === 'resolved' && 'bg-green-500 text-white',
                            selectedDispute.status === 'in-review' && 'bg-orange-500 text-white',
                            selectedDispute.status === 'open' && 'bg-red-500 text-white'
                          )}>
                            {selectedDispute.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Parties Involved */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Parties Involved</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-border rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Customer ID</p>
                            <p className="font-medium text-foreground">{selectedDispute.customerId}</p>
                          </div>
                          <div className="border border-border rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Worker ID</p>
                            <p className="font-medium text-foreground">{selectedDispute.workerId}</p>
                          </div>
                        </div>
                      </div>

                      {/* Evidence */}
                      {selectedDispute.evidence.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Evidence Files</h3>
                          <div className="space-y-2">
                            {selectedDispute.evidence.map((evidence, idx) => (
                              <div key={idx} className="border border-border rounded-lg p-3 flex items-start justify-between">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    {evidence.type.toUpperCase()} - {new Date(evidence.uploadedDate).toLocaleDateString()}
                                  </p>
                                  <p className="text-sm text-foreground">Uploaded by: {evidence.uploadedBy}</p>
                                </div>
                                <Badge variant="outline">{evidence.type}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resolution Section */}
                      {selectedDispute.status !== 'resolved' && (
                        <div className="border-t border-border pt-6">
                          <h3 className="font-semibold text-foreground mb-4">Make Resolution</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-foreground block mb-2">
                                Decision
                              </label>
                              <Select value={resolutionData.decision} onValueChange={(value: any) => setResolutionData({ ...resolutionData, decision: value })}>
                                <SelectTrigger className="bg-input border-border text-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border">
                                  <SelectItem value="refund">Full Refund</SelectItem>
                                  <SelectItem value="partial-refund">Partial Refund</SelectItem>
                                  <SelectItem value="no-refund">No Refund</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {resolutionData.decision !== 'no-refund' && (
                              <div>
                                <label className="text-sm font-medium text-foreground block mb-2">
                                  Refund Amount ($)
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  value={resolutionData.refundAmount}
                                  onChange={(e) => setResolutionData({ ...resolutionData, refundAmount: parseInt(e.target.value) || 0 })}
                                  className="w-full px-3 py-2 bg-input border border-border rounded text-foreground placeholder-muted-foreground"
                                />
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium text-foreground block mb-2">
                                Resolution Reason
                              </label>
                              <Textarea
                                value={resolutionData.reason}
                                onChange={(e) => setResolutionData({ ...resolutionData, reason: e.target.value })}
                                placeholder="Explain your decision..."
                                className="bg-input border-border text-foreground placeholder-muted-foreground"
                                rows={3}
                              />
                            </div>

                            <Button
                              onClick={handleResolve}
                              disabled={!resolutionData.reason}
                              className="w-full bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Resolve Dispute
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Resolved Info */}
                      {selectedDispute.resolution && (
                        <div className="border-t border-border pt-6">
                          <h3 className="font-semibold text-foreground mb-3">Resolution Details</h3>
                          <div className="space-y-2 text-sm">
                            <p className="text-foreground">
                              <span className="text-muted-foreground">Decision:</span> {selectedDispute.resolution.decision}
                            </p>
                            {selectedDispute.resolution.refundAmount !== undefined && (
                              <p className="text-foreground">
                                <span className="text-muted-foreground">Refund Amount:</span> ${selectedDispute.resolution.refundAmount}
                              </p>
                            )}
                            <p className="text-foreground">
                              <span className="text-muted-foreground">Reason:</span> {selectedDispute.resolution.reason}
                            </p>
                            <p className="text-foreground">
                              <span className="text-muted-foreground">Resolved By:</span> {selectedDispute.resolution.resolvedBy}
                            </p>
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
