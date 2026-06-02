import { useState } from 'react';
import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';
import SegmentList from './components/SegmentList';
import SegmentBuilder from './components/SegmentBuilder';
import CreateSegmentModal from './components/CreateSegmentModal';
import type { DraftSegment } from './types/segment';
import { SEGMENTS } from './data/segments';
import type { Segment } from './data/segments';
import './App.css';

type View = 'list' | 'builder';

export default function App() {
  const [view, setView] = useState<View>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [draft, setDraft] = useState<DraftSegment | null>(null);
  const [segments, setSegments] = useState<Segment[]>(SEGMENTS);

  function handleCreate(d: DraftSegment) {
    setDraft(d);
    setShowCreateModal(false);
    setView('builder');
  }

  function handleSave(d: DraftSegment) {
    const now = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
              + ' ' + new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
    const newSeg: Segment = {
      id: Date.now(),
      type: d.type,
      name: d.name,
      players: d.type === 'uploaded'
        ? d.files.reduce((s, f) => s + f.playerCount, 0)
        : d.filters.reduce((s, f) => s + f.playerCount, 0),
      state: 'not-used',
      usage: null,
      creator: 'super_admin',
      created: now,
      modified: now,
    };
    setSegments(prev => [newSeg, ...prev]);
    setView('list');
    setDraft(null);
  }

  return (
    <div className="app">
      <NavBar />
      <div className="app-body">
        <SideMenu />
        <main className="app-main">
          {view === 'list' ? (
            <SegmentList
              segments={segments}
              onCreateClick={() => setShowCreateModal(true)}
            />
          ) : draft ? (
            <SegmentBuilder
              draft={draft}
              onBack={() => setView('list')}
              onSave={handleSave}
            />
          ) : null}
        </main>
      </div>

      {showCreateModal && (
        <CreateSegmentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
