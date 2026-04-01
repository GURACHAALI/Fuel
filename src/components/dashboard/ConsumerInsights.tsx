import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react';

// Consumption Pattern Data - Peak times of the day/week
const consumptionPatterns = [
  { time: '6 AM', petrol: 45, diesel: 65, kerosene: 20 },
  { time: '9 AM', petrol: 78, diesel: 92, kerosene: 35 },
  { time: '12 PM', petrol: 120, diesel: 110, kerosene: 50 },
  { time: '3 PM', petrol: 95, diesel: 115, kerosene: 40 },
  { time: '6 PM', petrol: 140, diesel: 105, kerosene: 55 },
  { time: '9 PM', petrol: 110, diesel: 85, kerosene: 75 },
  { time: '12 AM', petrol: 60, diesel: 50, kerosene: 60 },
];

// Demand Forecasting - Next 12 weeks prediction
const demandForecast = [
  { week: 'Week 1', predicted: 225, confidence: 95 },
  { week: 'Week 2', predicted: 228, confidence: 93 },
  { week: 'Week 3', predicted: 232, confidence: 90 },
  { week: 'Week 4', predicted: 229, confidence: 88 },
  { week: 'Week 5', predicted: 226, confidence: 85 },
  { week: 'Week 6', predicted: 230, confidence: 83 },
  { week: 'Week 7', predicted: 235, confidence: 80 },
  { week: 'Week 8', predicted: 233, confidence: 82 },
  { week: 'Week 9', predicted: 228, confidence: 85 },
  { week: 'Week 10', predicted: 231, confidence: 87 },
  { week: 'Week 11', predicted: 234, confidence: 89 },
  { week: 'Week 12', predicted: 237, confidence: 91 },
];

// Price Sensitivity - How demand changes with price changes
const priceSensitivity = [
  { priceChange: -5, demandChange: 12 },
  { priceChange: -4, demandChange: 10 },
  { priceChange: -3, demandChange: 8 },
  { priceChange: -2, demandChange: 5 },
  { priceChange: -1, demandChange: 2 },
  { priceChange: 0, demandChange: 0 },
  { priceChange: 1, demandChange: -3 },
  { priceChange: 2, demandChange: -6 },
  { priceChange: 3, demandChange: -9 },
  { priceChange: 4, demandChange: -12 },
  { priceChange: 5, demandChange: -15 },
];

// Consumer Segmentation
const consumerSegments = [
  { name: 'Commuters (40%)', value: 40, fill: 'hsl(212, 85%, 55%)' },
  { name: 'Commercial (35%)', value: 35, fill: 'hsl(28, 90%, 58%)' },
  { name: 'Industrial (15%)', value: 15, fill: 'hsl(38, 100%, 56%)' },
  { name: 'Household (10%)', value: 10, fill: 'hsl(142, 76%, 50%)' },
];

export default function ConsumerInsights() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-poppins font-bold text-foreground mb-1">Consumer Behavior & Insights</h2>
        <p className="text-sm text-muted-foreground">Understand consumption patterns, demand forecasts, and consumer segments</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-metric-up bg-metric-up/10 px-2.5 py-1 rounded-full">Peak Time</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Peak Consumption</div>
          <div className="text-2xl font-poppins font-bold text-foreground">6 PM</div>
          <div className="text-xs text-muted-foreground mt-2">140 KES/min consumption rate</div>
        </div>

        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-diesel/20 to-chart-diesel/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-diesel" />
            </div>
            <span className="text-xs font-bold text-metric-up bg-metric-up/10 px-2.5 py-1 rounded-full">Next 12W</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Forecast Average</div>
          <div className="text-2xl font-poppins font-bold text-foreground">KES 231</div>
          <div className="text-xs text-muted-foreground mt-2">91% confidence level</div>
        </div>

        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-warning/20 to-chart-warning/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-chart-warning" />
            </div>
            <span className="text-xs font-bold text-metric-down bg-metric-down/10 px-2.5 py-1 rounded-full">Sensitivity</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Price Elasticity</div>
          <div className="text-2xl font-poppins font-bold text-foreground">-3.0%</div>
          <div className="text-xs text-muted-foreground mt-2">Demand falls 3% per 1% price rise</div>
        </div>

        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Largest</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Top Segment</div>
          <div className="text-2xl font-poppins font-bold text-foreground">Commuters</div>
          <div className="text-xs text-muted-foreground mt-2">40% of total consumption</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Consumption Pattern */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">Daily Consumption Pattern</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={consumptionPatterns}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218, 15%, 88%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0,0%,100%)', 
                  border: '1px solid hsl(218,15%,88%)', 
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="petrol" stroke="hsl(212, 85%, 55%)" strokeWidth={2} />
              <Line type="monotone" dataKey="diesel" stroke="hsl(28, 90%, 58%)" strokeWidth={2} />
              <Line type="monotone" dataKey="kerosene" stroke="hsl(38, 100%, 56%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Demand Forecast */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">12-Week Demand Forecast</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218, 15%, 88%)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'hsl(216, 10%, 52%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0,0%,100%)', 
                  border: '1px solid hsl(218,15%,88%)', 
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `KES ${value}`}
              />
              <Bar dataKey="predicted" fill="hsl(212, 85%, 55%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Price Sensitivity Analysis */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">Price Sensitivity Curve</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218, 15%, 88%)" />
              <XAxis 
                dataKey="priceChange" 
                label={{ value: 'Price Change (%)', position: 'insideBottomRight', offset: -10 }}
                tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }}
              />
              <YAxis 
                label={{ value: 'Demand Change (%)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0,0%,100%)', 
                  border: '1px solid hsl(218,15%,88%)', 
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Scatter name="Elasticity" data={priceSensitivity} fill="hsl(212, 85%, 55%)" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Consumer Segmentation */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all flex flex-col">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">Consumer Segmentation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={consumerSegments}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                dataKey="value"
              >
                {consumerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4 text-xs">
            {consumerSegments.map((segment) => (
              <div key={segment.name} className="flex items-center justify-between">
                <span className="text-muted-foreground">{segment.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
          <h4 className="font-poppins font-bold text-foreground mb-3">📊 Consumption Insights</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Peak Hour:</strong> 6 PM with 140 KES/min consumption</li>
            <li>• <strong>Lowest Hour:</strong> 6 AM with only 45 KES/min</li>
            <li>• <strong>Trend:</strong> 3x difference between peak and low hours</li>
            <li>• <strong>Action:</strong> Plan supply accordingly for evening rush</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
          <h4 className="font-poppins font-bold text-foreground mb-3">📈 Forecast & Sensitivity</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Elasticity:</strong> Demand drops 3% for every 1% price increase</li>
            <li>• <strong>Forecast:</strong> Prices expected to rise to KES 237 in 12 weeks</li>
            <li>• <strong>Confidence:</strong> 91% confidence in predictions</li>
            <li>• <strong>Implication:</strong> Price-sensitive market requires careful strategy</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-metric-up/10 to-metric-up/5 rounded-xl p-6 border border-metric-up/20">
          <h4 className="font-poppins font-bold text-foreground mb-3">👥 Consumer Breakdown</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Commuters (40%):</strong> Highest consumption, price-sensitive</li>
            <li>• <strong>Commercial (35%):</strong> Stable, bulk purchasing</li>
            <li>• <strong>Industrial (15%):</strong> Consistent, long-term contracts</li>
            <li>• <strong>Household (10%):</strong> Discretionary, seasonal variation</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-chart-warning/10 to-chart-warning/5 rounded-xl p-6 border border-chart-warning/20">
          <h4 className="font-poppins font-bold text-foreground mb-3">⚡ Strategic Recommendations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Pricing:</strong> Commuters are most price-sensitive segment</li>
            <li>• <strong>Supply:</strong> Increase inventory before 5 PM daily</li>
            <li>• <strong>Marketing:</strong> Target commercial segment for growth</li>
            <li>• <strong>Planning:</strong> Expect upward price trend in coming weeks</li>
          </ul>
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-4" />
    </div>
  );
}
