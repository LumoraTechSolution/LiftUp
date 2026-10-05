'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, Users } from 'lucide-react';

const votingTopics = [
  {
    id: 1,
    topic: 'Raise minimum wage for night jobs',
    options: ['Yes', 'No', 'Abstain'],
    results: { 'Yes': 342, 'No': 128, 'Abstain': 87 },
    totalVotes: 557,
  },
  {
    id: 2,
    topic: 'Implement 5-star rating requirement',
    options: ['Yes', 'No', 'Unsure'],
    results: { 'Yes': 210, 'No': 198, 'Unsure': 149 },
    totalVotes: 557,
  },
  {
    id: 3,
    topic: 'Add insurance coverage option',
    options: ['Yes', 'No'],
    results: { 'Yes': 438, 'No': 119 },
    totalVotes: 557,
  },
];

const complaints = [
  { id: 1, worker: 'John Smith', issue: 'Unfair job assignment', status: 'pending', date: '2024-05-20' },
  { id: 2, worker: 'Maria Garcia', issue: 'Payment delay issues', status: 'resolved', date: '2024-05-19' },
  { id: 3, worker: 'Ahmed Hassan', issue: 'Poor customer ratings', status: 'in-review', date: '2024-05-18' },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Community & Feedback Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage worker council voting and community feedback
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Votes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{votingTopics.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">557 workers</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Pending Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {complaints.filter((c) => c.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voting Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Worker Council Voting</h3>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create Poll
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {votingTopics.map((topic) => (
              <Card key={topic.id} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm">{topic.topic}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {topic.options.map((option) => {
                      const votes = topic.results[option as keyof typeof topic.results] || 0;
                      const percentage = ((votes / topic.totalVotes) * 100).toFixed(1);
                      return (
                        <div key={option}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-foreground">{option}</span>
                            <span className="text-xs text-muted-foreground">{percentage}% ({votes})</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">Total votes: {topic.totalVotes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Complaints Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Worker Complaints
            </CardTitle>
            <CardDescription>Review and respond to worker complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left font-medium text-foreground px-4 py-3">Worker</th>
                    <th className="text-left font-medium text-foreground px-4 py-3">Issue</th>
                    <th className="text-left font-medium text-foreground px-4 py-3">Status</th>
                    <th className="text-left font-medium text-foreground px-4 py-3">Date</th>
                    <th className="text-right font-medium text-foreground px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b border-border hover:bg-muted/20">
                      <td className="px-4 py-3 text-foreground">{complaint.worker}</td>
                      <td className="px-4 py-3 text-foreground">{complaint.issue}</td>
                      <td className="px-4 py-3">
                        <Badge className={
                          complaint.status === 'resolved' ? 'bg-green-500 text-white' :
                          complaint.status === 'in-review' ? 'bg-orange-500 text-white' :
                          'bg-yellow-500 text-white'
                        }>
                          {complaint.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-foreground text-sm">{complaint.date}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
