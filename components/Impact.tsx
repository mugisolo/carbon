
import React from 'react';
import { SDG_GOALS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IMPACT_CHART_DATA = [
  { year: '2026', completion: 5000, target: 75000 },
  { year: '2027', completion: 12000, target: 75000 },
  { year: '2028', completion: 22000, target: 75000 },
  { year: '2029', completion: 35000, target: 75000 },
  { year: '2030', completion: 52000, target: 75000 },
];

const Impact: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {SDG_GOALS.map((sdg) => (
          <div key={sdg.id} className="bg-white p-6 rounded-2xl border-t-4 border-emerald-500 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-black text-xs mb-3">
              {sdg.id}
            </div>
            <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-2">{sdg.title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed mt-auto font-medium">
              {sdg.target}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Education Progress Visualization */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">SDG 4: Educational Completion Path</h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest">Target: 75,000 Verified Graduates</p>
            </div>
            <span className="text-xl font-black text-emerald-600">69% Target Delta</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IMPACT_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'transparent'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="completion" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Uplift */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800">
          <h3 className="text-lg font-black mb-6 text-emerald-400 uppercase tracking-widest">GYSI Engineered Targets</h3>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-pink-400">Girls in Education</span>
                <span className="text-white">60%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 w-[60%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-blue-400">Female Headed Households</span>
                <span className="text-white">52%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[52%]"></div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "Verified impact reporting via dMRV ensures that gender-parity dividends are disbursed directly to farmer wallets."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
