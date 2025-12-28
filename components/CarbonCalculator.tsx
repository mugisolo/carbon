
import React, { useState } from 'react';
import { BOND_SPECS } from '../constants';

const CarbonCalculator: React.FC = () => {
  const [acres, setAcres] = useState<number>(1);
  
  const trees = acres * BOND_SPECS.oneAcreTrees;
  const co2 = acres * BOND_SPECS.oneAcreCO2Total;
  const bondValue = acres * 20000;
  const educationFund = acres * BOND_SPECS.escrowPerChild;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">One-Acre Contract Engine</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Number of Acres (Smallholder Enrollment)
            </label>
            <input 
              type="range" 
              min="0.4" 
              max="50" 
              step="0.4" 
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between mt-2 text-xl font-bold text-emerald-700">
              <span>{acres.toFixed(1)} Acres</span>
              <span>{(acres * 0.404686).toFixed(2)} Hectares</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Sequestration Yield</h4>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total High-Yield Trees</span>
                <span className="text-lg font-bold text-slate-900">{trees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">20-Year Sequestration</span>
                <span className="text-lg font-bold text-slate-900">{co2.toLocaleString()} tCO2e</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Financial Capture</h4>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Bond Face Value</span>
                <span className="text-lg font-bold text-emerald-600">USD {bondValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <span className="text-blue-700 font-medium">Education Escrow (45%)</span>
                <span className="text-lg font-bold text-blue-700">USD {educationFund.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
        <h4 className="font-bold text-emerald-800 mb-2 text-lg">The "Carbon-Ed" Logic</h4>
        <p className="text-emerald-700 text-sm leading-relaxed">
          The USD {BOND_SPECS.escrowPerChild.toLocaleString()} education escrow is designed to cover a full cycle from Primary to University. 
          Surplus funds are invested in the Bank of Uganda (BoU) Inflation-Linked Education Note, targeting a real return of 2.5%. 
          Investors exit by selling the first 200 tCO2e at Year 10, while the remaining 200 tCO2e stays with the farmer as a retirement pension.
        </p>
      </div>
    </div>
  );
};

export default CarbonCalculator;
