
import React, { useState } from 'react';
import { AppSection, AppUser } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CarbonCalculator from './components/CarbonCalculator';
import Financials from './components/Financials';
import Impact from './components/Impact';
import Roadmap from './components/Roadmap';
import Advisor from './components/Advisor';
import DMRV from './components/DMRV';
import ForestMap from './components/ForestMap';
import ProjectManagement from './components/ProjectManagement';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [currentUser, setCurrentUser] = useState<AppUser>({ 
    id: 'u1', 
    name: 'Robert Admin', 
    role: 'Admin', 
    avatar: 'RA' 
  });

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard />;
      case AppSection.MAP:
        return <ForestMap />;
      case AppSection.CALCULATOR:
        return <CarbonCalculator />;
      case AppSection.FINANCIALS:
        return <Financials />;
      case AppSection.IMPACT:
        return <Impact />;
      case AppSection.DMRV:
        return <DMRV />;
      case AppSection.ROADMAP:
        return <Roadmap />;
      case AppSection.PROJECTS:
        return <ProjectManagement currentUser={currentUser} />;
      case AppSection.USER_PANEL:
        return <UserPanel currentUser={currentUser} />;
      case AppSection.ADMIN_PANEL:
        return <AdminPanel currentUser={currentUser} />;
      case AppSection.ADVISOR:
        return <Advisor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
