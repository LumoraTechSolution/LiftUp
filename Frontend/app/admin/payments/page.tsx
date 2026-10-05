'use client';

import { useState } from 'react';
import { DataTable, DataTableColumn } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockTransactions } from '@/lib/mock-data';
import { Transaction } from '@/lib/types';
import { Eye, CheckCircle, AlertTriangle, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleReleaseEscrow = (txnId: string) => {
    setTransactions(
      transactions.map((t) =>
        t.id === txnId
          ? {
              ...t,
              status: 'completed',
              escrowStatus: 'released',
              completedDate: new Date(),
            }
          : t
      )
    );
  };

  const columns: DataTableColumn<Transaction>[] = [
    {
      key: 'id',
      label: 'Transaction ID',
      render: (value) => <span className="font-mono text-sm text-foreground">{value}</span>,
    },
    {
      key: 'jobId',
      label: 'Job ID',
      render: (value) => <span className="font-mono text-sm text-foreground">{value}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => (
        <div className="font-semibold text-foreground">
          ${value}
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <Badge variant={value === 'payment' ? 'default' : value === 'refund' ? 'destructive' : 'secondary'}>
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
            value === 'completed' && 'bg-green-500 text-white',
            value === 'pending' && 'bg-yellow-500 text-white',
            value === 'held' && 'bg-orange-500 text-white',
            value === 'failed' && 'bg-red-500 text-white'
          )}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'escrowStatus',
      label: 'Escrow Status',
      render: (value) => (
        <Badge variant="outline" className={cn(
          value === 'held' && 'border-orange-500 bg-orange-500/10 text-orange-500',
          value === 'released' && 'border-green-500 bg-green-500/10 text-green-500',
          value === 'refunded' && 'border-blue-500 bg-blue-500/10 text-blue-500'
        )}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdDate',
      label: 'Date',
      sortable: true,
      render: (value) => (
        <span className="text-foreground text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const totalRevenue = transactions
    .filter((t) => t.status === 'completed' && t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const heldAmount = transactions
    .filter((t) => t.escrowStatus === 'held')
    .reduce((sum, t) => sum + t.amount, 0);

  const refundedAmount = transactions
    .filter((t) => t.type === 'refund' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Payments & Escrow</h2>
          <p className="text-muted-foreground mt-1">
            Manage transactions, escrow holds, and refund processing
          </p>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ${totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Held in Escrow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                ${heldAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {transactions.filter((t) => t.escrowStatus === 'held').length} transactions
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Refunded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                ${refundedAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {transactions.filter((t) => t.type === 'refund').length} refunds
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <DataTable
          title="All Transactions"
          description="Monitor payments, escrow, and refunds"
          columns={columns}
          data={transactions}
          searchPlaceholder="Search by transaction or job ID..."
          actions={(transaction) => (
            <div className="flex gap-2 justify-end">
              <Dialog open={viewDetailsOpen && selectedTransaction?.id === transaction.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border text-foreground">
                  <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogDescription>
                      {selectedTransaction?.id}
                    </DialogDescription>
                  </DialogHeader>

                  {selectedTransaction && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Amount</p>
                          <p className="text-2xl font-bold text-foreground">${selectedTransaction.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Type</p>
                          <Badge className={selectedTransaction.type === 'payment' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}>
                            {selectedTransaction.type}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Status</p>
                          <Badge className={
                            selectedTransaction.status === 'completed' ? 'bg-green-500 text-white' :
                            selectedTransaction.status === 'held' ? 'bg-orange-500 text-white' :
                            'bg-gray-500 text-white'
                          }>
                            {selectedTransaction.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Escrow</p>
                          <Badge variant="outline">{selectedTransaction.escrowStatus}</Badge>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h3 className="font-semibold text-foreground mb-3">Details</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-foreground">
                            <span className="text-muted-foreground">Job ID:</span> {selectedTransaction.jobId}
                          </p>
                          <p className="text-foreground">
                            <span className="text-muted-foreground">From:</span> {selectedTransaction.fromUserId}
                          </p>
                          <p className="text-foreground">
                            <span className="text-muted-foreground">To:</span> {selectedTransaction.toUserId}
                          </p>
                          <p className="text-foreground">
                            <span className="text-muted-foreground">Created:</span> {new Date(selectedTransaction.createdDate).toLocaleString()}
                          </p>
                          {selectedTransaction.completedDate && (
                            <p className="text-foreground">
                              <span className="text-muted-foreground">Completed:</span> {new Date(selectedTransaction.completedDate).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      {selectedTransaction.escrowStatus === 'held' && (
                        <Button
                          onClick={() => {
                            handleReleaseEscrow(selectedTransaction.id);
                            setViewDetailsOpen(false);
                          }}
                          className="w-full bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Release Escrow
                        </Button>
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
