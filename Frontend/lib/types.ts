// User Roles
export type AdminRole = 'super-admin' | 'moderator' | 'verification-officer' | 'finance-admin' | 'marketing-admin';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  lastLogin?: Date;
  status: 'active' | 'inactive';
}

// Platform Users (Workers & Customers)
export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'worker' | 'customer';
  rating: number;
  totalJobs: number;
  joinedDate: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  status: 'active' | 'suspended' | 'banned';
  identity?: {
    documentType: 'nic' | 'passport';
    documentNumber: string;
    verificationDate?: Date;
  };
}

// Worker Verification
export interface WorkerVerification {
  id: string;
  userId: string;
  userName: string;
  documentType: 'nic' | 'passport';
  documentUrl: string;
  certifications: Certification[];
  skillVideos: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  proVerified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  expiryDate: Date;
  documentUrl: string;
  verified: boolean;
}

// Jobs
export interface Job {
  id: string;
  customerId: string;
  workerId?: string;
  title: string;
  category: string;
  description: string;
  location: string;
  rate: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  createdDate: Date;
  completedDate?: Date;
  chatLogs?: ChatMessage[];
  proofUrls?: string[];
  gpsHistory?: GPSPoint[];
  rating?: number;
  review?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  attachments?: string[];
}

export interface GPSPoint {
  lat: number;
  lng: number;
  timestamp: Date;
  accuracy: number;
}

// Disputes
export interface Dispute {
  id: string;
  jobId: string;
  customerId: string;
  workerId: string;
  reason: string;
  status: 'open' | 'in-review' | 'resolved' | 'closed';
  severity: 'low' | 'medium' | 'high';
  createdDate: Date;
  resolvedDate?: Date;
  resolution?: DisputeResolution;
  evidence: DisputeEvidence[];
}

export interface DisputeResolution {
  decision: 'refund' | 'no-refund' | 'partial-refund';
  refundAmount?: number;
  reason: string;
  resolvedBy: string;
  penaltyApplied?: boolean;
}

export interface DisputeEvidence {
  type: 'chat' | 'photo' | 'video' | 'other';
  url: string;
  uploadedDate: Date;
  uploadedBy: string;
}

// Payments & Escrow
export interface Transaction {
  id: string;
  jobId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: 'payment' | 'refund' | 'penalty';
  status: 'pending' | 'completed' | 'failed' | 'held';
  createdDate: Date;
  completedDate?: Date;
  escrowStatus?: 'held' | 'released' | 'refunded';
  fraudFlags?: string[];
}

// Pricing
export interface PricingRule {
  id: string;
  ruleType: 'base-rate' | 'location-based' | 'risk-based' | 'time-based';
  category: string;
  baseRate?: number;
  location?: string;
  multiplier?: number;
  applicableTime?: string;
  createdDate: Date;
  updatedDate: Date;
}

// Safety & Emergencies
export interface SOSAlert {
  id: string;
  workerId: string;
  jobId: string;
  location: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'false-alarm';
  responders: string[];
  emergencyContacts: Contact[];
}

export interface Contact {
  name: string;
  phone: string;
  relationship: string;
}

// Content Moderation
export interface Report {
  id: string;
  reportedItemId: string;
  reportedItemType: 'job' | 'user' | 'message';
  reporterId: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-review' | 'resolved';
  createdDate: Date;
  resolvedDate?: Date;
  action?: ModerationAction;
}

export interface ModerationAction {
  actionType: 'warning' | 'suspend' | 'ban' | 'remove-content';
  reason: string;
  takenBy: string;
  takenDate: Date;
}

// Community
export interface WorkerCouncilVote {
  id: string;
  workerId: string;
  topic: string;
  voteOptions: string[];
  selectedOption: string;
  timestamp: Date;
}

// Notifications
export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'admins' | 'workers' | 'customers';
  type: 'policy-change' | 'safety-update' | 'system-maintenance' | 'general';
  createdDate: Date;
  sentDate?: Date;
  status: 'draft' | 'scheduled' | 'sent';
}

// Audit Logs
export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  affectedEntity: string;
  affectedEntityId: string;
  changes: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  status: 'success' | 'failure';
}

// Ads & Promotions
export interface Campaign {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  targetAudience: {
    userType: 'worker' | 'customer' | 'both';
    location?: string;
    rating?: number;
  };
  createdDate: Date;
}

// Dashboard Analytics
export interface DashboardMetrics {
  activeJobs: number;
  activeDisputes: number;
  activeUsers: number;
  totalWorkers: number;
  totalCustomers: number;
  verifiedWorkers: number;
  totalRevenue: number;
  avgDisputeResolutionTime: number;
}

export interface ChartData {
  date: string;
  value: number;
  category?: string;
}
