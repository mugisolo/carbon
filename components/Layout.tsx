
import React from 'react';
import { AppSection, UserRole, AppUser } from '../types';

interface LayoutProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  currentUser: AppUser;
  setCurrentUser: (user: AppUser) => void;
  children: React.ReactNode;
}

const SIMULATED_USERS: AppUser[] = [
  { id: 'u1', name: 'Robert Admin', role: 'Admin', avatar: 'RA' },
  { id: 'u2', name: 'Sarah Manager', role: 'Project Manager', avatar: 'SM' },
  { id: 'u3', name: 'David Member', role: 'Team Member', avatar: 'DM' },
];

const Layout: React.FC<LayoutProps> = ({ activeSection, setActiveSection, currentUser, setCurrentUser, children }) => {
  const sections = Object.values(AppSection);

  // Filter sections based on permissions
  const visibleSections = sections.filter(section => {
    if (currentUser.role === 'Team Member') {
      return section !== AppSection.ADMIN_PANEL;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-emerald-400">Green Ventures</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest">Uganda Carbon-Ed Bond</p>
        </div>
        
        <div className="flex-grow space-y-2">
          {visibleSections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                activeSection === section 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
          <div className="p-3 bg-slate-800 rounded-xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Simulate Role</p>
            <div className="flex space-x-1">
              {SIMULATED_USERS.map(u => (
                <button 
                  key={u.id}
                  onClick={() => setCurrentUser(u)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${currentUser.id === u.id ? 'bg-emerald-500 ring-2 ring-white' : 'bg-slate-700 opacity-50'}`}
                >
                  {u.avatar}
                </button>
              ))}
            </div>
            <p className="text-[10px] font-bold text-emerald-400 mt-2">{currentUser.name} ({currentUser.role})</p>
          </div>
          <div className="flex items-center space-x-3 text-sm text-slate-400">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Platform Live</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50 overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center px-8 sticky top-0 z-20">
          <h2 className="text-xl font-semibold text-slate-800">{activeSection}</h2>
          <div className="ml-auto flex items-center space-x-4">
             <span className="text-[10px] font-black px-3 py-1 bg-blue-100 text-blue-700 rounded-full uppercase tracking-widest">20 MtCO2e Target</span>
             <span className="text-[10px] font-black px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-widest">USD 100M Bond</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
