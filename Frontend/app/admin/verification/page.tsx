'use client';

import { useState } from 'react';
import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockWorkerVerifications } from '@/lib/mock-data';
import { WorkerVerification } from '@/lib/types';
import { Eye, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VerificationPage() {
  const [verifications, setVerifications] = useState<WorkerVerification[]>(mockWorkerVerifications);
  const [selectedVerification, setSelectedVerification] = useState<WorkerVerification | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleApprove = (id: string) => {
    setVerifications(
      verifications.map((v) =>
        v.id === id
          ? {
              ...v,
              status: 'approved',
              proVerified: true,
              reviewedDate: new Date(),
              reviewedBy: 'Emily Rodriguez',
            }
          : v
      )
    );
  };

  const handleReject = (id: string) => {
    setVerifications(
      verifications.map((v) =>
        v.id === id
          ? {
              ...v,
              status: 'rejected',
              reviewedDate: new Date(),
              reviewedBy: 'Emily Rodriguez',
            }
          : v
      )
    );
  };

  const handleRequestResubmission = (id: string) => {
    setVerifications(
      verifications.map((v) =>
        v.id === id
          ? {
              ...v,
              status: 'pending',
            }
          : v
      )
    );
  };

  const columns: DataTableColumn<WorkerVerification>[] = [
    {
      key: 'userName',
      label: 'Worker Name',
      sortable: true,
      render: (_, verification) => (
        <div>
          <p className="font-medium text-foreground">{verification.userName}</p>
          <p className="text-xs text-muted-foreground">ID: {verification.userId}</p>
        </div>
      ),
    },
    {
      key: 'documentType',
      label: 'Document Type',
      render: (value) => (
        <Badge variant="outline" className="uppercase">
          {value}
        </Badge>
      ),
    },
    {
      key: 'certifications',
      label: 'Certifications',
      render: (value) => (
        <div className="text-foreground">
          {Array.isArray(value) ? value.length : 0} submitted
        </div>
      ),
    },
    {
      key: 'proVerified',
      label: 'Pro Badge',
      render: (value) => (
        <Badge
          variant="outline"
          className={cn(
            value
              ? 'border-blue-500 bg-blue-500/10 text-blue-500'
              : 'border-gray-500 bg-gray-500/10 text-gray-500'
          )}
        >
          {value ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          className={cn(
            value === 'approved' && 'bg-green-500 text-white',
            value === 'rejected' && 'bg-red-500 text-white',
            value === 'pending' && 'bg-yellow-500 text-white'
          )}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'submittedDate',
      label: 'Submitted',
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
          <h2 className="text-3xl font-bold text-foreground">Worker Verification</h2>
          <p className="text-muted-foreground mt-1">
            Review and approve worker identities, certifications, and skill videos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {verifications.filter((v) => v.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {verifications.filter((v) => v.status === 'approved').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {verifications.filter((v) => v.status === 'rejected').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verifications Table */}
        <DataTable
          title="Worker Verifications"
          description="Review and manage worker verification requests"
          columns={columns}
          data={verifications}
          searchPlaceholder="Search by worker name or ID..."
          actions={(verification) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={viewDetailsOpen && selectedVerification?.id === verification.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    onClick={() => setSelectedVerification(verification)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border text-foreground max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Verification Details</DialogTitle>
                    <DialogDescription>
                      Review {selectedVerification?.userName}&apos;s verification documents
                    </DialogDescription>
                  </DialogHeader>

                  {selectedVerification && (
                    <div className="space-y-6">
                      {/* Identity Document */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Identity Document</h3>
                        <div className="border border-border rounded-lg p-4">
                          <img
                            src={selectedVerification.documentUrl}
                            alt="Document"
                            className="max-w-full h-auto rounded"
                          />
                          <div className="mt-3 text-sm text-muted-foreground">
                            Type: {selectedVerification.documentType.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      {selectedVerification.certifications.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Certifications</h3>
                          <div className="space-y-3">
                            {selectedVerification.certifications.map((cert) => (
                              <div key={cert.id} className="border border-border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-medium text-foreground">{cert.name}</p>
                                    <p className="text-sm text-muted-foreground">Issuer: {cert.issuer}</p>
                                  </div>
                                  <Badge
                                    className={cn(
                                      cert.verified
                                        ? 'bg-green-500 text-white'
                                        : 'bg-yellow-500 text-white'
                                    )}
                                  >
                                    {cert.verified ? 'Verified' : 'Pending'}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">
                                  Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                                </p>
                                <img
                                  src={cert.documentUrl}
                                  alt="Certificate"
                                  className="max-w-full h-auto rounded"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skill Videos */}
                      {selectedVerification.skillVideos.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Skill Videos</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedVerification.skillVideos.map((video, idx) => (
                              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                                <img
                                  src={video}
                                  alt={`Skill video ${idx + 1}`}
                                  className="w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {selectedVerification.status === 'pending' && (
                        <div className="flex gap-3 pt-4 border-t border-border">
                          <Button
                            onClick={() => {
                              handleApprove(selectedVerification.id);
                              setViewDetailsOpen(false);
                            }}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => {
                              handleReject(selectedVerification.id);
                              setViewDetailsOpen(false);
                            }}
                            variant="outline"
                            className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            onClick={() => {
                              handleRequestResubmission(selectedVerification.id);
                              setViewDetailsOpen(false);
                            }}
                            variant="outline"
                            className="flex-1 border-border hover:bg-muted"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Request Resubmission
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {verification.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleApprove(verification.id)}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500/10"
                    onClick={() => handleReject(verification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
