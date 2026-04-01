import { TrendingUp, TrendingDown, BarChart3, AlertCircle, Award, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', superPetrol: 215, diesel: 198, kerosene: 190 },
  { month: 'Feb', superPetrol: 218, diesel: 201, kerosene: 192 },
  { month: 'Mar', superPetrol: 223, diesel: 205, kerosene: 197 },
  { month: 'Apr', superPetrol: 220, diesel: 203, kerosene: 195 },
  { month: 'May', superPetrol: 225, diesel: 208, kerosene: 199 },
  { month: 'Jun', superPetrol: 228, diesel: 211, kerosene: 202 },
  { month: 'Jul', superPetrol: 232, diesel: 215, kerosene: 206 },
  { month: 'Aug', superPetrol: 229, diesel: 212, kerosene: 203 },
  { month: 'Sep', superPetrol: 226, diesel: 209, kerosene: 200 },
  { month: 'Oct', superPetrol: 224, diesel: 207, kerosene: 198 },
  { month: 'Nov', superPetrol: 221, diesel: 204, kerosene: 195 },
  { month: 'Dec', superPetrol: 224, diesel: 207, kerosene: 197 },
];

const volatilityData = [
  { name: 'Super Petrol', volatility: 3.2, fill: 'hsl(212, 85%, 55%)' },
  { name: 'Diesel', volatility: 2.8, fill: 'hsl(28, 90%, 58%)' },
  { name: 'Kerosene', volatility: 2.1, fill: 'hsl(38, 100%, 56%)' },
];

const countyPerformance = [
  { county: 'Nairobi', avgPrice: 220, change: -2.1 },
  { county: 'Mombasa', avgPrice: 218, change: -1.5 },
  { county: 'Kisumu', avgPrice: 224, change: 1.2 },
  { county: 'Nakuru', avgPrice: 222, change: 0.8 },
  { county: 'Eldoret', avgPrice: 226, change: 2.3 },
  { county: 'Mandera', avgPrice: 235, change: 3.4 },
];

const COLORS = ['#d4553d', '#ffa500', '#90ee90'];

export default function YearlyReports() {
  const avgSuperPetrol = 224.17;
  const avgDiesel = 207.05;
  const avgKerosene = 198.08;
  
  const maxSuperPetrol = 232;
  const minSuperPetrol = 215;
  const volatility = 3.2;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-poppins font-bold text-foreground mb-1">Annual Report 2025</h2>
        <p className="text-sm text-muted-foreground">Comprehensive fuel market analysis for the past year</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-metric-up bg-metric-up/10 px-2.5 py-1 rounded-full">Year Avg</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Avg Super Petrol</div>
          <div className="text-2xl font-poppins font-bold text-foreground">KES {avgSuperPetrol.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-2">Range: {minSuperPetrol} - {maxSuperPetrol}</div>
        </div>

        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-diesel/20 to-chart-diesel/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-chart-diesel" />
            </div>
            <span className="text-xs font-bold text-metric-up bg-metric-up/10 px-2.5 py-1 rounded-full">Peak</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Avg Diesel</div>
          <div className="text-2xl font-poppins font-bold text-foreground">KES {avgDiesel.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-2">July peak at {maxSuperPetrol}</div>
        </div>

        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-chart-warning/20 to-chart-warning/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-chart-warning" />
            </div>
            <span className="text-xs font-bold text-metric-down bg-metric-down/10 px-2.5 py-1 rounded-full">Low</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Avg Kerosene</div>
          <div className="text-2xl font-poppins font-bold text-foreground">KES {avgKerosene.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-2">Most stable commodity</div>
        </div>

        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs font-bold text-metric-down bg-metric-down/10 px-2.5 py-1 rounded-full">Volatility</span>
          </div>
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-2">Price Volatility</div>
          <div className="text-2xl font-poppins font-bold text-foreground">{volatility}%</div>
          <div className="text-xs text-muted-foreground mt-2">Super Petrol variation</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">Monthly Price Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218, 15%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0,0%,100%)', 
                  border: '1px solid hsl(218,15%,88%)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="superPetrol" stroke="hsl(212, 85%, 55%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="diesel" stroke="hsl(28, 90%, 58%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="kerosene" stroke="hsl(38, 100%, 56%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volatility Analysis */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">Price Volatility by Fuel Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volatilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218, 15%, 88%)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(216, 10%, 52%)' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0,0%,100%)', 
                  border: '1px solid hsl(218,15%,88%)', 
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Bar dataKey="volatility" radius={[8, 8, 0, 0]}>
                {volatilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* County Performance & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top/Bottom Counties */}
        <div className="lg:col-span-2 bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">County Price Performance YoY</h3>
          <div className="space-y-3">
            {countyPerformance.map((county) => (
              <div key={county.county} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{county.county}</div>
                    <div className="text-xs text-muted-foreground">Average Price</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-poppins font-bold text-foreground">KES {county.avgPrice}</div>
                  <div className={`text-xs font-bold ${county.change > 0 ? 'text-metric-down' : 'text-metric-up'}`}>
                    {county.change > 0 ? '+' : ''}{county.change}% YoY
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Share */}
        <div className="bg-gradient-to-br from-card to-muted/30 rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-all flex flex-col">
          <h3 className="text-lg font-poppins font-bold text-foreground mb-6">Fuel Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Super Petrol', value: 35 },
                  { name: 'Diesel', value: 45 },
                  { name: 'Kerosene', value: 20 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                <Cell fill="hsl(212, 85%, 55%)" />
                <Cell fill="hsl(28, 90%, 58%)" />
                <Cell fill="hsl(38, 100%, 56%)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">45% - Diesel (Industrial)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">35% - Super Petrol (Transport)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">20% - Kerosene (Household)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-metric-up/10 to-metric-up/5 rounded-xl p-6 border border-metric-up/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-metric-up/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-metric-up" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-foreground mb-1">Positive Trends</h4>
              <p className="text-sm text-muted-foreground">Prices peaked in July at KES 232 for Super Petrol, representing the year's highest point across all commodities.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-metric-down/10 to-metric-down/5 rounded-xl p-6 border border-metric-down/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-metric-down/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-5 h-5 text-metric-down" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-foreground mb-1">Market Volatility</h4>
              <p className="text-sm text-muted-foreground">Super Petrol showed 3.2% volatility throughout the year, the highest among all fuel types due to global market fluctuations.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-foreground mb-1">Regional Disparities</h4>
              <p className="text-sm text-muted-foreground">Mandera County recorded 3.4% year-over-year increase, while coastal regions like Mombasa showed -1.5% decline.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-foreground mb-1">Year-End Outlook</h4>
              <p className="text-sm text-muted-foreground">Kerosene remains the most stable with only 2.1% volatility, making it ideal for long-term planning and budgeting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-4" />
    </div>
  );
}
