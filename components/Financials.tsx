
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_MODEL_DATA } from '../constants';

const Financials: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Forward Price Deck & Revenue Waterfall</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_MODEL_DATA}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" stroke="#059669" />
              <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
              <Tooltip />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#059669" 
                fillOpacity={1} 
                fill="url(#colorRev)" 
                name="Gross Revenue (USD m)"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                fillOpacity={0}
                name="Mid-Price (USD/tCO2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">5-Layer Funding Cascade</h3>
          <div className="space-y-3">
            {[
              { label: '1. Seed Grant', size: '$5m', source: 'GCF Enhanced Direct Access' },
              { label: '2. PPF Grant', size: '$10m', source: 'GCF + FCDO + GoU' },
              { label: '3. RBF Soft Loan', size: '$50m', source: 'EXIM China + FCDO' },
              { label: '4. Bond Tranche-1', size: '$50m', source: 'Impact Funds' },
              { label: '5. Bond Tranche-2', size: '$50m', source: 'Diaspora + CSR' },
            ].map((layer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-700">{layer.label}</p>
                  <p className="text-xs text-slate-500">{layer.source}</p>
                </div>
                <span className="text-emerald-600 font-bold">{layer.size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Risk Matrix & Sensitivity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-slate-400">
                  <th className="pb-2 font-medium">Scenario</th>
                  <th className="pb-2 font-medium">Survival</th>
                  <th className="pb-2 font-medium">IRR</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b"><td className="py-3">Low Price ($20)</td><td className="py-3">75%</td><td className="py-3 font-semibold text-orange-600">11%</td></tr>
                <tr className="border-b"><td className="py-3">Mid Case ($30)</td><td className="py-3">87%</td><td className="py-3 font-semibold text-emerald-600">19%</td></tr>
                <tr className="border-b"><td className="py-3">High Case ($40)</td><td className="py-3">95%</td><td className="py-3 font-semibold text-blue-600">29%</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-xs text-red-800 font-semibold mb-1 uppercase">Critical Safeguard</p>
            <p className="text-xs text-red-700 leading-relaxed">
              MIGA political-risk indemnity cover ($50m) and Parametric wildfire insurance ($70m) are capitalised into the bond issue to manage residual price and reversal risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
