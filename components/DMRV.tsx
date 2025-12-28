
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CaptureZone {
  id: string;
  name: string;
  stock: string;
  trend: 'up' | 'down' | 'stable';
  coords: { x: number; y: number };
}

const ZONES: CaptureZone[] = [
  { id: 'z1', name: 'Masaka North', stock: '14,200', trend: 'up', coords: { x: 350, y: 320 } },
  { id: 'z2', name: 'Masaka South', stock: '21,500', trend: 'stable', coords: { x: 420, y: 380 } },
  { id: 'z3', name: 'Kalungu Hub', stock: '8,900', trend: 'up', coords: { x: 300, y: 280 } },
];

const DMRV: React.FC = () => {
  const [activeZone, setActiveZone] = useState<CaptureZone | null>(ZONES[0]);

  const mockCaptureData = [
    { month: 'Jan', projected: 10, actual: 9 },
    { month: 'Feb', projected: 12, actual: 11 },
    { month: 'Mar', projected: 15, actual: 16 },
    { month: 'Apr', projected: 18, actual: 19 },
    { month: 'May', projected: 22, actual: 21 },
    { month: 'Jun', projected: 25, actual: 24 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Sentinel-2 Interactive Capture Mesh</h3>
            <span className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
              Live Mesh Sync
            </span>
          </div>
          
          <div className="aspect-[16/9] bg-slate-900 rounded-3xl relative overflow-hidden border-4 border-slate-100 shadow-inner group">
             {/* Dynamic Mesh SVG Overlay */}
             <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 800 500">
                <defs>
                   <pattern id="mesh" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5"/>
                   </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mesh)" />
             </svg>

             {/* Uganda Topographic Silhouette */}
             <svg className="absolute inset-0 w-full h-full p-12 transition-transform duration-1000 group-hover:scale-105" viewBox="0 0 800 500">
                <path 
                  d="M400,100 L450,150 L430,250 L350,300 L300,200 Z" 
                  fill="rgba(16, 185, 129, 0.1)" 
                  stroke="rgba(16, 185, 129, 0.3)" 
                  strokeWidth="2" 
                />
                {ZONES.map(zone => (
                  <g 
                    key={zone.id} 
                    className="cursor-pointer group/zone pointer-events-auto"
                    onClick={() => setActiveZone(zone)}
                  >
                    <circle 
                      cx={zone.coords.x} 
                      cy={zone.coords.y} 
                      r={activeZone?.id === zone.id ? "12" : "8"} 
                      className={`transition-all duration-300 ${activeZone?.id === zone.id ? 'fill-blue-500' : 'fill-emerald-500 hover:fill-emerald-400'}`} 
                    />
                    <circle 
                      cx={zone.coords.x} 
                      cy={zone.coords.y} 
                      r="20" 
                      fill="currentColor" 
                      className={`animate-ping opacity-20 ${activeZone?.id === zone.id ? 'text-blue-400' : 'text-emerald-400'}`} 
                    />
                  </g>
                ))}
             </svg>
             
             {activeZone && (
               <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white animate-in slide-in-from-right-8 duration-500 max-w-[200px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Cluster</p>
                  <h4 className="text-lg font-black text-slate-900 mb-2 leading-none">{activeZone.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-black text-emerald-600">{activeZone.stock}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">tCO2e</span>
                  </div>
               </div>
             )}
          </div>
        </div>

        {/* Real-time Capture Feed */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-widest text-[10px]">Capture Performance Hub</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={mockCaptureData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#10b981" fillOpacity={0.05} strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4 pt-6 border-t border-slate-100">
             <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-500">Cumulative Flux</span>
                <span className="text-slate-900">142.5k tCO2e</span>
             </div>
             <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-500">Scan Interval</span>
                <span className="text-blue-600">6.2 Hours</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMRV;
