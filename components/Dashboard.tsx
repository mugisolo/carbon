
import React from 'react';
import { BOND_SPECS, TREE_SPECIES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const summaryStats = [
    { label: 'Sequestration', value: BOND_SPECS.targetCO2, sub: 'Over 20 Years' },
    { label: 'Education Reach', value: BOND_SPECS.targetChildren, sub: 'Children Funded' },
    { label: 'Bond Value', value: BOND_SPECS.targetFunding, sub: 'Series Total' },
    { label: 'Farmer Income', value: '+$2,400', sub: 'Cumulative per Acre' },
  ];

  const chartData = [
    { name: 'Term. superba', value: 60, color: '#059669' },
    { name: 'Maesopsis', value: 20, color: '#10b981' },
    { name: 'Grevillea', value: 10, color: '#34d399' },
    { name: 'Fruit', value: 10, color: '#6ee7b7' },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Allometrics Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Sequestration Allometrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {TREE_SPECIES.map((species, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-slate-600">{species.name}</span>
                <span className="font-semibold text-emerald-600">{species.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Narrative Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-blue-700 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-4 italic">"Uganda Carbon-Ed Bond"</h3>
            <p className="text-emerald-50 mb-6 leading-relaxed">
              Transitioning Uganda's carbon industry from a 33M credit historical stock to a 150M credit pipeline. 
              Our unique model bundles high-integrity community removal credits with verified education co-benefits, 
              unlocking a 38% price premium from global tech and sovereign buyers.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-xs font-bold uppercase text-emerald-200">IRR Target</p>
                <p className="text-xl font-bold">19.4%</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-xs font-bold uppercase text-emerald-200">Social Return</p>
                <p className="text-xl font-bold">6.2 : 1</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
