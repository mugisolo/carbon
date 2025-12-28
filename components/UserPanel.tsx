
import React from 'react';
import { AppUser } from '../types';

interface UserPanelProps {
  currentUser: AppUser;
}

const UserPanel: React.FC<UserPanelProps> = ({ currentUser }) => {
  const myTasks = [
    { id: 't1', title: 'Validate Sentinel-2 Imagery', priority: 'High', due: 'Tomorrow', status: 'In Progress' },
    { id: 't2', title: 'Update Biometric Encryption Keys', priority: 'Medium', due: 'In 3 days', status: 'Todo' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-emerald-400 border-4 border-emerald-500/20">
              {currentUser.avatar}
            </div>
            <h3 className="text-xl font-black text-slate-900">{currentUser.name}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{currentUser.role} Workspace</p>
            <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Impact Rank</p>
                <p className="text-lg font-black text-emerald-600">Top 5%</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                <p className="text-lg font-black text-blue-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
            <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-widest text-[10px]">My Directives</h3>
            <div className="space-y-4">
              {myTasks.map((task) => (
                <div key={task.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl transition-all border-l-4 border-l-emerald-500">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-black text-slate-800 leading-snug">{task.title}</p>
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">{task.priority}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 text-[10px] font-bold text-slate-400">
                    <span>Due {task.due}</span>
                    <span className="text-emerald-500 uppercase">{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
