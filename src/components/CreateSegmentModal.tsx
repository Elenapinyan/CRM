import { useState, useEffect } from 'react';
import type { SegmentType, DraftSegment } from '../types/segment';
import './CreateSegmentModal.css';

const TYPES: SegmentType[] = ['dynamic', 'static', 'uploaded'];

const TYPE_LABELS: Record<SegmentType, string> = {
  dynamic: 'Dynamic', static: 'Static', uploaded: 'Uploaded',
};

const TYPE_INFO: Record<SegmentType, string> = {
  dynamic:  'A living segment that automatically updates. Players are added or removed as their data changes to match your filters.',
  static:   'A frozen snapshot of players. This list captures exactly who matched your filters at the time of creation and will not change automatically.',
  uploaded: 'A fixed segment imported from a CSV, XLSX, or XLS files. Players are securely matched to your database using their ID, email, or username.',
};

interface Props {
  onClose: () => void;
  onCreate: (draft: DraftSegment) => void;
}

export default function CreateSegmentModal({ onClose, onCreate }: Props) {
  const [type, setType] = useState<SegmentType>('dynamic');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  });

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 220);
  }

  function handleCreate() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: desc.trim(), type, logic: 'AND', filters: [], files: [] });
  }

  return (
    <div className={`csp-backdrop${visible ? ' csp-backdrop--visible' : ''}`} onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className={`csp${visible ? ' csp--visible' : ''}`} role="dialog" aria-modal aria-labelledby="csp-title">

        <header className="csp__header">
          <div className="csp__header-row">
            <h4 className="csp__title" id="csp-title">Create new segment</h4>
            <div className="csp__header-actions">
              <span className="csp__esc-badge" aria-hidden="true">Esc</span>
              <button className="csp__close" aria-label="Close" onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </header>

        <main className="csp__body">
          <div className="csp__form">
            {/* Type toggle */}
            <div className="csp__type-block">
              <div className="csp__field-label">Type</div>
              <div className="csp__field-gap" aria-hidden="true" />
              <div className="csp__type-toggle" role="group">
                {TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`csp__type-btn${type === t ? ' csp__type-btn--active' : ''}`}
                    aria-pressed={type === t}
                    onClick={() => setType(t)}
                  >
                    {TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="csp__info" role="note">
              <div className="csp__info-indicator-wrap" aria-hidden="true">
                <span className="csp__info-indicator" />
              </div>
              <div className="csp__info-text">{TYPE_INFO[type]}</div>
            </div>

            {/* Name */}
            <div className="csp__field">
              <label className="csp__field-label" htmlFor="csp-name">Name</label>
              <div className="csp__field-gap" aria-hidden="true" />
              <input
                id="csp-name"
                type="text"
                className="csp__input"
                placeholder="Enter name for a new segment"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="csp__field csp__field--textarea">
              <label className="csp__field-label" htmlFor="csp-desc">Description</label>
              <div className="csp__field-gap" aria-hidden="true" />
              <textarea
                id="csp-desc"
                className="csp__textarea"
                placeholder="Enter a description for a new segment"
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
          </div>
        </main>

        <footer className="csp__footer">
          <div className="csp__footer-actions">
            <button type="button" className="csp__btn csp__btn--secondary" onClick={handleClose}>Cancel</button>
            <button
              type="button"
              className="csp__btn csp__btn--main"
              disabled={!name.trim()}
              onClick={handleCreate}
            >
              Create segment
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
