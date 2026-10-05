'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3,
  Users,
  CheckCircle,
  Briefcase,
  AlertCircle,
  CreditCard,
  DollarSign,
  Shield,
  FileText,
  MessageSquare,
  MailOpen,
  Book,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/admin', roles: ['super-admin', 'moderator', 'verification-officer', 'finance-admin', 'marketing-admin'] },
  { icon: Users, label: 'Users', href: '/admin/users', roles: ['super-admin', 'moderator'] },
  { icon: CheckCircle, label: 'Verification', href: '/admin/verification', roles: ['super-admin', 'verification-officer'] },
  { icon: Briefcase, label: 'Jobs', href: '/admin/jobs', roles: ['super-admin', 'moderator'] },
  { icon: AlertCircle, label: 'Disputes', href: '/admin/disputes', roles: ['super-admin', 'moderator'] },
  { icon: CreditCard, label: 'Payments', href: '/admin/payments', roles: ['super-admin', 'finance-admin'] },
  { icon: DollarSign, label: 'Pricing', href: '/admin/pricing', roles: ['super-admin'] },
  { icon: Shield, label: 'Safety', href: '/admin/safety', roles: ['super-admin', 'moderator'] },
  { icon: FileText, label: 'Moderation', href: '/admin/moderation', roles: ['super-admin', 'moderator'] },
  { icon: MessageSquare, label: 'Community', href: '/admin/community', roles: ['super-admin', 'moderator'] },
  { icon: MailOpen, label: 'Notifications', href: '/admin/notifications', roles: ['super-admin'] },
  { icon: Book, label: 'Audit Logs', href: '/admin/audit-logs', roles: ['super-admin'] },
  { icon: Megaphone, label: 'Campaigns', href: '/admin/campaigns', roles: ['super-admin', 'marketing-admin'] },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenu, setUserMenu] = useState(false);

  const adminUser = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('admin-session') || '{}') : {};
  const userRole = adminUser.role || 'super-admin';

  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = () => {
    sessionStorage.removeItem('admin-session');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar border-r border-sidebar-border transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
                  L
                </div>
                <span className="font-bold text-sidebar-foreground">LiftUp</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>

          {/* Menu Items */}
          <nav
  data-scrollbar="custom"
  className="flex-1 overflow-y-auto py-4 px-2 bg-sidebar"
  style={{
    scrollbarWidth: 'thin',
    scrollbarColor: 'hsl(var(--sidebar-accent)) transparent',
    backgroundColor: 'hsl(var(--sidebar))',
  }}
>
            <div className="space-y-1">
              {visibleMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="border-t border-sidebar-border p-4 space-y-2">
            <div className="relative">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent',
                  sidebarOpen && 'flex gap-2'
                )}
                onClick={() => setUserMenu(!userMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-semibold flex-shrink-0">
                  {adminUser.name?.charAt(0) || 'A'}
                </div>
                {sidebarOpen && (
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium truncate">{adminUser.name || 'Admin'}</div>
                    <div className="text-xs text-muted-foreground capitalize truncate">{adminUser.role || 'Admin'}</div>
                  </div>
                )}
              </Button>

              {userMenu && sidebarOpen && (
                <div className="absolute bottom-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg mb-2 z-50">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-muted text-sm"
                    onClick={() => {
                      setUserMenu(false);
                      router.push('/admin/settings');
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 text-sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>

            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">LiftUp Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{adminUser.name || 'Admin User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{adminUser.role || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {adminUser.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
