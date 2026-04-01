import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import NationalMetrics from '@/components/dashboard/NationalMetrics';
import CountySearch from '@/components/dashboard/CountySearch';
import PriceTrendsChart from '@/components/dashboard/PriceTrendsChart';
import CountyDemandPanel from '@/components/dashboard/CountyDemandPanel';
import CountyPriceTable from '@/components/dashboard/CountyPriceTable';
import YearlyReports from '@/components/dashboard/YearlyReports';
import Settings from '@/components/dashboard/Settings';
import ConsumerInsights from '@/components/dashboard/ConsumerInsights';
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
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-sidebar-accent/5">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 ml-[200px]">
        <TopBar />

        <main className="p-8 space-y-8 max-h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin">
          {activeTab === 'dashboard' ? (
            <>
              {/* Header Section */}
              <div className="mb-2">
                <h2 className="text-2xl font-poppins font-bold text-foreground mb-1">Market Overview</h2>
                <p className="text-sm text-muted-foreground">Real-time fuel pricing across Kenya</p>
              </div>

              {/* County Search */}
              <CountySearch onCountySelect={setSelectedCounty} />

              {/* National Averages */}
              <section className="animate-fade-in">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">National Benchmarks</h3>
                <NationalMetrics avgPrices={avgPrices} />
              </section>

              {/* Price Trends */}
              <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Market Trends</h3>
                <PriceTrendsChart />
              </section>

              {/* Demand Analysis */}
              <section className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Supply & Demand</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CountyDemandPanel selectedCounty={selectedCounty} />
                  <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-base font-poppins font-bold text-foreground mb-1">Price Extremes</h3>
                    <p className="text-xs text-muted-foreground mb-5">Cheapest vs most expensive markets</p>
                    <div className="space-y-3.5">
                      {[
                        { label: 'Cheapest Super Petrol', county: 'Mombasa', price: 'KES 215.22' },
                        { label: 'Most Expensive Super Petrol', county: 'Mandera', price: 'KES 229.80' },
                        { label: 'Cheapest Diesel', county: 'Mombasa', price: 'KES 198.50' },
                        { label: 'Most Expensive Diesel', county: 'Mandera', price: 'KES 213.20' },
                        { label: 'Cheapest Kerosene', county: 'Mombasa', price: 'KES 190.45' },
                        { label: 'Most Expensive Kerosene', county: 'Mandera', price: 'KES 205.10' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0">
                          <div>
                            <div className="text-xs text-muted-foreground font-medium">{item.label}</div>
                            <div className="text-sm font-semibold text-foreground mt-0.5">{item.county}</div>
                          </div>
                          <span className="text-sm font-poppins font-bold text-primary">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Full County Table */}
              <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">County Pricing</h3>
                <CountyPriceTable />
              </section>

              {/* Footer spacer */}
              <div className="h-4" />
            </>
          ) : activeTab === 'counties' ? (
            <>
              {/* Counties View */}
              <div className="mb-6">
                <h2 className="text-2xl font-poppins font-bold text-foreground mb-1">All 47 Counties</h2>
                <p className="text-sm text-muted-foreground">Complete fuel pricing across all Kenyan counties</p>
              </div>

              {/* County Search */}
              <CountySearch onCountySelect={setSelectedCounty} />

              {/* Full County Price Table */}
              <section className="animate-fade-in">
                <CountyPriceTable />
              </section>

              <div className="h-4" />
            </>
          ) : activeTab === 'trends' ? (
            <>
              {/* Trends View */}
              <div className="mb-6">
                <h2 className="text-2xl font-poppins font-bold text-foreground mb-1">Price Trends & Analysis</h2>
                <p className="text-sm text-muted-foreground">Historical fuel price movements</p>
              </div>

              <section className="animate-fade-in">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">National Trends (KES)</h3>
                <PriceTrendsChart />
              </section>

              <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Demand Analysis</h3>
                <CountyDemandPanel selectedCounty={selectedCounty} />
              </section>

              <div className="h-4" />
            </>
          ) : activeTab === 'insights' ? (
            <>
              {/* Consumer Insights View */}
              <ConsumerInsights />
            </>
          ) : activeTab === 'reports' ? (
            <>
              {/* Reports View */}
              <YearlyReports />
            </>
          ) : activeTab === 'settings' ? (
            <>
              {/* Settings View */}
              <Settings />
            </>
          ) : (
            <>
              {/* Fallback */}
              <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-8 border border-border shadow-sm text-center">
                <p className="text-muted-foreground">Page not found</p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
