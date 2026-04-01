import { Fuel, Flame, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import type { MetricData } from '@/lib/fuelData';

interface MetricCardsProps {
  metrics: MetricData;
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Current Price */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-slide-in">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <Fuel className="w-5 h-5 text-primary" />
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold ${metrics.priceChange >= 0 ? 'text-metric-up' : 'text-metric-down'}`}>
            {metrics.priceChange >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {metrics.priceChange >= 0 ? '+' : ''}{metrics.priceChange.toFixed(1)}%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1">Current Avg Price</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">${metrics.currentPrice.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">/ gal</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <svg className="w-16 h-6 text-primary" viewBox="0 0 64 24">
            <path d="M0,18 Q8,12 16,14 Q24,16 32,8 Q40,0 48,10 Q56,20 64,6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div>
            <div className="text-[10px] text-muted-foreground">Vs. Previous Month</div>
            <div className="text-xs font-semibold text-foreground">Upward Pressure</div>
          </div>
        </div>
      </div>

      {/* Demand Index */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <Flame className="w-5 h-5 text-chart-diesel" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-metric-down">
            <TrendingDown className="w-3.5 h-3.5" />
            -1.2%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1">Demand Index</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{metrics.demandIndex}%</span>
          <span className="text-sm text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <svg className="w-16 h-6 text-chart-diesel" viewBox="0 0 64 24">
            <path d="M0,6 Q12,18 24,12 Q36,6 48,16 Q56,20 64,14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div>
            <div className="text-[10px] text-muted-foreground">National Average</div>
            <div className="text-xs font-semibold text-foreground">{metrics.demandTrend}</div>
          </div>
        </div>
      </div>

      {/* Most Active Region */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">PEAK ACTIVITY</span>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-1">Most Active Region</div>
        <div className="text-2xl font-bold text-foreground mb-2">{metrics.activeRegion}</div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-primary" />
            <div className="w-5 h-5 rounded-full bg-accent" />
          </div>
          <div>
            <div className="text-xs text-accent">{metrics.activeTerminals.toLocaleString()} Active Terminals</div>
            <div className="text-xs font-semibold text-metric-up">+{metrics.regionYoYChange}% vs LY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
