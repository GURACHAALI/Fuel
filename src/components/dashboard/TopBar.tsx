import { Search, Bell, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { getNotifications, type Notification } from '@/lib/kenyaFuelData';
import { cn } from '@/lib/utils';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-gradient-to-r from-card to-card/98 border-b border-border flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm backdrop-blur-sm bg-card/95">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-poppins font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Dashboard</h1>
        <Badge variant="secondary" className="text-[10px] font-semibold tracking-wider bg-gradient-to-r from-metric-up to-metric-up/80 text-white border-0 shadow-sm">
          ● LIVE MARKET DATA
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 h-9 pl-9 pr-4 rounded-lg bg-muted border border-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all hover:bg-muted/80"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-all hover:shadow-md relative"
          >
            <Bell className="w-[18px] h-[18px] text-muted-foreground hover:text-primary transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-destructive to-destructive/80 animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-card rounded-xl shadow-lg border border-border p-3 animate-slide-in z-50">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notifications</div>
              {notifications.map((n: Notification) => (
                <div 
                  key={n.id} 
                  className={cn(
                    'px-3 py-2.5 rounded-lg hover:bg-muted cursor-pointer transition-all',
                    !n.read ? 'bg-gradient-to-r from-sidebar-accent/30 to-sidebar-accent/10 border border-sidebar-accent/20' : ''
                  )}
                >
                  <div className="text-sm font-medium text-foreground">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.message}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-all hover:shadow-md">
          <Settings className="w-[18px] h-[18px] text-muted-foreground hover:text-primary transition-colors" />
        </button>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
