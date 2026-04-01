import { BarChart3, TrendingUp, FileText, Settings, Fuel, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'counties', label: 'Counties', icon: MapPin },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-[200px] bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0 z-30">
      <div className="p-5 pb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Fuel className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider text-primary leading-tight">FUEL WATCH</div>
            <div className="text-xs font-bold tracking-wider text-primary leading-tight">KENYA</div>
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-accent mt-1 ml-[46px]">PRICE INTELLIGENCE</div>
      </div>

      <nav className="flex-1 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1',
                isActive ? 'text-accent bg-sidebar-accent' : 'text-sidebar-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              {item.label}
              {isActive && <div className="ml-auto w-[3px] h-5 rounded-full bg-accent" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">KE</div>
          <div>
            <div className="text-sm font-semibold text-foreground">Analyst</div>
            <div className="text-xs text-muted-foreground">EPRA Data Unit</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
