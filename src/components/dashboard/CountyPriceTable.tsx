import { useState, useMemo } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import { getAllCountyPrices, type CountyFuelPrice } from '@/lib/kenyaFuelData';

export default function CountyPriceTable() {
  const [sortField, setSortField] = useState<keyof CountyFuelPrice>('county');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  const allPrices = useMemo(() => getAllCountyPrices(), []);

  const filtered = useMemo(() => {
    let data = allPrices;
    if (filter) {
      data = data.filter(p => p.county.toLowerCase().includes(filter.toLowerCase()));
    }
    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return data;
  }, [allPrices, filter, sortField, sortDir]);

  const toggleSort = (field: keyof CountyFuelPrice) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border shadow-md hover:shadow-lg transition-all animate-slide-in" style={{ animationDelay: '0.3s' }}>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-poppins font-bold text-foreground">All 47 Counties — Fuel Prices</h3>
            <p className="text-xs text-muted-foreground mt-1">Prices in KES per litre • Updated in real-time</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Filter counties..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-lg bg-muted border border-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 w-48 transition-all hover:border-border/50"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              {[
                { key: 'county', label: 'County' },
                { key: 'superPetrol', label: 'Super Petrol' },
                { key: 'diesel', label: 'Diesel' },
                { key: 'kerosene', label: 'Kerosene' },
                { key: 'stations', label: 'Stations' },
                { key: 'demandIndex', label: 'Demand' },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key as keyof CountyFuelPrice)}
                  className="px-6 py-4 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-50 hover:opacity-100" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr 
                key={row.county} 
                className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition-colors group"
              >
                <td className="px-6 py-3.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{row.county}</td>
                <td className="px-6 py-3.5 text-sm font-bold text-foreground">{row.superPetrol.toFixed(2)}</td>
                <td className="px-6 py-3.5 text-sm font-semibold text-foreground">{row.diesel.toFixed(2)}</td>
                <td className="px-6 py-3.5 text-sm text-foreground">{row.kerosene.toFixed(2)}</td>
                <td className="px-6 py-3.5 text-sm text-muted-foreground">{row.stations}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-muted/60 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all" style={{ width: `${row.demandIndex}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground w-8">{row.demandIndex}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
