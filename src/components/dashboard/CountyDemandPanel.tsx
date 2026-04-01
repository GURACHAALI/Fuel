import { MoreHorizontal, Shield } from 'lucide-react';
import { getTopDemandCounties, getInsight } from '@/lib/kenyaFuelData';

interface CountyDemandProps {
  selectedCounty?: string;
}

export default function CountyDemandPanel({ selectedCounty }: CountyDemandProps) {
  const counties = getTopDemandCounties();
  const insight = getInsight(selectedCounty);

  return (
    <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all animate-slide-in" style={{ animationDelay: '0.25s' }}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-poppins font-bold text-foreground">County Demand Analysis</h3>
        <button className="w-8 h-8 rounded-lg hover:bg-muted/60 flex items-center justify-center transition-colors hover:text-primary">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-primary/60" />
        <span className="text-xs text-muted-foreground">Top fuel consuming counties by daily volume</span>
      </div>

      <div className="space-y-4">
        {counties.map((c, idx) => (
          <div key={c.county} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold tracking-wider text-foreground group-hover:text-primary transition-colors">{c.county.toUpperCase()}</span>
              <span className="text-xs font-bold text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full group-hover:bg-primary/10 transition-colors">{c.unit}</span>
            </div>
            <div className="h-2.5 bg-muted/60 rounded-full overflow-hidden border border-border/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${c.demand}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence Pulse */}
      <div className="mt-7 bg-gradient-to-br from-intelligence-bg to-intelligence-bg/50 rounded-xl p-4 border border-intelligence-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-intelligence-icon/20 to-intelligence-icon/10 border border-intelligence-border flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-intelligence-icon" />
          </div>
          <div>
            <div className="text-sm font-poppins font-bold text-foreground mb-1">Market Intelligence</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
