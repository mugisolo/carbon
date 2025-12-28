
import React from 'react';

export enum AppSection {
  DASHBOARD = 'Dashboard',
  MAP = 'Forest Carbon Map',
  CALCULATOR = 'Carbon-Ed Calculator',
  FINANCIALS = 'Financial Engineering',
  IMPACT = 'Impact Metrics',
  DMRV = 'Digital MRV',
  ROADMAP = '100-Day Roadmap',
  PROJECTS = 'Project Management',
  USER_PANEL = 'My Workspace',
  ADMIN_PANEL = 'Admin Control',
  ADVISOR = 'AI Investment Advisor'
}

export type UserRole = 'Admin' | 'Project Manager' | 'Team Member';

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: React.ReactNode;
}

export interface ChartDataPoint {
  year: string;
  price: number;
  volume: number;
  revenue: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: 'Forestry' | 'Finance' | 'Community' | 'Tech';
  email?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assigneeId: string;
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  leadId: string;
  progress: number;
  tasks: ProjectTask[];
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { uri: string; title: string };
}
