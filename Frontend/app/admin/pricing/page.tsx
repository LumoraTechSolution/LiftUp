'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { DollarSign, Plus, Edit2, Trash2 } from 'lucide-react';

const pricingRules = [
  { id: 1, type: 'base-rate', category: 'carpentry', value: 50, multiplier: 1 },
  { id: 2, type: 'location-based', location: 'Downtown', multiplier: 1.2 },
  { id: 3, type: 'risk-based', category: 'high-risk', multiplier: 1.5 },
  { id: 4, type: 'time-based', time: 'Night (10PM-6AM)', multiplier: 1.3 },
];

export default function PricingPage() {
  const [rules, setRules] = useState(pricingRules);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Pricing & Rate Control</h2>
            <p className="text-muted-foreground mt-1">
              Configure base rates, location-based, and risk-based pricing
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Pricing Rule
          </Button>
        </div>

        {/* Pricing Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => (
            <Card key={rule.id} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground capitalize">{rule.type.replace('-', ' ')}</CardTitle>
                    <CardDescription>
                      {'category' in rule && `Category: ${rule.category}`}
                      {'location' in rule && `Location: ${rule.location}`}
                      {'time' in rule && `Time: ${rule.time}`}
                    </CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    {rule.multiplier}x
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-border hover:bg-muted">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Base Rates Card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Base Rates by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['carpentry', 'plumbing', 'cleaning', 'landscaping'].map((cat) => (
                <div key={cat} className="flex items-center gap-4 p-3 bg-muted/20 rounded-lg border border-border">
                  <div className="flex-1 capitalize font-medium text-foreground">{cat}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">$</span>
                    <input type="number" defaultValue="50" className="w-20 px-2 py-1 bg-input border border-border rounded text-foreground" />
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-border">Save</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
