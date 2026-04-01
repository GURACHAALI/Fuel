import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import NationalMetrics from '@/components/dashboard/NationalMetrics';
import CountySearch from '@/components/dashboard/CountySearch';
import PriceTrendsChart from '@/components/dashboard/PriceTrendsChart';
import CountyDemandPanel from '@/components/dashboard/CountyDemandPanel';
import CountyPriceTable from '@/components/dashboard/CountyPriceTable';
import { getNationalAverage } from '@/lib/kenyaFuelData';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [avgPrices, setAvgPrices] = useState(getNationalAverage());
  const [selectedCounty, setSelectedCounty] = useState<string | undefined>();

  useEffect(() => {
    const interval = setInterval(() => {
      setAvgPrices(getNationalAverage());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 ml-[200px]">
        <TopBar />

        <main className="p-6 space-y-6">
          {/* County Search */}
          <CountySearch onCountySelect={setSelectedCounty} />

          {/* National Averages */}
          <NationalMetrics avgPrices={avgPrices} />

          {/* Price Trends */}
          <PriceTrendsChart />

          {/* Demand Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CountyDemandPanel selectedCounty={selectedCounty} />
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-base font-bold text-foreground mb-1">Quick County Comparison</h3>
              <p className="text-xs text-muted-foreground mb-4">Cheapest vs most expensive counties</p>
              <div className="space-y-3">
                {[
                  { label: 'Cheapest Super Petrol', county: 'Mombasa', price: 'KES 215.22' },
                  { label: 'Most Expensive Super Petrol', county: 'Mandera', price: 'KES 229.80' },
                  { label: 'Cheapest Diesel', county: 'Mombasa', price: 'KES 198.50' },
                  { label: 'Most Expensive Diesel', county: 'Mandera', price: 'KES 213.20' },
                  { label: 'Cheapest Kerosene', county: 'Mombasa', price: 'KES 190.45' },
                  { label: 'Most Expensive Kerosene', county: 'Mandera', price: 'KES 205.10' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-semibold text-foreground">{item.county}</div>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full County Table */}
          <CountyPriceTable />
        </main>
      </div>
    </div>
  );
}
