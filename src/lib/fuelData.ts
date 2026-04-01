// Simulated fuel price data engine

export interface FuelPrice {
  time: string;
  petrol: number;
  diesel: number;
}

export interface RegionDemand {
  region: string;
  demand: number;
  maxDemand: number;
  unit: string;
}

export interface MetricData {
  currentPrice: number;
  priceChange: number;
  demandIndex: number;
  demandTrend: string;
  activeRegion: string;
  activeTerminals: number;
  regionYoYChange: number;
}

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function generateWeeklyData(): FuelPrice[] {
  return DAYS.map((day, i) => ({
    time: day,
    petrol: 3.2 + Math.sin(i * 0.8) * 0.4 + Math.random() * 0.3,
    diesel: 3.0 + Math.sin(i * 0.6 + 1) * 0.5 + Math.random() * 0.2,
  }));
}

function generate24hData(): FuelPrice[] {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    petrol: 3.7 + Math.sin(i * 0.3) * 0.15 + Math.random() * 0.1,
    diesel: 3.5 + Math.sin(i * 0.25 + 0.5) * 0.2 + Math.random() * 0.08,
  }));
}

function generate30dData(): FuelPrice[] {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    petrol: 3.5 + Math.sin(i * 0.2) * 0.3 + Math.random() * 0.15,
    diesel: 3.3 + Math.sin(i * 0.15 + 1) * 0.35 + Math.random() * 0.12,
  }));
}

export function getPriceData(period: '24h' | '7d' | '30d'): FuelPrice[] {
  switch (period) {
    case '24h': return generate24hData();
    case '7d': return generateWeeklyData();
    case '30d': return generate30dData();
  }
}

export function getRegionDemand(): RegionDemand[] {
  return [
    { region: 'SOUTH REGION', demand: 94, maxDemand: 100, unit: '94K BARRELS' },
    { region: 'EAST COAST', demand: 72, maxDemand: 100, unit: '72K BARRELS' },
    { region: 'MIDWEST', demand: 58, maxDemand: 100, unit: '58K BARRELS' },
    { region: 'PACIFIC WEST', demand: 86, maxDemand: 100, unit: '86K BARRELS' },
  ];
}

export function getMetrics(): MetricData {
  return {
    currentPrice: 3.85 + (Math.random() - 0.5) * 0.1,
    priceChange: 2.4 + (Math.random() - 0.5) * 0.5,
    demandIndex: 72 + Math.floor((Math.random() - 0.5) * 4),
    demandTrend: 'Slight Softening',
    activeRegion: 'South Region',
    activeTerminals: 4308,
    regionYoYChange: 12,
  };
}

export const REGIONS = [
  'North America - South Region',
  'North America - East Coast',
  'North America - Midwest',
  'North America - Pacific West',
  'Europe - Western',
  'Asia Pacific',
];

export const FUEL_TYPES = ['Premium Petrol', 'Ultra Diesel', 'Regular', 'E85'];

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'warning';
  time: string;
  read: boolean;
}

export function getNotifications(): Notification[] {
  return [
    { id: '1', title: 'Price Spike Detected', message: 'South Region petrol prices surged 4.2% in the last hour', type: 'alert', time: '2 min ago', read: false },
    { id: '2', title: 'Demand Surge', message: 'East Coast demand up 15% vs weekly average', type: 'warning', time: '18 min ago', read: false },
    { id: '3', title: 'Report Ready', message: 'Weekly analytics report has been generated', type: 'info', time: '1 hour ago', read: true },
    { id: '4', title: 'New Region Data', message: 'Pacific West terminal data updated', type: 'info', time: '3 hours ago', read: true },
  ];
}
