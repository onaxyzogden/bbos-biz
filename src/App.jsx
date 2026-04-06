import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth-store';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Work from './pages/Work';
import Project from './pages/Project';
import Money from './pages/Money';
import People from './pages/People';
import Office from './pages/Office';
import Tech from './pages/Tech';
import FamilyPage from './pages/FamilyPage';
import Neighbors from './pages/Neighbors';
import Community from './pages/Community';
import FivePillars from './pages/FivePillars';
import QuranPage from './pages/QuranPage';
import HadithPage from './pages/HadithPage';
import IslamicKnowledgePage from './pages/IslamicKnowledgePage';
import PillarDashboard from './pages/PillarDashboard';
import FaithDashboard from './pages/FaithDashboard';
import LifeDashboard from './pages/LifeDashboard';
import IntellectDashboard from './pages/IntellectDashboard';
import Settings from './pages/Settings';
import ModulePlaceholder from './pages/ModulePlaceholder';

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/get-started" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/get-started" element={<Onboarding />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:projectId" element={<Project />} />
        <Route path="money" element={<Money />} />
        <Route path="people" element={<People />} />
        <Route path="office" element={<Office />} />
        <Route path="tech" element={<Tech />} />
        <Route path="family" element={<FamilyPage />} />
        <Route path="neighbors" element={<Neighbors />} />
        <Route path="community" element={<Community />} />
        <Route path="five-pillars" element={<FivePillars />} />
        <Route path="quran" element={<QuranPage />} />
        <Route path="hadith" element={<HadithPage />} />
        <Route path="islamic-knowledge" element={<IslamicKnowledgePage />} />
        <Route path="pillar/faith" element={<FaithDashboard />} />
        <Route path="pillar/life" element={<LifeDashboard />} />
        <Route path="pillar/intellect" element={<IntellectDashboard />} />
        <Route path="pillar/:pillarId" element={<PillarDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path=":moduleId" element={<ModulePlaceholder />} />
      </Route>
    </Routes>
  );
}
