
import React from 'react';
import { AppUser } from '../types';

interface AdminPanelProps {
  currentUser: AppUser;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  if (currentUser.role !== 'Admin') {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Access Denied</h3>
          <p className="text-slate-500 text-sm">Your account role ({currentUser.role}) does not have administrative oversight privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'API Uptime', value: '99.98%' },
          { label: 'Cloud Sync', value: 'Live' },
          { label: 'Nodes', value: '12/12' },
          { label: 'Latency', value: '45ms' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Global Bond Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Carbon Price ($)</label>
            <input type="number" defaultValue={24.00} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escrow Sweeping (%)</label>
            <input type="number" defaultValue={45} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none" />
          </div>
          <div className="pt-6">
            <button className="w-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-xl shadow-xl hover:bg-slate-800 transition-all">
              Commit Global Parameters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
