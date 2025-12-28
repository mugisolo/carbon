
import React from 'react';

export const BOND_SPECS = {
  duration: '20-Year',
  targetCO2: '20 MtCO2e',
  targetChildren: '50,000',
  targetFunding: 'USD 100 Million',
  oneAcreTrees: 400,
  oneAcreCO2Total: 400, // 20 years
  escrowPerChild: 9000, // USD
};

export const REVENUE_MODEL_DATA = [
  { year: '2026', price: 24, volume: 2, revenue: 48 },
  { year: '2027', price: 27, volume: 3, revenue: 81 },
  { year: '2028', price: 34, volume: 4, revenue: 136 },
  { year: '2029', price: 38, volume: 4, revenue: 152 },
  { year: '2030', price: 42, volume: 5, revenue: 210 },
  { year: '2031-35', price: 45, volume: 10, revenue: 450 },
  { year: '2036-40', price: 50, volume: 10, revenue: 500 },
];

export const TREE_SPECIES = [
  { name: 'Terminalia superba', share: '60%', detail: '11.2 tCO2/acre/yr' },
  { name: 'Maesopsis eminii', share: '20%', detail: '10.5 tCO2/acre' },
  { name: 'Grevillea robusta', share: '10%', detail: 'Fire-resistant' },
  { name: 'Fruit (Mango/Jackfruit)', share: '10%', detail: 'Food security' },
];

export const SDG_GOALS = [
  { id: 1, title: 'No Poverty', target: '50k households, +$2,400 income/acre' },
  { id: 4, title: 'Quality Education', target: '50k children completion' },
  { id: 5, title: 'Gender Equality', target: '60% girls, 52% female-headed HH' },
  { id: 8, title: 'Decent Work', target: '5k FTE jobs/yr' },
  { id: 13, title: 'Climate Action', target: '20 MtCO2e sequestered' },
];
