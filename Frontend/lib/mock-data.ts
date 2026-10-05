import {
  AdminUser,
  PlatformUser,
  WorkerVerification,
  Job,
  Dispute,
  Transaction,
  SOSAlert,
  Report,
  SystemNotification,
  AuditLog,
  Campaign,
  DashboardMetrics,
  ChartData,
} from './types';

// Admin Users
export const mockAdminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Sarah Johnson',
    email: 'sarah@liftup.com',
    role: 'super-admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastLogin: new Date(Date.now() - 1000 * 60 * 30),
    status: 'active',
  },
  {
    id: 'admin-2',
    name: 'Mike Chen',
    email: 'mike@liftup.com',
    role: 'moderator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    lastLogin: new Date(Date.now() - 1000 * 60 * 60),
    status: 'active',
  },
  {
    id: 'admin-3',
    name: 'Emily Rodriguez',
    email: 'emily@liftup.com',
    role: 'verification-officer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    lastLogin: new Date(Date.now() - 1000 * 60 * 90),
    status: 'active',
  },
  {
    id: 'admin-4',
    name: 'James Wilson',
    email: 'james@liftup.com',
    role: 'finance-admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    lastLogin: new Date(Date.now() - 1000 * 60 * 120),
    status: 'active',
  },
  {
    id: 'admin-5',
    name: 'Lisa Park',
    email: 'lisa@liftup.com',
    role: 'marketing-admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    lastLogin: new Date(Date.now() - 1000 * 60 * 45),
    status: 'active',
  },
];

// Platform Users
export const mockPlatformUsers: PlatformUser[] = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0101',
    type: 'worker',
    rating: 4.8,
    totalJobs: 145,
    joinedDate: new Date('2023-01-15'),
    verificationStatus: 'verified',
    status: 'active',
    identity: {
      documentType: 'nic',
      documentNumber: 'NIC123456',
      verificationDate: new Date('2023-02-01'),
    },
  },
  {
    id: 'user-2',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+1-555-0102',
    type: 'worker',
    rating: 4.5,
    totalJobs: 89,
    joinedDate: new Date('2023-03-20'),
    verificationStatus: 'verified',
    status: 'active',
    identity: {
      documentType: 'passport',
      documentNumber: 'PASS789012',
      verificationDate: new Date('2023-04-05'),
    },
  },
  {
    id: 'user-3',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+1-555-0103',
    type: 'customer',
    rating: 4.2,
    totalJobs: 23,
    joinedDate: new Date('2023-06-10'),
    verificationStatus: 'verified',
    status: 'active',
  },
  {
    id: 'user-4',
    name: 'David Lee',
    email: 'david@example.com',
    phone: '+1-555-0104',
    type: 'worker',
    rating: 3.9,
    totalJobs: 56,
    joinedDate: new Date('2023-05-12'),
    verificationStatus: 'pending',
    status: 'active',
  },
  {
    id: 'user-5',
    name: 'Sophie Turner',
    email: 'sophie@example.com',
    phone: '+1-555-0105',
    type: 'customer',
    rating: 4.7,
    totalJobs: 15,
    joinedDate: new Date('2023-07-22'),
    verificationStatus: 'verified',
    status: 'active',
  },
  {
    id: 'user-6',
    name: 'Carlos Mendez',
    email: 'carlos@example.com',
    phone: '+1-555-0106',
    type: 'worker',
    rating: 2.1,
    totalJobs: 12,
    joinedDate: new Date('2024-01-10'),
    verificationStatus: 'rejected',
    status: 'suspended',
  },
];

// Worker Verifications
export const mockWorkerVerifications: WorkerVerification[] = [
  {
    id: 'verify-1',
    userId: 'user-4',
    userName: 'David Lee',
    documentType: 'nic',
    documentUrl: 'https://via.placeholder.com/300x200?text=NIC+Document',
    certifications: [
      {
        id: 'cert-1',
        name: 'Heavy Equipment Operation',
        issuer: 'National Construction Board',
        expiryDate: new Date('2025-12-31'),
        documentUrl: 'https://via.placeholder.com/300x200?text=Certificate',
        verified: false,
      },
    ],
    skillVideos: [
      'https://via.placeholder.com/300x200?text=Skill+Video+1',
    ],
    status: 'pending',
    submittedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    proVerified: false,
  },
  {
    id: 'verify-2',
    userId: 'user-1',
    userName: 'John Smith',
    documentType: 'nic',
    documentUrl: 'https://via.placeholder.com/300x200?text=NIC+Document',
    certifications: [
      {
        id: 'cert-2',
        name: 'Carpentry Professional',
        issuer: 'Skills Academy',
        expiryDate: new Date('2026-06-30'),
        documentUrl: 'https://via.placeholder.com/300x200?text=Certificate',
        verified: true,
      },
      {
        id: 'cert-3',
        name: 'Safety Certification',
        issuer: 'OSHA',
        expiryDate: new Date('2025-03-15'),
        documentUrl: 'https://via.placeholder.com/300x200?text=Certificate',
        verified: true,
      },
    ],
    skillVideos: [
      'https://via.placeholder.com/300x200?text=Skill+Video+1',
      'https://via.placeholder.com/300x200?text=Skill+Video+2',
    ],
    status: 'approved',
    submittedDate: new Date('2023-02-01'),
    reviewedDate: new Date('2023-02-10'),
    reviewedBy: 'Emily Rodriguez',
    proVerified: true,
  },
];

// Jobs
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    customerId: 'user-3',
    workerId: 'user-1',
    title: 'Kitchen Cabinet Installation',
    category: 'carpentry',
    description: 'Need professional to install custom kitchen cabinets',
    location: 'Downtown, City Center',
    rate: 150,
    status: 'active',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 3),
    chatLogs: [
      {
        id: 'msg-1',
        senderId: 'user-3',
        senderName: 'Ahmed Hassan',
        message: 'When can you start?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: 'msg-2',
        senderId: 'user-1',
        senderName: 'John Smith',
        message: 'I can start tomorrow morning at 8 AM',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
      },
    ],
  },
  {
    id: 'job-2',
    customerId: 'user-5',
    workerId: 'user-2',
    title: 'House Cleaning Service',
    category: 'cleaning',
    description: 'Deep cleaning for 3-bedroom house',
    location: 'Suburban Area',
    rate: 120,
    status: 'completed',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    completedDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    rating: 5,
    review: 'Excellent work! Very thorough and professional.',
  },
  {
    id: 'job-3',
    customerId: 'user-3',
    title: 'Plumbing Repairs',
    category: 'plumbing',
    description: 'Fix leaky kitchen sink and bathroom pipes',
    location: 'Downtown, City Center',
    rate: 180,
    status: 'pending',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: 'job-4',
    customerId: 'user-5',
    workerId: 'user-1',
    title: 'Yard Landscaping',
    category: 'landscaping',
    description: 'Lawn mowing and garden design',
    location: 'Suburban Area',
    rate: 200,
    status: 'disputed',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
];

// Disputes
export const mockDisputes: Dispute[] = [
  {
    id: 'dispute-1',
    jobId: 'job-4',
    customerId: 'user-5',
    workerId: 'user-1',
    reason: 'Work not completed to standards',
    status: 'in-review',
    severity: 'medium',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    evidence: [
      {
        type: 'photo',
        url: 'https://via.placeholder.com/300x200?text=Evidence+Photo',
        uploadedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        uploadedBy: 'user-5',
      },
    ],
  },
  {
    id: 'dispute-2',
    jobId: 'job-2',
    customerId: 'user-3',
    workerId: 'user-4',
    reason: 'Payment not received',
    status: 'resolved',
    severity: 'high',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    resolvedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    resolution: {
      decision: 'refund',
      refundAmount: 150,
      reason: 'System error confirmed',
      resolvedBy: 'James Wilson',
      penaltyApplied: false,
    },
  },
];

// Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    jobId: 'job-1',
    fromUserId: 'user-3',
    toUserId: 'user-1',
    amount: 150,
    type: 'payment',
    status: 'completed',
    createdDate: new Date(Date.now() - 1000 * 60 * 60),
    completedDate: new Date(Date.now() - 1000 * 60 * 30),
    escrowStatus: 'released',
  },
  {
    id: 'txn-2',
    jobId: 'job-4',
    fromUserId: 'user-5',
    toUserId: 'user-1',
    amount: 200,
    type: 'payment',
    status: 'held',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    escrowStatus: 'held',
    fraudFlags: [],
  },
  {
    id: 'txn-3',
    jobId: 'job-2',
    fromUserId: 'user-3',
    toUserId: 'user-4',
    amount: 100,
    type: 'refund',
    status: 'completed',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    completedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    escrowStatus: 'refunded',
  },
];

// SOS Alerts
export const mockSOSAlerts: SOSAlert[] = [
  {
    id: 'sos-1',
    workerId: 'user-1',
    jobId: 'job-1',
    location: 'Downtown, City Center',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: 'resolved',
    responders: ['Police Unit 42', 'Emergency Services'],
    emergencyContacts: [
      {
        name: 'Maria Smith',
        phone: '+1-555-0201',
        relationship: 'Sister',
      },
    ],
  },
];

// Reports
export const mockReports: Report[] = [
  {
    id: 'report-1',
    reportedItemId: 'user-6',
    reportedItemType: 'user',
    reporterId: 'user-1',
    reason: 'Suspicious behavior and fraud attempts',
    severity: 'high',
    status: 'resolved',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    resolvedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    action: {
      actionType: 'suspend',
      reason: 'Multiple fraud reports',
      takenBy: 'Mike Chen',
      takenDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
  },
  {
    id: 'report-2',
    reportedItemId: 'job-3',
    reportedItemType: 'job',
    reporterId: 'user-5',
    reason: 'Suspicious job posting',
    severity: 'medium',
    status: 'open',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
];

// System Notifications
export const mockSystemNotifications: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Platform Maintenance',
    message: 'Scheduled maintenance on June 15th, 2024 from 2-4 AM UTC',
    targetAudience: 'all',
    type: 'system-maintenance',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'sent',
  },
  {
    id: 'notif-2',
    title: 'New Safety Guidelines',
    message: 'Updated safety protocols for workers on high-risk jobs',
    targetAudience: 'workers',
    type: 'safety-update',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    status: 'sent',
  },
];

// Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    adminId: 'admin-2',
    adminName: 'Mike Chen',
    action: 'suspend_user',
    affectedEntity: 'User',
    affectedEntityId: 'user-6',
    changes: { status: 'active -> suspended' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    status: 'success',
  },
  {
    id: 'audit-2',
    adminId: 'admin-4',
    adminName: 'James Wilson',
    action: 'resolve_dispute',
    affectedEntity: 'Dispute',
    affectedEntityId: 'dispute-2',
    changes: { status: 'in-review -> resolved', decision: 'refund' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    status: 'success',
  },
  {
    id: 'audit-3',
    adminId: 'admin-3',
    adminName: 'Emily Rodriguez',
    action: 'approve_verification',
    affectedEntity: 'WorkerVerification',
    affectedEntityId: 'verify-2',
    changes: { status: 'pending -> approved', proVerified: true },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    status: 'success',
  },
];

// Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Summer Worker Recruitment Drive',
    description: 'Attract new skilled workers for summer peak season',
    createdBy: 'admin-5',
    status: 'active',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 23),
    budget: 10000,
    spent: 4250,
    impressions: 125000,
    clicks: 8500,
    conversions: 342,
    targetAudience: {
      userType: 'worker',
      rating: 3.5,
    },
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 'campaign-2',
    title: 'Customer Retention Program',
    description: 'Incentivize repeat customers with loyalty rewards',
    createdBy: 'admin-5',
    status: 'active',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 16),
    budget: 5000,
    spent: 2100,
    impressions: 45000,
    clicks: 3200,
    conversions: 89,
    targetAudience: {
      userType: 'customer',
    },
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
];

// Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  activeJobs: 24,
  activeDisputes: 3,
  activeUsers: 1248,
  totalWorkers: 892,
  totalCustomers: 356,
  verifiedWorkers: 756,
  totalRevenue: 145320,
  avgDisputeResolutionTime: 18,
};

// Chart Data
export const mockJobTrendData: ChartData[] = [
  { date: 'Mon', value: 42 },
  { date: 'Tue', value: 38 },
  { date: 'Wed', value: 55 },
  { date: 'Thu', value: 62 },
  { date: 'Fri', value: 78 },
  { date: 'Sat', value: 95 },
  { date: 'Sun', value: 58 },
];

export const mockRevenueTrendData: ChartData[] = [
  { date: 'Week 1', value: 12500 },
  { date: 'Week 2', value: 15800 },
  { date: 'Week 3', value: 14200 },
  { date: 'Week 4', value: 18900 },
  { date: 'Week 5', value: 21300 },
  { date: 'Week 6', value: 19800 },
  { date: 'Week 7', value: 22820 },
];

export const mockUserGrowthData: ChartData[] = [
  { date: 'Jan', value: 450, category: 'Workers' },
  { date: 'Jan', value: 210, category: 'Customers' },
  { date: 'Feb', value: 520, category: 'Workers' },
  { date: 'Feb', value: 245, category: 'Customers' },
  { date: 'Mar', value: 610, category: 'Workers' },
  { date: 'Mar', value: 280, category: 'Customers' },
  { date: 'Apr', value: 720, category: 'Workers' },
  { date: 'Apr', value: 310, category: 'Customers' },
  { date: 'May', value: 820, category: 'Workers' },
  { date: 'May', value: 340, category: 'Customers' },
  { date: 'Jun', value: 892, category: 'Workers' },
  { date: 'Jun', value: 356, category: 'Customers' },
];
