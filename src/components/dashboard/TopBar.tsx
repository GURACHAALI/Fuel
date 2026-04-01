import { Search, Bell, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { getNotifications, type Notification } from '@/lib/kenyaFuelData';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
        <Badge variant="secondary" className="text-[10px] font-semibold tracking-wider bg-secondary text-secondary-foreground border-0">
          LIVE MARKET DATA
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 h-9 pl-9 pr-4 rounded-lg bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-[18px] h-[18px] text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-card rounded-xl shadow-lg border border-border p-2 animate-slide-in">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notifications</div>
              {notifications.map((n: Notification) => (
                <div key={n.id} className={`px-3 py-2.5 rounded-lg hover:bg-muted cursor-pointer transition-colors ${!n.read ? 'bg-sidebar-accent' : ''}`}>
                  <div className="text-sm font-medium text-foreground">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.message}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
          <Settings className="w-[18px] h-[18px] text-muted-foreground" />
        </button>

        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
