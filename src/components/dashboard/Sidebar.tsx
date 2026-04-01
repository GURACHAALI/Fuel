import { BarChart3, TrendingUp, FileText, Settings, Fuel, MapPin, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/context/SettingsContext';
import { getTranslation } from '@/lib/translations';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', labelKey: 'dashboard', icon: BarChart3 },
  { id: 'counties', labelKey: 'counties', icon: MapPin },
  { id: 'insights', labelKey: 'insights', icon: Brain },
  { id: 'trends', labelKey: 'trends', icon: TrendingUp },
  { id: 'reports', labelKey: 'reports', icon: FileText },
  { id: 'settings', labelKey: 'settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const settings = useSettings();

  return (
    <aside className="w-[200px] bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0 z-30 shadow-lg">
      <div className="p-6 pb-8 border-b border-sidebar-border bg-gradient-to-r from-sidebar-primary/10 to-sidebar-accent/5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 flex items-center justify-center shadow-md">
            <Fuel className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold text-sidebar-primary leading-tight bg-gradient-to-r from-sidebar-primary to-accent bg-clip-text text-transparent">fuelTrends</div>
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-sidebar-accent-foreground mt-2 ml-[46px]">PRICE INTEL</div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const label = getTranslation(settings.language, item.labelKey);
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all mb-1.5',
                isActive 
                  ? 'text-sidebar-accent-foreground bg-gradient-to-r from-sidebar-accent/20 to-sidebar-accent/10 border border-sidebar-accent/30' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-primary-foreground'
              )}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="flex-1">{label}</span>
              {isActive && <div className="w-[3px] h-5 rounded-full bg-gradient-to-b from-sidebar-primary to-accent" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sidebar-primary/30 to-accent/30 flex items-center justify-center text-xs font-semibold text-sidebar-primary font-poppins">KE</div>
          <div>
            <div className="text-sm font-semibold text-sidebar-primary-foreground">Analyst</div>
            <div className="text-xs text-sidebar-foreground">EPRA Data Unit</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
