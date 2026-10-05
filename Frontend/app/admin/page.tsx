'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  mockDashboardMetrics,
  mockJobTrendData,
  mockRevenueTrendData,
  mockUserGrowthData,
  mockDisputes,
  mockJobs,
} from '@/lib/mock-data';
import { AlertCircle, TrendingUp, Users, Briefcase, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  description?: string;
}

function MetricCard({ title, value, icon, trend, description }: MetricCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend !== undefined && (
          <p className={cn('text-xs mt-1', trend > 0 ? 'text-green-500' : 'text-red-500')}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your platform overview.</p>
          </div>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((range) => (
              <Button
                key={range}
                variant={dateRange === range ? 'default' : 'outline'}
                className={cn(
                  'capitalize',
                  dateRange === range && 'bg-primary text-primary-foreground border-primary'
                )}
                onClick={() => setDateRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Jobs"
            value={mockDashboardMetrics.activeJobs}
            icon={<Briefcase className="w-5 h-5" />}
            trend={12}
            description="Jobs in progress"
          />
          <MetricCard
            title="Active Disputes"
            value={mockDashboardMetrics.activeDisputes}
            icon={<AlertCircle className="w-5 h-5" />}
            trend={-5}
            description="Awaiting resolution"
          />
          <MetricCard
            title="Active Users"
            value={mockDashboardMetrics.activeUsers}
            icon={<Users className="w-5 h-5" />}
            trend={8}
            description="Online this week"
          />
          <MetricCard
            title="Total Revenue"
            value={`$${mockDashboardMetrics.totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5" />}
            trend={15}
            description="From completed jobs"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockDashboardMetrics.totalWorkers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {mockDashboardMetrics.verifiedWorkers} verified
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockDashboardMetrics.totalCustomers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((mockDashboardMetrics.totalCustomers / mockDashboardMetrics.activeUsers) * 100).toFixed(1)}% active
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Avg Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockDashboardMetrics.avgDisputeResolutionTime}h</div>
              <p className="text-xs text-muted-foreground mt-1">Per dispute</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Trends */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Job Trends
              </CardTitle>
              <CardDescription>Weekly job creation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockJobTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trends */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent" />
                Revenue Trends
              </CardTitle>
              <CardDescription>Weekly revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockRevenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="value" fill="var(--accent)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Growth */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              User Growth
            </CardTitle>
            <CardDescription>Workers vs Customers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockUserGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                <Bar dataKey="value" stackId="a" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Disputes */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Disputes</CardTitle>
              <CardDescription>Latest dispute cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDisputes.slice(0, 3).map((dispute) => (
                  <div key={dispute.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className={cn(
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      dispute.severity === 'high' ? 'bg-red-500/20 text-red-500' :
                      dispute.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-blue-500/20 text-blue-500'
                    )}>
                      {dispute.severity}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">Dispute #{dispute.id}</p>
                      <p className="text-xs text-muted-foreground">{dispute.reason}</p>
                    </div>
                    <div className={cn(
                      'px-2 py-1 rounded text-xs font-semibold',
                      dispute.status === 'resolved' ? 'bg-green-500/20 text-green-500' :
                      dispute.status === 'in-review' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-gray-500/20 text-gray-500'
                    )}>
                      {dispute.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Jobs</CardTitle>
              <CardDescription>Latest job activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className={cn(
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      job.status === 'active' ? 'bg-blue-500/20 text-blue-500' :
                      job.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                      job.status === 'disputed' ? 'bg-red-500/20 text-red-500' :
                      'bg-gray-500/20 text-gray-500'
                    )}>
                      {job.status}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.category} • ${job.rate}</p>
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
