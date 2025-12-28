
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HistoryPoint {
  year: string;
  stock: number;
}

interface ForestRegion {
  id: string;
  name: string;
  carbonStock: string; // tCO2e/ha
  totalSequestration: string; // MtCO2e/yr
  health: 'High' | 'Stable' | 'At Risk';
  description: string;
  coords: { x: number; y: number };
  history: HistoryPoint[];
}

const ForestMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<ForestRegion | null>(null);
  const [viewBox, setViewBox] = useState('0 0 800 600');
  const [mapMode, setMapMode] = useState<'topo' | 'satellite'>('topo');

  const regions: ForestRegion[] = [
    { 
      id: 'central', 
      name: 'Mabira & Central Lake Basin', 
      carbonStock: '240', 
      totalSequestration: '4.2', 
      health: 'Stable',
      description: 'The largest block of moist semi-deciduous forest in central Uganda. Primary source of local rainfall regulation and the green lung for the Kampala-Jinja corridor.',
      coords: { x: 450, y: 350 },
      history: [
        { year: '2010', stock: 260 },
        { year: '2015', stock: 245 },
        { year: '2020', stock: 242 },
        { year: '2025', stock: 240 },
      ]
    },
    { 
      id: 'western', 
      name: 'Albertine Rift (Budongo & Kibale)', 
      carbonStock: '310', 
      totalSequestration: '7.8', 
      health: 'High',
      description: 'High biodiversity hotspots with massive carbon density. Home to significant primate populations and critical migratory corridors.',
      coords: { x: 280, y: 280 },
      history: [
        { year: '2010', stock: 325 },
        { year: '2015', stock: 320 },
        { year: '2020', stock: 315 },
        { year: '2025', stock: 310 },
      ]
    },
    { 
      id: 'southwest', 
      name: 'Bwindi & Mgahinga', 
      carbonStock: '420', 
      totalSequestration: '3.1', 
      health: 'High',
      description: 'Ancient montane forests with some of the highest carbon density per hectare in Africa. Globally unique ecosystem.',
      coords: { x: 220, y: 480 },
      history: [
        { year: '2010', stock: 430 },
        { year: '2015', stock: 428 },
        { year: '2020', stock: 425 },
        { year: '2025', stock: 420 },
      ]
    },
    { 
      id: 'northern', 
      name: 'Acholi & Lango Woodlands', 
      carbonStock: '85', 
      totalSequestration: '1.4', 
      health: 'At Risk',
      description: 'Transitionary woodlands and savannah. Critical for stopping desertification and stabilizing rural agriculture.',
      coords: { x: 400, y: 150 },
      history: [
        { year: '2010', stock: 120 },
        { year: '2015', stock: 110 },
        { year: '2020', stock: 95 },
        { year: '2025', stock: 85 },
      ]
    },
    { 
      id: 'eastern', 
      name: 'Mt Elgon Ecosystem', 
      carbonStock: '190', 
      totalSequestration: '2.2', 
      health: 'Stable',
      description: 'High altitude bamboo and evergreen forests. Essential for cross-border water catchment for Eastern Uganda and Kenya.',
      coords: { x: 600, y: 320 },
      history: [
        { year: '2010', stock: 210 },
        { year: '2015', stock: 205 },
        { year: '2020', stock: 198 },
        { year: '2025', stock: 190 },
      ]
    },
  ];

  const handleRegionClick = (region: ForestRegion) => {
    if (selectedRegion?.id === region.id) {
      setSelectedRegion(null);
      setViewBox('0 0 800 600');
    } else {
      setSelectedRegion(region);
      // Calculate zoom viewBox centered on region
      const zoomSize = 400; // 2x zoom (800 -> 400)
      const x = Math.max(0, Math.min(region.coords.x - zoomSize / 2, 800 - zoomSize));
      const y = Math.max(0, Math.min(region.coords.y - zoomSize / 2, 600 - zoomSize));
      setViewBox(`${x} ${y} ${zoomSize} ${zoomSize * 0.75}`);
    }
  };

  const resetView = () => {
    setSelectedRegion(null);
    setViewBox('0 0 800 600');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Forest Carbon Inventory</h3>
            <p className="text-slate-500 text-sm flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
              Live Geofenced Biomass Tracking (Sentinel-2 Equivalent)
            </p>
          </div>
          
          {/* Legend and Map Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center space-x-1">
              <button 
                onClick={() => setMapMode('topo')}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mapMode === 'topo' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
              >
                Topographic
              </button>
              <button 
                onClick={() => setMapMode('satellite')}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mapMode === 'satellite' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
              >
                Satellite
              </button>
            </div>
            <button 
              onClick={resetView}
              className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
            >
              Reset View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Frame */}
          <div className="lg:col-span-3 bg-slate-100 rounded-3xl border-2 border-slate-200 relative overflow-hidden h-[650px] shadow-inner group">
            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white shadow-xl max-w-[180px]">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Map Legend</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-emerald-600"></div>
                    <span className="text-[10px] font-bold text-slate-700 leading-none">High Density (&gt;300t)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-emerald-400"></div>
                    <span className="text-[10px] font-bold text-slate-700 leading-none">Medium (150-300t)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-emerald-200"></div>
                    <span className="text-[10px] font-bold text-slate-700 leading-none">Transitionary</span>
                  </div>
                  <div className="flex items-center space-x-2 border-t border-slate-100 pt-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
                    <span className="text-[10px] font-bold text-blue-600 leading-none">Selected Region</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map SVG */}
            <svg 
              viewBox={viewBox}
              className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: mapMode === 'satellite' ? 'brightness(0.8) contrast(1.2)' : 'none' }}
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={mapMode === 'satellite' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} strokeWidth="1"/>
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <rect width="800" height="600" fill={mapMode === 'satellite' ? '#0f172a' : '#f8fafc'} />
              <rect width="800" height="600" fill="url(#grid)" />
              
              {/* Lake Victoria */}
              <path 
                d="M500,450 Q550,430 600,450 Q650,480 620,550 Q580,580 500,550 Q450,520 500,450" 
                fill={mapMode === 'satellite' ? '#1e293b' : '#e0f2fe'} 
                stroke={mapMode === 'satellite' ? '#334155' : '#bae6fd'} 
                strokeWidth="2"
              />

              {/* Uganda Border Path */}
              <path 
                d="M320,50 L550,80 L650,250 L600,450 L400,550 L150,450 L100,200 L250,50 Z" 
                fill={mapMode === 'topo' ? '#f1f5f9' : '#1e293b'} 
                stroke={mapMode === 'topo' ? '#cbd5e1' : '#475569'} 
                strokeWidth="3"
                className="transition-colors duration-1000"
              />
              
              {/* Regional Biomass Heatmap */}
              <circle cx="280" cy="280" r="120" fill="#059669" fillOpacity={mapMode === 'satellite' ? "0.2" : "0.1"} className="animate-pulse" />
              <circle cx="450" cy="350" r="100" fill="#059669" fillOpacity="0.08" />
              <circle cx="220" cy="480" r="70" fill="#059669" fillOpacity="0.15" />

              {/* Interaction Points */}
              {regions.map((region) => {
                const isSelected = selectedRegion?.id === region.id;
                return (
                  <g 
                    key={region.id} 
                    className="cursor-pointer group/point"
                    onClick={() => handleRegionClick(region)}
                  >
                    <circle 
                      cx={region.coords.x} 
                      cy={region.coords.y} 
                      r={isSelected ? "14" : "9"} 
                      className={`transition-all duration-500 ease-out ${isSelected ? 'fill-blue-600' : 'fill-emerald-600 hover:fill-emerald-400'}`}
                      filter={isSelected ? "url(#glow)" : ""}
                    />
                    <circle 
                      cx={region.coords.x} 
                      cy={region.coords.y} 
                      r="22" 
                      fill="currentColor" 
                      className={`animate-ping opacity-20 duration-[2000ms] ${isSelected ? 'text-blue-400' : 'text-emerald-400'}`} 
                    />
                    {!isSelected && (
                      <text 
                        x={region.coords.x} 
                        y={region.coords.y - 20} 
                        textAnchor="middle" 
                        className={`text-[11px] font-black ${mapMode === 'topo' ? 'fill-slate-700' : 'fill-slate-300'} pointer-events-none opacity-0 group-hover/point:opacity-100 transition-opacity uppercase tracking-tighter`}
                      >
                        {region.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
              <button onClick={() => setViewBox('0 0 800 600')} className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white hover:bg-white transition-all">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
              </button>
            </div>
          </div>

          {/* Analytics Column - Slides in on selection */}
          <div className="flex flex-col space-y-4">
            {/* National Summary Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">National Inventory (Phase 0)</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-bold text-emerald-500 uppercase">Synced</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Forest Cover</p>
                  <p className="text-2xl font-black">12.4%</p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Total Stock</p>
                  <p className="text-2xl font-black">482.5 Mt</p>
                </div>
              </div>
            </div>

            {/* Region Detail Panel - Persistent but animates content */}
            <div className="flex-grow bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
              {selectedRegion ? (
                <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 h-full flex flex-col p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      selectedRegion.health === 'High' ? 'bg-emerald-100 text-emerald-700' :
                      selectedRegion.health === 'Stable' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedRegion.health} Status
                    </span>
                    <button 
                      onClick={() => setSelectedRegion(null)}
                      className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-1.5 rounded-full"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                  
                  <h4 className="text-xl font-black text-slate-900 leading-tight mb-2 tracking-tight">{selectedRegion.name}</h4>
                  <p className="text-xs text-slate-500 mb-8 leading-relaxed italic border-l-4 border-slate-100 pl-4">{selectedRegion.description}</p>
                  
                  {/* Historical Line Chart */}
                  <div className="mb-8 h-40 w-full bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest text-center">Historical Carbon Density (tCO2e/ha)</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedRegion.history}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" hide />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Tooltip 
                          contentStyle={{ fontSize: '10px', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '10px' }}
                          labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="stock" 
                          stroke={selectedRegion.health === 'At Risk' ? '#ef4444' : '#2563eb'} 
                          strokeWidth={4} 
                          dot={{ r: 5, fill: isFinite(1) ? '#2563eb' : '', strokeWidth: 2, stroke: '#fff' }} 
                          activeDot={{ r: 7, strokeWidth: 0 }}
                          animationDuration={1500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="p-4 bg-slate-900 rounded-2xl shadow-sm border border-slate-800">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Density</p>
                      <p className="text-base font-black text-white">{selectedRegion.carbonStock} t/ha</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100">
                      <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Capture</p>
                      <p className="text-base font-black text-emerald-700">{selectedRegion.totalSequestration} Mt/yr</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700">
                    <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Regional Intelligence</p>
                    <p className="text-xs text-slate-400 leading-relaxed px-4">Click a high-yield cluster on the geofenced map to inspect localized sequestration performance and historical vegetation trends.</p>
                  </div>
                  <div className="pt-4 flex space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestMap;
