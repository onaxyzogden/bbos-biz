import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ContactsPage from '../components/people/ContactsPage';
import './People.css';

export default function People() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['people']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="people" />;
  }

  return (
    <div className="people">
      <ContactsPage />
    </div>
  );
}
