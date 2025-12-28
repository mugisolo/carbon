
import React, { useState, useRef, useEffect } from 'react';

interface Task {
  id: number;
  task: string;
  startDay: number;
  duration: number;
  category: 'Governance' | 'Finance' | 'Operations' | 'Monitoring';
  status: 'Done' | 'In Progress' | 'Planned';
  detail: string;
  deepDive: string; 
  dependsOn?: number[]; 
}

const Roadmap: React.FC = () => {
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(1);
  const deepDiveRef = useRef<HTMLDivElement>(null);

  const tasks: Task[] = [
    { id: 1, task: 'SPV Incorporation', startDay: 1, duration: 15, category: 'Governance', status: 'Done', detail: 'Establish SPV.', deepDive: 'Full legal structure details here...' },
    { id: 2, task: 'DNA LoI Filing', startDay: 16, duration: 10, category: 'Governance', status: 'In Progress', detail: 'File LoI.', deepDive: 'Process with the Ministry of Water...', dependsOn: [1] },
    { id: 3, task: 'MIGA Application', startDay: 20, duration: 45, category: 'Finance', status: 'In Progress', detail: 'Secure insurance.', deepDive: 'Political risk mitigation data...', dependsOn: [1] },
    { id: 4, task: 'Escrow Setup', startDay: 30, duration: 20, category: 'Finance', status: 'Planned', detail: 'Trust accounts.', deepDive: 'Stanbic Bank verification flow...', dependsOn: [2, 3] },
    { id: 6, task: 'Baseline dMRV', startDay: 40, duration: 30, category: 'Monitoring', status: 'Planned', detail: 'Satellite baseline.', deepDive: 'Sentinel-2 imagery processing...', dependsOn: [2] },
  ];

  useEffect(() => {
    if (deepDiveRef.current) {
      deepDiveRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedTaskId]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Governance': return 'bg-purple-500';
      case 'Finance': return 'bg-emerald-500';
      case 'Operations': return 'bg-blue-500';
      case 'Monitoring': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  const activeTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="flex justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Implementation Roadmap</h3>
        </div>

        <div className="relative overflow-x-auto pb-4">
          <div className="min-w-[850px] relative px-4">
            {/* Dependencies Layer */}
            <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: '100%', height: '100%' }}>
              {tasks.map((task, rowIndex) => (
                task.dependsOn?.map(depId => {
                  const depTask = tasks.find(t => t.id === depId);
                  const depRowIndex = tasks.findIndex(t => t.id === depId);
                  if (!depTask) return null;
                  
                  const startX = 200 + ((depTask.startDay + depTask.duration) / 100) * 650;
                  const startY = 48 + (depRowIndex * 48) + 20;
                  const endX = 200 + (task.startDay / 100) * 650;
                  const endY = 48 + (rowIndex * 48) + 20;

                  const isHighlighted = hoveredTaskId === task.id || hoveredTaskId === depId;

                  return (
                    <path 
                      key={`${task.id}-${depId}`}
                      d={`M ${startX} ${startY} L ${startX + 10} ${startY} L ${startX + 10} ${endY} L ${endX} ${endY}`} 
                      fill="none" 
                      stroke={isHighlighted ? "#10b981" : "#e2e8f0"} 
                      strokeWidth={isHighlighted ? "3" : "1"} 
                      className="transition-all duration-300"
                    />
                  );
                })
              ))}
            </svg>

            {/* Task Rows */}
            <div className="space-y-4 relative z-10">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center cursor-pointer group"
                  onMouseEnter={() => setHoveredTaskId(task.id)}
                  onMouseLeave={() => setHoveredTaskId(null)}
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <div className="w-[200px] text-xs font-bold text-slate-700">{task.task}</div>
                  <div className="flex-grow bg-slate-50 h-10 rounded-xl relative border border-slate-100">
                    <div 
                      className={`absolute h-full rounded-xl transition-all ${getCategoryColor(task.category)} ${selectedTaskId === task.id ? 'ring-4 ring-emerald-500/20' : ''}`}
                      style={{ left: `${task.startDay}%`, width: `${task.duration}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deep Dive Panel */}
        <div className="mt-8 bg-slate-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-1/3 p-8 border-r border-slate-800">
            <h4 className="text-emerald-400 font-black uppercase tracking-widest text-[10px] mb-2">{activeTask.category}</h4>
            <h5 className="text-xl font-black text-white mb-4">{activeTask.task}</h5>
            <p className="text-slate-400 text-sm leading-relaxed">{activeTask.detail}</p>
          </div>
          <div ref={deepDiveRef} className="md:w-2/3 p-8 h-64 overflow-y-auto custom-scrollbar bg-slate-800/30">
            <div className="prose prose-invert prose-sm">
              <h6 className="text-white font-bold mb-4">Technical Breakdown</h6>
              <p className="text-slate-300 leading-relaxed">{activeTask.deepDive}</p>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <p className="text-[10px] font-black text-slate-500 uppercase">Verification Log</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-xs text-emerald-400"><span className="w-1 h-1 bg-emerald-400 rounded-full mr-2"></span> System Ready</div>
                  <div className="flex items-center text-xs text-slate-500"><span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span> Audit Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
