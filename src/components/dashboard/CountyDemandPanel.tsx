import { MoreHorizontal, Shield } from 'lucide-react';
import { getTopDemandCounties, getInsight } from '@/lib/kenyaFuelData';

interface CountyDemandProps {
  selectedCounty?: string;
}

export default function CountyDemandPanel({ selectedCounty }: CountyDemandProps) {
  const counties = getTopDemandCounties();
  const insight = getInsight(selectedCounty);

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.25s' }}>
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-base font-bold text-foreground">County Demand Analysis</h3>
        <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-chart-petrol" />
        <span className="text-xs text-muted-foreground">Top fuel consuming counties by daily volume</span>
      </div>

      <div className="space-y-4">
        {counties.map((c) => (
          <div key={c.county}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold tracking-wider text-foreground">{c.county.toUpperCase()}</span>
              <span className="text-xs font-semibold text-muted-foreground">{c.unit}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${c.demand}%`, opacity: 0.6 + (c.demand / 100) * 0.4 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence Pulse */}
      <div className="mt-6 bg-intelligence-bg rounded-xl p-4 border border-intelligence-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-5 h-5 text-intelligence-icon" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground mb-1">Market Intelligence</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
