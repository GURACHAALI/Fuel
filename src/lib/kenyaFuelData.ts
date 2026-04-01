// Kenya County Fuel Price Data Engine

export interface CountyFuelPrice {
  county: string;
  superPetrol: number;
  regularPetrol: number;
  diesel: number;
  kerosene: number;
  lastUpdated: string;
  stations: number;
  demandIndex: number;
}

export interface FuelTrend {
  time: string;
  superPetrol: number;
  diesel: number;
  kerosene: number;
}

export interface CountyDemand {
  county: string;
  demand: number;
  maxDemand: number;
  unit: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'warning';
  time: string;
  read: boolean;
}

// All 47 Kenya counties with realistic base fuel prices (KES)
// Prices vary by distance from Mombasa (port) and Nairobi (refinery)
const COUNTY_BASE_PRICES: Record<string, { superPetrol: number; diesel: number; kerosene: number; stations: number }> = {
  'Nairobi': { superPetrol: 217.36, diesel: 200.71, kerosene: 192.70, stations: 485 },
  'Mombasa': { superPetrol: 215.22, diesel: 198.50, kerosene: 190.45, stations: 210 },
  'Kisumu': { superPetrol: 220.15, diesel: 203.80, kerosene: 195.60, stations: 125 },
  'Nakuru': { superPetrol: 219.40, diesel: 202.90, kerosene: 194.50, stations: 145 },
  'Kiambu': { superPetrol: 217.36, diesel: 200.71, kerosene: 192.70, stations: 165 },
  'Machakos': { superPetrol: 218.10, diesel: 201.50, kerosene: 193.20, stations: 95 },
  'Kajiado': { superPetrol: 218.50, diesel: 201.80, kerosene: 193.60, stations: 78 },
  'Uasin Gishu': { superPetrol: 221.30, diesel: 204.60, kerosene: 196.50, stations: 110 },
  'Kilifi': { superPetrol: 216.80, diesel: 199.90, kerosene: 191.80, stations: 72 },
  'Meru': { superPetrol: 220.70, diesel: 204.10, kerosene: 196.00, stations: 85 },
  'Nyeri': { superPetrol: 219.90, diesel: 203.40, kerosene: 195.20, stations: 92 },
  'Murang\'a': { superPetrol: 219.20, diesel: 202.60, kerosene: 194.40, stations: 68 },
  'Kakamega': { superPetrol: 221.80, diesel: 205.20, kerosene: 197.10, stations: 75 },
  'Nyandarua': { superPetrol: 220.10, diesel: 203.50, kerosene: 195.30, stations: 42 },
  'Kirinyaga': { superPetrol: 219.50, diesel: 203.00, kerosene: 194.80, stations: 48 },
  'Embu': { superPetrol: 220.30, diesel: 203.70, kerosene: 195.50, stations: 55 },
  'Bungoma': { superPetrol: 222.10, diesel: 205.50, kerosene: 197.40, stations: 65 },
  'Trans Nzoia': { superPetrol: 222.40, diesel: 205.80, kerosene: 197.70, stations: 52 },
  'Nandi': { superPetrol: 221.60, diesel: 205.00, kerosene: 196.90, stations: 45 },
  'Kericho': { superPetrol: 221.00, diesel: 204.40, kerosene: 196.30, stations: 58 },
  'Bomet': { superPetrol: 221.50, diesel: 204.90, kerosene: 196.80, stations: 38 },
  'Narok': { superPetrol: 221.90, diesel: 205.30, kerosene: 197.20, stations: 42 },
  'Laikipia': { superPetrol: 220.60, diesel: 204.00, kerosene: 195.90, stations: 35 },
  'Baringo': { superPetrol: 222.20, diesel: 205.60, kerosene: 197.50, stations: 30 },
  'Elgeyo Marakwet': { superPetrol: 222.50, diesel: 205.90, kerosene: 197.80, stations: 25 },
  'West Pokot': { superPetrol: 224.30, diesel: 207.70, kerosene: 199.60, stations: 18 },
  'Turkana': { superPetrol: 228.50, diesel: 211.90, kerosene: 203.80, stations: 12 },
  'Samburu': { superPetrol: 225.10, diesel: 208.50, kerosene: 200.40, stations: 15 },
  'Marsabit': { superPetrol: 227.80, diesel: 211.20, kerosene: 203.10, stations: 10 },
  'Isiolo': { superPetrol: 224.90, diesel: 208.30, kerosene: 200.20, stations: 20 },
  'Tharaka Nithi': { superPetrol: 221.10, diesel: 204.50, kerosene: 196.40, stations: 28 },
  'Kitui': { superPetrol: 221.70, diesel: 205.10, kerosene: 197.00, stations: 45 },
  'Makueni': { superPetrol: 220.40, diesel: 203.80, kerosene: 195.60, stations: 40 },
  'Kwale': { superPetrol: 216.50, diesel: 199.60, kerosene: 191.50, stations: 35 },
  'Taita Taveta': { superPetrol: 218.90, diesel: 202.30, kerosene: 194.10, stations: 28 },
  'Tana River': { superPetrol: 223.50, diesel: 206.90, kerosene: 198.80, stations: 12 },
  'Lamu': { superPetrol: 219.30, diesel: 202.70, kerosene: 194.50, stations: 15 },
  'Garissa': { superPetrol: 225.60, diesel: 209.00, kerosene: 200.90, stations: 22 },
  'Wajir': { superPetrol: 227.20, diesel: 210.60, kerosene: 202.50, stations: 10 },
  'Mandera': { superPetrol: 229.80, diesel: 213.20, kerosene: 205.10, stations: 8 },
  'Siaya': { superPetrol: 221.20, diesel: 204.60, kerosene: 196.50, stations: 42 },
  'Vihiga': { superPetrol: 221.90, diesel: 205.30, kerosene: 197.20, stations: 30 },
  'Busia': { superPetrol: 222.60, diesel: 206.00, kerosene: 197.90, stations: 35 },
  'Migori': { superPetrol: 222.00, diesel: 205.40, kerosene: 197.30, stations: 38 },
  'Homa Bay': { superPetrol: 221.70, diesel: 205.10, kerosene: 197.00, stations: 32 },
  'Kisii': { superPetrol: 221.40, diesel: 204.80, kerosene: 196.70, stations: 55 },
  'Nyamira': { superPetrol: 221.60, diesel: 205.00, kerosene: 196.90, stations: 28 },
};

const COUNTIES = Object.keys(COUNTY_BASE_PRICES);

// Add small random fluctuation to simulate real-time changes
function fluctuate(base: number, range: number = 0.5): number {
  return +(base + (Math.random() - 0.5) * range * 2).toFixed(2);
}

export function getAllCounties(): string[] {
  return COUNTIES;
}

export function searchCounties(query: string): string[] {
  if (!query.trim()) return COUNTIES;
  const lower = query.toLowerCase();
  return COUNTIES.filter(c => c.toLowerCase().includes(lower));
}

export function getCountyPrice(county: string): CountyFuelPrice | null {
  const base = COUNTY_BASE_PRICES[county];
  if (!base) return null;

  return {
    county,
    superPetrol: fluctuate(base.superPetrol),
    regularPetrol: fluctuate(base.superPetrol - 8.5),
    diesel: fluctuate(base.diesel),
    kerosene: fluctuate(base.kerosene),
    lastUpdated: new Date().toLocaleTimeString('en-KE'),
    stations: base.stations,
    demandIndex: Math.floor(55 + Math.random() * 40),
  };
}

export function getAllCountyPrices(): CountyFuelPrice[] {
  return COUNTIES.map(county => getCountyPrice(county)!);
}

export function getNationalAverage(): { superPetrol: number; diesel: number; kerosene: number } {
  const prices = getAllCountyPrices();
  return {
    superPetrol: +(prices.reduce((s, p) => s + p.superPetrol, 0) / prices.length).toFixed(2),
    diesel: +(prices.reduce((s, p) => s + p.diesel, 0) / prices.length).toFixed(2),
    kerosene: +(prices.reduce((s, p) => s + p.kerosene, 0) / prices.length).toFixed(2),
  };
}

export function getPriceTrends(period: '24h' | '7d' | '30d'): FuelTrend[] {
  const len = period === '24h' ? 24 : period === '7d' ? 7 : 30;
  const labels = period === '24h'
    ? Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
    : period === '7d'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  return labels.map((time, i) => ({
    time,
    superPetrol: 217 + Math.sin(i * 0.4) * 3 + Math.random() * 1.5,
    diesel: 200 + Math.sin(i * 0.35 + 1) * 3.5 + Math.random() * 1.2,
    kerosene: 192 + Math.sin(i * 0.3 + 2) * 2.5 + Math.random() * 1,
  }));
}

export function getTopDemandCounties(): CountyDemand[] {
  return [
    { county: 'Nairobi', demand: 94, maxDemand: 100, unit: '2.4M Litres' },
    { county: 'Mombasa', demand: 78, maxDemand: 100, unit: '1.8M Litres' },
    { county: 'Kisumu', demand: 62, maxDemand: 100, unit: '1.2M Litres' },
    { county: 'Nakuru', demand: 58, maxDemand: 100, unit: '1.1M Litres' },
    { county: 'Uasin Gishu', demand: 45, maxDemand: 100, unit: '890K Litres' },
    { county: 'Kiambu', demand: 72, maxDemand: 100, unit: '1.5M Litres' },
  ];
}

export function getNotifications(): Notification[] {
  return [
    { id: '1', title: 'Price Update - Nairobi', message: 'Super Petrol prices adjusted by EPRA to KES 217.36/litre', type: 'alert', time: '5 min ago', read: false },
    { id: '2', title: 'Demand Surge - Mombasa', message: 'Mombasa county fuel demand up 12% this week', type: 'warning', time: '30 min ago', read: false },
    { id: '3', title: 'New EPRA Bulletin', message: 'Monthly fuel price review published for all counties', type: 'info', time: '2 hours ago', read: true },
    { id: '4', title: 'Supply Alert - Turkana', message: 'Low fuel reserves reported in Turkana county stations', type: 'alert', time: '4 hours ago', read: true },
  ];
}

export function getInsight(county?: string): string {
  const insights = [
    `Nairobi fuel consumption is 18% above the national average. Consider bulk purchasing for fleet operations.`,
    `Diesel prices in coastal counties (Mombasa, Kilifi, Kwale) are 2-4 KES lower due to port proximity.`,
    `Northern counties (Turkana, Marsabit, Mandera) show 5-8% higher prices due to transportation costs.`,
    `Weekend demand typically drops 15-20% across major urban counties.`,
    `EPRA price review expected next week — current trends suggest a 1.5-3 KES increase for Super Petrol.`,
  ];
  if (county) {
    return `${county} County: Current fuel demand is trending ${Math.random() > 0.5 ? 'above' : 'at'} seasonal averages. ${Math.random() > 0.5 ? 'Consider monitoring supply levels at local stations.' : 'Price stability expected for the next 14-day window.'}`;
  }
  return insights[Math.floor(Math.random() * insights.length)];
}
