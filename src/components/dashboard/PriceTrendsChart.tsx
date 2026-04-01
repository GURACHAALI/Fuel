import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getPriceTrends, type FuelTrend } from '@/lib/kenyaFuelData';

type Period = '24h' | '7d' | '30d';

export default function PriceTrendsChart() {
  const [period, setPeriod] = useState<Period>('7d');
  const [data, setData] = useState<FuelTrend[]>([]);

  useEffect(() => {
    setData(getPriceTrends(period));
  }, [period]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const updated = [...prev];
        const last = updated.length - 1;
        if (last >= 0) {
          updated[last] = {
            ...updated[last],
            superPetrol: updated[last].superPetrol + (Math.random() - 0.5) * 0.3,
            diesel: updated[last].diesel + (Math.random() - 0.5) * 0.25,
            kerosene: updated[last].kerosene + (Math.random() - 0.5) * 0.2,
          };
        }
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm animate-slide-in" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">National Price Trends (KES)</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Live fuel price movements across Kenya</p>
        </div>
        <div className="flex bg-muted rounded-lg p-0.5">
          {(['24h', '7d', '30d'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                period === p
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(215, 80%, 55%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(215, 80%, 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="dGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(20, 70%, 50%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(20, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="kGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 92%)" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} tickFormatter={(v) => `${v.toFixed(0)}`} />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(0,0%,100%)', border: '1px solid hsl(220,15%,90%)', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(value: number, name: string) => [`KES ${value.toFixed(2)}`, name]}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingBottom: '8px' }} />
          <Area type="monotone" dataKey="superPetrol" name="Super Petrol" stroke="hsl(215, 80%, 55%)" strokeWidth={2.5} fill="url(#spGrad)" dot={false} />
          <Area type="monotone" dataKey="diesel" name="Diesel" stroke="hsl(20, 70%, 50%)" strokeWidth={2.5} fill="url(#dGrad)" dot={false} />
          <Area type="monotone" dataKey="kerosene" name="Kerosene" stroke="hsl(38, 92%, 50%)" strokeWidth={2.5} fill="url(#kGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
