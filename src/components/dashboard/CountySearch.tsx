import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Fuel, Droplets, Flame } from 'lucide-react';
import { searchCounties, getCountyPrice, type CountyFuelPrice } from '@/lib/kenyaFuelData';
import { cn } from '@/lib/utils';

interface CountySearchProps {
  onCountySelect?: (county: string) => void;
}

export default function CountySearch({ onCountySelect }: CountySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<CountyFuelPrice | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchCounties(query));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (county: string) => {
    setQuery(county);
    setShowDropdown(false);
    const price = getCountyPrice(county);
    setSelectedCounty(price);
    onCountySelect?.(county);
  };

  const clearSelection = () => {
    setQuery('');
    setSelectedCounty(null);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search any Kenya county for fuel prices..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          className="w-full h-12 pl-12 pr-12 rounded-xl bg-gradient-to-r from-card to-card/98 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 shadow-sm text-sm transition-all hover:border-border/80"
        />
        {query && (
          <button onClick={clearSelection} className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && results.length > 0 && (
          <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto scrollbar-thin animate-slide-in">
            {results.map((county) => (
              <button
                key={county}
                onClick={() => handleSelect(county)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/60 transition-colors text-left border-b border-border/50 last:border-0 group"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium text-foreground">{county}</span>
                <span className="ml-auto text-xs text-muted-foreground">County</span>
              </button>
            ))}
          </div>
        )}
        {showDropdown && query.trim() && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 p-4 text-center text-sm text-muted-foreground animate-slide-in">
            No county found matching "{query}"
          </div>
        )}
      </div>

      {/* Selected County Price Card */}
      {selectedCounty && (
        <div className="mt-6 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border shadow-md hover:shadow-lg transition-all p-6 animate-slide-in">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-poppins font-bold text-foreground">{selectedCounty.county} County</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                {selectedCounty.stations} STATIONS
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-white bg-gradient-to-r from-metric-up to-metric-up/80 px-3 py-1.5 rounded-full animate-pulse-subtle">
                ● LIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PriceCard
              label="Super Petrol"
              price={selectedCounty.superPetrol}
              icon={<Fuel className="w-4 h-4" />}
              color="text-primary"
              bgColor="bg-gradient-to-br from-primary/10 to-primary/5"
              borderColor="border-primary/20"
            />
            <PriceCard
              label="Regular Petrol"
              price={selectedCounty.regularPetrol}
              icon={<Fuel className="w-4 h-4" />}
              color="text-chart-success"
              bgColor="bg-gradient-to-br from-metric-up/10 to-metric-up/5"
              borderColor="border-metric-up/20"
            />
            <PriceCard
              label="Diesel"
              price={selectedCounty.diesel}
              icon={<Flame className="w-4 h-4" />}
              color="text-chart-diesel"
              bgColor="bg-gradient-to-br from-chart-diesel/10 to-chart-diesel/5"
              borderColor="border-chart-diesel/20"
            />
            <PriceCard
              label="Kerosene"
              price={selectedCounty.kerosene}
              icon={<Droplets className="w-4 h-4" />}
              color="text-chart-warning"
              bgColor="bg-gradient-to-br from-chart-warning/10 to-chart-warning/5"
              borderColor="border-chart-warning/20"
            />
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <span>Demand Index: <strong className="text-foreground font-semibold">{selectedCounty.demandIndex}%</strong></span>
            <span>Last updated: {selectedCounty.lastUpdated}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function PriceCard({ label, price, icon, color, bgColor, borderColor }: {
  label: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor?: string;
}) {
  return (
    <div className={cn('rounded-lg p-4 border transition-all hover:shadow-md', bgColor, borderColor)}>
      <div className={cn('flex items-center gap-1.5 mb-2', color)}>
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-poppins font-bold text-foreground">
        {price.toFixed(2)}
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5">per litre</div>
    </div>
  );
}
