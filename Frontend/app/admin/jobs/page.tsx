'use client';

import { useState } from 'react';
import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockJobs } from '@/lib/mock-data';
import { Job, ChatMessage } from '@/lib/types';
import { Eye, MapPin, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleForceCancel = (jobId: string) => {
    setJobs(
      jobs.map((j) =>
        j.id === jobId ? { ...j, status: 'cancelled' } : j
      )
    );
  };

  const columns: DataTableColumn<Job>[] = [
    {
      key: 'title',
      label: 'Job Title',
      sortable: true,
      render: (_, job) => (
        <div>
          <p className="font-medium text-foreground">{job.title}</p>
          <p className="text-xs text-muted-foreground">{job.category}</p>
        </div>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) => (
        <div className="flex items-center gap-1 text-foreground text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          {value}
        </div>
      ),
    },
    {
      key: 'rate',
      label: 'Rate',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1 font-semibold text-foreground">
          <DollarSign className="w-4 h-4" />
          {value}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          className={cn(
            value === 'active' && 'bg-blue-500 text-white',
            value === 'completed' && 'bg-green-500 text-white',
            value === 'cancelled' && 'bg-gray-500 text-white',
            value === 'disputed' && 'bg-red-500 text-white',
            value === 'pending' && 'bg-yellow-500 text-white'
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
          <h2 className="text-3xl font-bold text-foreground">Job Monitoring</h2>
          <p className="text-muted-foreground mt-1">
            Track job lifecycle, view proofs, and monitor worker activities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {jobs.filter((j) => j.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pending Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {jobs.filter((j) => j.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {jobs.filter((j) => j.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Disputed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {jobs.filter((j) => j.status === 'disputed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <DataTable
          title="All Jobs"
          description="Monitor and manage job activities"
          columns={columns}
          data={jobs}
          searchPlaceholder="Search by job title, location, or ID..."
          actions={(job) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={viewDetailsOpen && selectedJob?.id === job.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    onClick={() => setSelectedJob(job)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border text-foreground max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Job Details</DialogTitle>
                    <DialogDescription>
                      {selectedJob?.title}
                    </DialogDescription>
                  </DialogHeader>

                  {selectedJob && (
                    <div className="space-y-6">
                      {/* Job Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Title</p>
                          <p className="font-medium text-foreground">{selectedJob.title}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Category</p>
                          <p className="font-medium text-foreground capitalize">{selectedJob.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Rate</p>
                          <p className="font-medium text-foreground">${selectedJob.rate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <Badge className={cn(
                            selectedJob.status === 'active' && 'bg-blue-500 text-white',
                            selectedJob.status === 'completed' && 'bg-green-500 text-white',
                            selectedJob.status === 'disputed' && 'bg-red-500 text-white'
                          )}>
                            {selectedJob.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Location & Description */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Description</p>
                        <p className="text-foreground text-sm">{selectedJob.description}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> Location
                        </p>
                        <p className="text-foreground text-sm">{selectedJob.location}</p>
                      </div>

                      {/* Chat Logs */}
                      {selectedJob.chatLogs && selectedJob.chatLogs.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Chat Logs</h3>
                          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border max-h-64 overflow-y-auto">
                            {selectedJob.chatLogs.map((msg) => (
                              <div key={msg.id} className="text-sm">
                                <p className="font-medium text-foreground">{msg.senderName}</p>
                                <p className="text-muted-foreground text-xs mb-1">
                                  {new Date(msg.timestamp).toLocaleString()}
                                </p>
                                <p className="text-foreground">{msg.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Proof Images */}
                      {selectedJob.proofUrls && selectedJob.proofUrls.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Proof Files</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {selectedJob.proofUrls.map((url, idx) => (
                              <div key={idx} className="border border-border rounded-lg overflow-hidden">
                                <img src={url} alt={`Proof ${idx + 1}`} className="w-full h-32 object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rating */}
                      {selectedJob.rating && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Rating</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-foreground">{selectedJob.rating}</span>
                            <span className="text-yellow-500">{'⭐'.repeat(selectedJob.rating)}</span>
                          </div>
                          {selectedJob.review && (
                            <p className="text-sm text-foreground mt-2 italic">"{selectedJob.review}"</p>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      {selectedJob.status === 'active' && (
                        <div className="pt-4 border-t border-border">
                          <Button
                            onClick={() => {
                              handleForceCancel(selectedJob.id);
                              setViewDetailsOpen(false);
                            }}
                            variant="outline"
                            className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Force Cancel Job
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
