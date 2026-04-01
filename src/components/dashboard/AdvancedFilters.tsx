import { SlidersHorizontal, Calendar } from 'lucide-react';
import { REGIONS, FUEL_TYPES } from '@/lib/fuelData';
import { useState } from 'react';

interface FiltersState {
  region: string;
  fuelType: string;
  dateRange: string;
}

interface AdvancedFiltersProps {
  onFilterChange?: (filters: FiltersState) => void;
}

export default function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    region: REGIONS[0],
    fuelType: FUEL_TYPES[0],
    dateRange: 'Oct 12 - Oct 19, 2023',
  });

  const updateFilter = (key: keyof FiltersState, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-base font-bold text-foreground">Advanced Filters</h3>
      </div>

      {/* Region */}
      <div className="mb-5">
        <label className="text-[10px] font-semibold tracking-[0.15em] text-accent uppercase mb-2 block">Region Selection</label>
        <select
          value={filters.region}
          onChange={(e) => updateFilter('region', e.target.value)}
          className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none cursor-pointer"
        >
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Fuel Type */}
      <div className="mb-5">
        <label className="text-[10px] font-semibold tracking-[0.15em] text-accent uppercase mb-2 block">Fuel Type</label>
        <div className="flex gap-2 flex-wrap">
          {FUEL_TYPES.slice(0, 2).map(ft => (
            <button
              key={ft}
              onClick={() => updateFilter('fuelType', ft)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                filters.fuelType === ft
                  ? 'border-accent bg-sidebar-accent text-accent'
                  : 'border-border text-foreground hover:border-accent/50'
              }`}
            >
              {ft}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <label className="text-[10px] font-semibold tracking-[0.15em] text-accent uppercase mb-2 block">Analysis Period</label>
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{filters.dateRange}</span>
        </div>
      </div>

      <button className="w-full py-3 bg-destructive text-destructive-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
        Generate Custom Report
      </button>
    </div>
  );
}
