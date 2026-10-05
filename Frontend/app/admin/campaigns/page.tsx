'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockCampaigns } from '@/lib/mock-data';
import { Campaign } from '@/lib/types';
import { useState } from 'react';
import { Plus, Edit2, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const performanceData = [
  { day: 'Mon', impressions: 8400, clicks: 2400, conversions: 240 },
  { day: 'Tue', impressions: 3800, clicks: 1398, conversions: 221 },
  { day: 'Wed', impressions: 2000, clicks: 9800, conversions: 229 },
  { day: 'Thu', impressions: 2780, clicks: 3908, conversions: 200 },
  { day: 'Fri', impressions: 1890, clicks: 4800, conversions: 221 },
  { day: 'Sat', impressions: 2390, clicks: 3800, conversions: 250 },
  { day: 'Sun', impressions: 3490, clicks: 4300, conversions: 210 },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  const handlePauseCampaign = (campaignId: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === campaignId ? { ...c, status: 'paused' as const } : c
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Ads & Promotions</h2>
            <p className="text-muted-foreground mt-1">
              Manage campaigns and track advertising performance
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Campaign Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">${totalSpent.toLocaleString()} spent</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{(totalImpressions / 1000).toFixed(0)}K</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{totalConversions.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Campaign Performance</CardTitle>
            <CardDescription>Weekly impressions, clicks, and conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                <Line type="monotone" dataKey="impressions" stroke="var(--primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="clicks" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Active Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((campaign) => {
              const roi = campaign.spent > 0 ? (((campaign.clicks * 10) - campaign.spent) / campaign.spent * 100) : 0;
              const ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100) : 0;

              return (
                <Card key={campaign.id} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        <CardDescription className="text-xs">{campaign.description}</CardDescription>
                      </div>
                      <Badge className={cn(
                        campaign.status === 'active' && 'bg-green-500 text-white',
                        campaign.status === 'paused' && 'bg-yellow-500 text-white',
                        campaign.status === 'completed' && 'bg-gray-500 text-white'
                      )}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium text-foreground">
                          ${campaign.spent} / ${campaign.budget}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Impressions</p>
                        <p className="font-semibold text-foreground">{campaign.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">CTR</p>
                        <p className="font-semibold text-foreground">{ctr.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Conversions</p>
                        <p className="font-semibold text-foreground">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">ROI</p>
                        <p className={cn('font-semibold', roi > 0 ? 'text-green-500' : 'text-red-500')}>
                          {roi.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {campaign.status === 'active' && (
                      <div className="flex gap-2 pt-3 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1 border-border hover:bg-muted">
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                          onClick={() => handlePauseCampaign(campaign.id)}
                        >
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
