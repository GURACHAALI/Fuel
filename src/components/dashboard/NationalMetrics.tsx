import { Fuel, Flame, MapPin, TrendingUp, TrendingDown, Droplets } from 'lucide-react';

interface NationalMetricsProps {
  avgPrices: { superPetrol: number; diesel: number; kerosene: number };
}

export default function NationalMetrics({ avgPrices }: NationalMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Super Petrol */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-slide-in">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <Fuel className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-metric-up">
            <TrendingUp className="w-3.5 h-3.5" />
            +1.8%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1">National Avg - Super Petrol</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">KES {avgPrices.superPetrol.toFixed(2)}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">per litre • EPRA regulated</div>
      </div>

      {/* Diesel */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <Flame className="w-5 h-5 text-chart-diesel" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-metric-down">
            <TrendingDown className="w-3.5 h-3.5" />
            -0.9%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1">National Avg - Diesel</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">KES {avgPrices.diesel.toFixed(2)}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">per litre • Industrial grade</div>
      </div>

      {/* Kerosene */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <Droplets className="w-5 h-5 text-chart-warning" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-metric-up">
            <TrendingUp className="w-3.5 h-3.5" />
            +0.5%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1">National Avg - Kerosene</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">KES {avgPrices.kerosene.toFixed(2)}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">per litre • Household use</div>
      </div>
    </div>
  );
}
