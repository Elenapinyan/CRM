import { useState } from 'react';
import type { SegmentType, DraftSegment } from '../types/segment';
import './CreateSegmentModal.css';

interface Props {
  onClose: () => void;
  onCreate: (draft: DraftSegment) => void;
}

const TYPE_DESCRIPTIONS: Record<SegmentType, string> = {
  dynamic:  'A living segment that automatically updates. Players are added or removed as their data changes to match your filters.',
  static:   'A frozen snapshot of players. This list captures exactly who matched your filters at the time of creation and will not change automatically.',
  uploaded: 'A fixed segment imported from a CSV, XLSX, or XLS files. Players are securely matched to your database using their ID, email, or username.',
};

const TYPE_LABELS: Record<SegmentType, string> = {
  dynamic: 'Dynamic', static: 'Static', uploaded: 'Uploaded',
};

export default function CreateSegmentModal({ onClose, onCreate }: Props) {
  const [type, setType] = useState<SegmentType>('dynamic');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  function handleCreate() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: desc.trim(), type, logic: 'AND', filters: [], files: [] });
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-card" role="dialog" aria-modal aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">Create new segment</h2>
          <div className="modal-header-actions">
            <span className="modal-esc">Esc</span>
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-field">
            <label className="modal-label">Type</label>
            <div className="type-tabs">
              {(['dynamic', 'static', 'uploaded'] as SegmentType[]).map(t => (
                <button
                  key={t}
                  className={`type-tab${type === t ? ' active' : ''}`}
                  onClick={() => setType(t)}
                >
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          <p className="type-description">{TYPE_DESCRIPTIONS[type]}</p>

          <div className="modal-field">
            <label className="modal-label" htmlFor="seg-name">Name</label>
            <input
              id="seg-name"
              className="modal-input"
              type="text"
              placeholder="Enter name for a new segment"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="seg-desc">Description</label>
            <textarea
              id="seg-desc"
              className="modal-textarea"
              placeholder="Enter a description for a new segment"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className={`btn-primary${!name.trim() ? ' disabled' : ''}`}
            onClick={handleCreate}
            disabled={!name.trim()}
          >
            Create segment
          </button>
        </div>
      </div>
    </div>
  );
}
