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
import QuranPage from './pages/QuranPage';
import HadithPage from './pages/HadithPage';
import IslamicKnowledgePage from './pages/IslamicKnowledgePage';
import FaithCorePage from './pages/FaithCorePage';
import FaithGrowthPage from './pages/FaithGrowthPage';
import FaithExcellencePage from './pages/FaithExcellencePage';
import FaithShahadaPage from './pages/FaithShahadaPage';
import FaithSalahPage from './pages/FaithSalahPage';
import FaithZakahPage from './pages/FaithZakahPage';
import FaithSawmPage from './pages/FaithSawmPage';
import FaithHajjPage from './pages/FaithHajjPage';
import LifePhysicalPage from './pages/LifePhysicalPage';
import LifeMentalPage from './pages/LifeMentalPage';
import LifeSafetyPage from './pages/LifeSafetyPage';
import LifeSocialPage from './pages/LifeSocialPage';
import IntellectLearningPage from './pages/IntellectLearningPage';
import IntellectThinkingPage from './pages/IntellectThinkingPage';
import IntellectCognitivePage from './pages/IntellectCognitivePage';
import IntellectProfessionalPage from './pages/IntellectProfessionalPage';
import FamilyMarriagePage from './pages/FamilyMarriagePage';
import FamilyParentingPage from './pages/FamilyParentingPage';
import FamilyKinshipPage from './pages/FamilyKinshipPage';
import FamilyHomePage from './pages/FamilyHomePage';
import WealthEarningPage from './pages/WealthEarningPage';
import WealthFinancialPage from './pages/WealthFinancialPage';
import WealthOwnershipPage from './pages/WealthOwnershipPage';
import WealthCirculationPage from './pages/WealthCirculationPage';
import EnvironmentResourcePage from './pages/EnvironmentResourcePage';
import EnvironmentWastePage from './pages/EnvironmentWastePage';
import EnvironmentEcosystemPage from './pages/EnvironmentEcosystemPage';
import EnvironmentSourcingPage from './pages/EnvironmentSourcingPage';
import CollectivePage from './pages/CollectivePage';
import PillarDashboard from './pages/PillarDashboard';
import FaithDashboard from './pages/FaithDashboard';
import LifeDashboard from './pages/LifeDashboard';
import IntellectDashboard from './pages/IntellectDashboard';
import FamilyDashboard from './pages/FamilyDashboard';
import WealthDashboard from './pages/WealthDashboard';
import EnvironmentDashboard from './pages/EnvironmentDashboard';
import UmmahDashboard from './pages/UmmahDashboard';
import Settings from './pages/Settings';
import ModulePlaceholder from './pages/ModulePlaceholder';
import ProjectBoard from './components/work/ProjectBoard';
import AssetsTab from './components/money/AssetsTab';
import { useParams } from 'react-router-dom';
import { useProjectStore } from './store/project-store';
import { useTaskStore } from './store/task-store';
import { useEffect } from 'react';

function ProjectTasks() {
  const { projectId } = useParams();
  const project = useProjectStore((s) => s.getProject(projectId));
  const loadTasks = useTaskStore((s) => s.loadTasks);
  useEffect(() => { if (projectId) loadTasks(projectId); }, [projectId]);
  if (!project) return null;
  return <ProjectBoard projectId={projectId} project={project} />;
}

function ProjectAssets() {
  return <AssetsTab />;
}

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
        <Route path="work/:projectId" element={<Project />}>
          <Route path="people" element={<People embedded />} />
          <Route path="tasks" element={<ProjectTasks />} />
          <Route path="money" element={<Money embedded />} />
          <Route path="assets" element={<ProjectAssets />} />
          <Route path="office" element={<Office embedded />} />
          <Route path="tech" element={<Tech embedded />} />
        </Route>
        <Route path="money" element={<Money />} />
        <Route path="people" element={<People />} />
        <Route path="office" element={<Office />} />
        <Route path="tech" element={<Tech />} />
        <Route path="family" element={<FamilyPage />} />
        <Route path="neighbors" element={<Neighbors />} />
        <Route path="community" element={<Community />} />
        <Route path="quran" element={<QuranPage />} />
        <Route path="hadith" element={<HadithPage />} />
        <Route path="islamic-knowledge" element={<IslamicKnowledgePage />} />
        <Route path="faith-core" element={<FaithCorePage />} />
        <Route path="faith-growth" element={<FaithGrowthPage />} />
        <Route path="faith-excellence" element={<FaithExcellencePage />} />
        <Route path="faith-shahada" element={<FaithShahadaPage />} />
        <Route path="faith-salah" element={<FaithSalahPage />} />
        <Route path="faith-zakah" element={<FaithZakahPage />} />
        <Route path="faith-sawm" element={<FaithSawmPage />} />
        <Route path="faith-hajj" element={<FaithHajjPage />} />
        <Route path="life-physical" element={<LifePhysicalPage />} />
        <Route path="life-mental" element={<LifeMentalPage />} />
        <Route path="life-safety" element={<LifeSafetyPage />} />
        <Route path="life-social" element={<LifeSocialPage />} />
        <Route path="intellect-learning" element={<IntellectLearningPage />} />
        <Route path="intellect-thinking" element={<IntellectThinkingPage />} />
        <Route path="intellect-cognitive" element={<IntellectCognitivePage />} />
        <Route path="intellect-professional" element={<IntellectProfessionalPage />} />
        <Route path="family-marriage" element={<FamilyMarriagePage />} />
        <Route path="family-parenting" element={<FamilyParentingPage />} />
        <Route path="family-kinship" element={<FamilyKinshipPage />} />
        <Route path="family-home" element={<FamilyHomePage />} />
        <Route path="wealth-earning" element={<WealthEarningPage />} />
        <Route path="wealth-financial" element={<WealthFinancialPage />} />
        <Route path="wealth-ownership" element={<WealthOwnershipPage />} />
        <Route path="wealth-circulation" element={<WealthCirculationPage />} />
        <Route path="env-resource" element={<EnvironmentResourcePage />} />
        <Route path="env-waste" element={<EnvironmentWastePage />} />
        <Route path="env-ecosystem" element={<EnvironmentEcosystemPage />} />
        <Route path="env-sourcing" element={<EnvironmentSourcingPage />} />
        <Route path="collective" element={<CollectivePage />} />
        <Route path="pillar/faith" element={<FaithDashboard />} />
        <Route path="pillar/life" element={<LifeDashboard />} />
        <Route path="pillar/intellect" element={<IntellectDashboard />} />
        <Route path="pillar/family" element={<FamilyDashboard />} />
        <Route path="pillar/wealth" element={<WealthDashboard />} />
        <Route path="pillar/environment" element={<EnvironmentDashboard />} />
        <Route path="pillar/ummah" element={<UmmahDashboard />} />
        <Route path="pillar/:pillarId" element={<PillarDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path=":moduleId" element={<ModulePlaceholder />} />
      </Route>
    </Routes>
  );
}
