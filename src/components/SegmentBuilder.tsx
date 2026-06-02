import { useState, useRef } from 'react';
import type { DraftSegment, ActiveFilter, FilterDef, UploadedFile } from '../types/segment';
import { CONDITIONS_BY_TYPE } from '../data/filterDefs';
import FilterRow from './FilterRow';
import FilterSelector from './FilterSelector';
import './SegmentBuilder.css';

interface Props {
  draft: DraftSegment;
  onBack: () => void;
  onSave: (draft: DraftSegment) => void;
}

let nextId = 1;

export default function SegmentBuilder({ draft: initial, onBack, onSave }: Props) {
  const [draft, setDraft] = useState<DraftSegment>(initial);
  const [showFilterSelector, setShowFilterSelector] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPlayers = draft.type === 'uploaded'
    ? draft.files.reduce((s, f) => s + f.playerCount, 0)
    : draft.filters.reduce((s, f) => s + f.playerCount, 0) > 0
      ? Math.min(...draft.filters.map(f => f.playerCount))
      : 0;

  const canSave = draft.type === 'uploaded'
    ? draft.files.length > 0
    : draft.filters.length > 0;

  function addFilter(def: FilterDef) {
    setShowFilterSelector(false);
    const conditions = CONDITIONS_BY_TYPE[def.dataType];
    const newFilter: ActiveFilter = {
      id: String(nextId++),
      defId: def.id,
      name: def.name,
      color: def.color,
      dataType: def.dataType,
      condition: conditions[0],
      value: def.dataType === 'date' ? '7' : '1.00',
      unit: 'EUR',
      valueType: 'exact',
      playerCount: Math.floor(Math.random() * 50000) + 100,
    };
    setDraft(d => ({ ...d, filters: [...d.filters, newFilter] }));
  }

  function updateFilter(id: string, updated: ActiveFilter) {
    setDraft(d => ({ ...d, filters: d.filters.map(f => f.id === id ? updated : f) }));
  }

  function deleteFilter(id: string) {
    setDraft(d => ({ ...d, filters: d.filters.filter(f => f.id !== id) }));
  }

  function duplicateFilter(id: string) {
    const f = draft.filters.find(f => f.id === id);
    if (!f) return;
    setDraft(d => ({
      ...d,
      filters: d.filters.flatMap(fi => fi.id === id ? [fi, { ...fi, id: String(nextId++) }] : [fi])
    }));
  }

  function handleFileUpload(files: FileList | null) {
    if (!files) return;
    const added: UploadedFile[] = Array.from(files).map(file => ({
      id: String(nextId++),
      name: file.name,
      playerCount: Math.floor(Math.random() * 50000) + 500,
    }));
    setDraft(d => ({ ...d, files: [...d.files, ...added] }));
  }

  function deleteFile(id: string) {
    setDraft(d => ({ ...d, files: d.files.filter(f => f.id !== id) }));
  }

  const TypeBadge = () => {
    const cls = `sb-type-badge sb-type-badge--${draft.type.toLowerCase()}`;
    return <span className={cls}>{draft.type}</span>;
  };

  return (
    <div className="segment-builder">
      {/* Page header */}
      <div className="sb-header">
        <div className="sb-header-left">
          <div className="sb-title-row">
            {editingName ? (
              <input
                className="sb-name-input"
                autoFocus
                value={draft.name}
                onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                onBlur={() => setEditingName(false)}
                onKeyDown={e => e.key === 'Enter' && setEditingName(false)}
              />
            ) : (
              <h1 className="sb-name" onClick={() => setEditingName(true)} title="Click to edit">
                {draft.name}
              </h1>
            )}
            <TypeBadge />
          </div>
          <div className="sb-breadcrumb">
            <button className="sb-breadcrumb-link" onClick={onBack}>Segments</button>
            <span className="sb-breadcrumb-sep">/</span>
            <span>Segment created {new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })} {new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' })}</span>
          </div>
        </div>

        <div className="sb-header-right">
          <div className="sb-header-meta">
            <span className="sb-meta-item">
              <WorkflowIcon /> 0 workflow
            </span>
            <span className={`sb-meta-item${totalPlayers > 0 ? ' highlight' : ''}`}>
              <PeopleIcon /> {totalPlayers.toLocaleString()} players
            </span>
          </div>
          <button
            className={`btn-save${canSave ? ' enabled' : ''}`}
            disabled={!canSave}
            onClick={() => onSave(draft)}
          >
            Save
          </button>
        </div>
      </div>

      {draft.description && (
        <p className="sb-description">{draft.description}</p>
      )}

      {/* Toolbar (only for Dynamic/Static) */}
      {draft.type !== 'uploaded' && (
        <div className="sb-toolbar">
          {/* AND / OR toggle */}
          <div className="sb-logic-toggle">
            {(['AND', 'OR'] as const).map(l => (
              <button
                key={l}
                className={`sb-logic-btn${draft.logic === l ? ' active' : ''}`}
                onClick={() => setDraft(d => ({ ...d, logic: l }))}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="sb-toolbar-actions">
            <button className="sb-icon-btn" title="AI describe">
              <AiIcon />
            </button>
            <button
              className="sb-icon-btn"
              title="Add filter"
              onClick={() => setShowFilterSelector(true)}
            >
              <PlusIcon />
            </button>
            <button
              className="sb-icon-btn danger"
              title="Delete all filters"
              disabled={draft.filters.length === 0}
              onClick={() => draft.filters.length > 0 && setShowDeleteAll(true)}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="sb-body">
        {draft.type === 'uploaded' ? (
          /* ---- Upload mode ---- */
          <div className="sb-upload-section">
            {draft.files.length > 0 && (
              <div className="sb-file-list">
                {draft.files.map(file => (
                  <div key={file.id} className="sb-file-row">
                    <div className="sb-file-stripe" />
                    <span className="sb-file-name">{file.name}</span>
                    <div className="sb-file-right">
                      <span className="filter-player-count">
                        <PeopleIcon /> {file.playerCount.toLocaleString()} players
                      </span>
                      <button className="filter-icon-btn danger" onClick={() => deleteFile(file.id)}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {draft.files.length === 0 && (
              <div className="sb-upload-info">
                <div className="sb-info-card">
                  <h3>Drop up to 10 files 50 MB in total</h3>
                  <div className="sb-info-rule">
                    <strong>Only existing players</strong>
                    <p>The data should align with the existing player database.</p>
                  </div>
                  <div className="sb-info-rule">
                    <strong>Match by an ID, username, phone, or email</strong>
                    <p>One of the row must include at least one of these column names, with corresponding data.</p>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`sb-drop-zone${dragOver ? ' drag-over' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon />
              <span>
                Drag and drop files here or{' '}
                <span className="sb-upload-link">click to upload</span>
              </span>
              <span className="sb-upload-hint">All .csv, .xlsx, and .xls file types are supported</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                multiple
                style={{ display: 'none' }}
                onChange={e => handleFileUpload(e.target.files)}
              />
            </div>
          </div>
        ) : draft.filters.length === 0 ? (
          /* ---- Empty state ---- */
          <div className="sb-empty">
            <div className="sb-empty-card">
              <h3 className="sb-empty-title">Choose segment logic</h3>
              <div
                className={`sb-logic-option${draft.logic === 'AND' ? ' selected' : ''}`}
                onClick={() => setDraft(d => ({ ...d, logic: 'AND' }))}
              >
                <strong>AND</strong>
                <p>Use when all conditions must match</p>
              </div>
              <div
                className={`sb-logic-option${draft.logic === 'OR' ? ' selected' : ''}`}
                onClick={() => setDraft(d => ({ ...d, logic: 'OR' }))}
              >
                <strong>OR</strong>
                <p>Use when at least one condition must match</p>
              </div>
            </div>

            <div className="sb-empty-card">
              <h3 className="sb-empty-title">Build your segment</h3>
              <button className="sb-build-option" onClick={() => setShowFilterSelector(true)}>
                <span className="sb-build-option-text">
                  <strong>Add filter</strong>
                  <span>Add a new filter to define your segment</span>
                </span>
                <PlusIcon />
              </button>
              <button className="sb-build-option">
                <span className="sb-build-option-text">
                  <strong>Add group</strong>
                  <span>Combine multiple filters</span>
                </span>
                <GroupIcon />
              </button>
              <button className="sb-build-option">
                <span className="sb-build-option-text">
                  <strong>Describe segment</strong>
                  <span>Convert your text into filters</span>
                </span>
                <AiIcon />
              </button>
            </div>
          </div>
        ) : (
          /* ---- Filter rows ---- */
          <div className="sb-filter-list">
            {draft.filters.map(f => (
              <FilterRow
                key={f.id}
                filter={f}
                onChange={updated => updateFilter(f.id, updated)}
                onDelete={() => deleteFilter(f.id)}
                onDuplicate={() => duplicateFilter(f.id)}
              />
            ))}

            <button className="sb-add-filter-btn" onClick={() => setShowFilterSelector(true)}>
              <PlusIcon /> Add filter
            </button>
          </div>
        )}
      </div>

      {/* Filter selector popover */}
      {showFilterSelector && (
        <FilterSelector
          onSelect={addFilter}
          onClose={() => setShowFilterSelector(false)}
        />
      )}

      {/* Delete all confirmation */}
      {showDeleteAll && (
        <div className="modal-backdrop" onClick={() => setShowDeleteAll(false)}>
          <div className="modal-card confirm-card" onClick={e => e.stopPropagation()}>
            <div className="modal-body" style={{ padding: 24 }}>
              <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete all filters</h2>
              <p style={{ fontSize: 14, color: 'var(--neutral-500)', lineHeight: '20px' }}>
                This will remove all filters from this segment.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={() => setShowDeleteAll(false)}>Cancel</button>
              <button
                className="btn-danger"
                onClick={() => { setDraft(d => ({ ...d, filters: [] })); setShowDeleteAll(false); }}
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Icons ---- */
function WorkflowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 7h2.5M7.5 7V3h1.5M7.5 7v4h1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1 11c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="10" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M12 11c0-1.66-1.34-3-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function AiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 5h12M5 5V3.5A.5.5 0 0 1 5.5 3h5a.5.5 0 0 1 .5.5V5M6.5 8v4M9.5 8v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M3.5 5l.75 7.5A.5.5 0 0 0 4.75 13h6.5a.5.5 0 0 0 .5-.5L12.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="8.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="1.5" y="8.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="8.5" y="8.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 18V8M9 12l5-4 5 4" stroke="var(--neutral-500)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 20v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2" stroke="var(--neutral-500)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
