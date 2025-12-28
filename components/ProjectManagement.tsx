
import React, { useState } from 'react';
import { TeamMember, Project, ProjectTask, AppUser } from '../types';

interface ProjectManagementProps {
  currentUser: AppUser;
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: 'm1', name: 'Sarah Namono', role: 'Lead Silviculturist', avatar: 'SN', department: 'Forestry' },
  { id: 'm2', name: 'David Mukasa', role: 'Financial Engineer', avatar: 'DM', department: 'Finance' },
  { id: 'm3', name: 'Grace Akello', role: 'Community Liaison', avatar: 'GA', department: 'Community' },
  { id: 'm4', name: 'Robert Okello', role: 'dMRV Specialist', avatar: 'RO', department: 'Tech' },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Masaka Nursery Hub Expansion',
    leadId: 'm1',
    progress: 65,
    tasks: [
      { id: 't1', title: 'Seedling Procurement', status: 'Done', priority: 'High', assigneeId: 'm1', dueDate: '2025-04-15' },
      { id: 't2', title: 'Irrigation System Install', status: 'In Progress', priority: 'High', assigneeId: 'm4', dueDate: '2025-05-01' },
      { id: 't3', title: 'Staff Training', status: 'Todo', priority: 'Medium', assigneeId: 'm3', dueDate: '2025-05-10' },
    ]
  },
];

const ProjectManagement: React.FC<ProjectManagementProps> = ({ currentUser }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'Todo' as ProjectTask['status'],
    priority: 'Medium' as ProjectTask['priority'],
    assigneeId: 'm1',
    dueDate: ''
  });

  const canEdit = currentUser.role === 'Admin' || currentUser.role === 'Project Manager';

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !canEdit) return;

    const task: ProjectTask = { ...newTask, id: `t${Date.now()}` };
    const updatedProjects = projects.map(p => {
      if (p.id === selectedProjectId) return { ...p, tasks: [...p.tasks, task] };
      return p;
    });

    setProjects(updatedProjects);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      {/* Modal - only for permitted roles */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <h4 className="text-xl font-black text-slate-900 mb-6">Create New Impact Task</h4>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input 
                type="text" 
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none" 
                placeholder="Task description..."
              />
              <button type="submit" className="w-full bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-xl shadow-lg">Deploy Task</button>
            </form>
            <button onClick={() => setIsModalOpen(false)} className="w-full mt-2 text-xs font-bold text-slate-400 py-2">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Projects</h4>
            {projects.map(p => (
              <button 
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`w-full text-left p-4 rounded-2xl mb-2 transition-all ${selectedProjectId === p.id ? 'bg-emerald-50 border border-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <p className="text-sm font-black">{p.name}</p>
                <div className="mt-2 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${p.progress}%` }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900">{activeProject.name}</h3>
              {canEdit && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/10"
                >
                  New Task
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Todo', 'In Progress', 'Done'].map(status => (
                <div key={status} className="space-y-4">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{status}</h5>
                  <div className="space-y-3">
                    {activeProject.tasks.filter(t => t.status === status).map(task => (
                      <div key={task.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                        <p className="text-xs font-black text-slate-800 leading-snug">{task.title}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[8px] font-black uppercase text-slate-400">{task.priority} Priority</span>
                          <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[8px] font-bold ring-2 ring-white">
                            {TEAM_MEMBERS.find(m => m.id === task.assigneeId)?.avatar}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default ProjectManagement;
