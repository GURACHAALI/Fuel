import { Fuel, Flame, MapPin, TrendingUp, TrendingDown, Droplets } from 'lucide-react';

interface NationalMetricsProps {
  avgPrices: { superPetrol: number; diesel: number; kerosene: number };
}

export default function NationalMetrics({ avgPrices }: NationalMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Super Petrol */}
      <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all animate-slide-in hover:border-primary/50 group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
            <Fuel className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-metric-up bg-metric-up/10 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            +1.8%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-2">National Avg - Super Petrol</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-poppins font-bold text-foreground">{avgPrices.superPetrol.toFixed(2)}</span>
          <span className="text-sm font-semibold text-muted-foreground">KES</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">per litre • EPRA regulated</div>
      </div>

      {/* Diesel */}
      <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all animate-slide-in hover:border-chart-diesel/50 group" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-diesel/20 to-chart-diesel/10 flex items-center justify-center group-hover:from-chart-diesel/30 group-hover:to-chart-diesel/20 transition-all">
            <Flame className="w-5 h-5 text-chart-diesel" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-metric-down bg-metric-down/10 px-2.5 py-1 rounded-full">
            <TrendingDown className="w-3.5 h-3.5" />
            -0.9%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-2">National Avg - Diesel</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-poppins font-bold text-foreground">{avgPrices.diesel.toFixed(2)}</span>
          <span className="text-sm font-semibold text-muted-foreground">KES</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">per litre • Industrial grade</div>
      </div>

      {/* Kerosene */}
      <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all animate-slide-in hover:border-chart-warning/50 group" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-warning/20 to-chart-warning/10 flex items-center justify-center group-hover:from-chart-warning/30 group-hover:to-chart-warning/20 transition-all">
            <Droplets className="w-5 h-5 text-chart-warning" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-metric-up bg-metric-up/10 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            +0.5%
          </div>
        </div>
        <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-2">National Avg - Kerosene</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-poppins font-bold text-foreground">{avgPrices.kerosene.toFixed(2)}</span>
          <span className="text-sm font-semibold text-muted-foreground">KES</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">per litre • Household use</div>
      </div>
    </div>
  );
}
