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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search any Kenya county for fuel prices..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          className="w-full h-12 pl-12 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent shadow-sm text-sm"
        />
        {query && (
          <button onClick={clearSelection} className="absolute right-4 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && results.length > 0 && (
          <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto scrollbar-thin animate-slide-in">
            {results.map((county) => (
              <button
                key={county}
                onClick={() => handleSelect(county)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-b border-border last:border-0"
              >
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{county}</span>
                <span className="ml-auto text-xs text-muted-foreground">County</span>
              </button>
            ))}
          </div>
        )}
        {showDropdown && query.trim() && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 p-4 text-center text-sm text-muted-foreground animate-slide-in">
            No county found matching "{query}"
          </div>
        )}
      </div>

      {/* Selected County Price Card */}
      {selectedCounty && (
        <div className="mt-4 bg-card rounded-xl border border-border shadow-sm p-5 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-foreground">{selectedCounty.county} County</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                {selectedCounty.stations} STATIONS
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-accent bg-sidebar-accent px-2 py-1 rounded animate-pulse-subtle">
                LIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <PriceCard
              label="Super Petrol"
              price={selectedCounty.superPetrol}
              icon={<Fuel className="w-4 h-4" />}
              color="text-accent"
              bgColor="bg-sidebar-accent"
            />
            <PriceCard
              label="Regular Petrol"
              price={selectedCounty.regularPetrol}
              icon={<Fuel className="w-4 h-4" />}
              color="text-chart-success"
              bgColor="bg-muted"
            />
            <PriceCard
              label="Diesel"
              price={selectedCounty.diesel}
              icon={<Flame className="w-4 h-4" />}
              color="text-chart-diesel"
              bgColor="bg-muted"
            />
            <PriceCard
              label="Kerosene"
              price={selectedCounty.kerosene}
              icon={<Droplets className="w-4 h-4" />}
              color="text-chart-warning"
              bgColor="bg-muted"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Demand Index: <strong className="text-foreground">{selectedCounty.demandIndex}%</strong></span>
            <span>Last updated: {selectedCounty.lastUpdated}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function PriceCard({ label, price, icon, color, bgColor }: {
  label: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={cn('rounded-lg p-3', bgColor)}>
      <div className={cn('flex items-center gap-1.5 mb-1', color)}>
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-lg font-bold text-foreground">
        KES {price.toFixed(2)}
      </div>
      <div className="text-[10px] text-muted-foreground">per litre</div>
    </div>
  );
}
