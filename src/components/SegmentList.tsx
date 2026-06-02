import { useState, useMemo, useRef, useEffect } from 'react';
import type { Segment, SegmentType } from '../data/segments';
import { computeFooterStats } from '../data/segments';
import './SegmentList.css';

type SortKey = keyof Segment | null;
type SortDir = 'asc' | 'desc';

interface ColDef {
  key: keyof Segment;
  label: string;
  align?: 'right';
  width: number;
  filterable?: boolean;
  locked?: boolean;
}

const ALL_COLUMNS: ColDef[] = [
  { key: 'id',       label: 'ID',            width: 140, locked: true },
  { key: 'type',     label: 'Type',          width: 130, filterable: true },
  { key: 'name',     label: 'Name',          width: 200, locked: true },
  { key: 'players',  label: 'Players',       width: 120, align: 'right' },
  { key: 'state',    label: 'State',         width: 130, filterable: true },
  { key: 'usage',    label: 'Usage',         width: 130, filterable: true },
  { key: 'creator',  label: 'Creator',       width: 160, filterable: true },
  { key: 'created',  label: 'Created date',  width: 180 },
  { key: 'modified', label: 'Modified date', width: 180 },
];

const DEFAULT_VISIBILITY: Record<string, boolean> = {
  id: true, type: true, name: true,
  players: false, state: false,
  usage: true, creator: true, created: true, modified: true,
};

const COL_MAP = Object.fromEntries(ALL_COLUMNS.map(c => [c.key, c])) as Record<keyof Segment, ColDef>;

interface Props {
  segments: Segment[];
  onCreateClick: () => void;
}

export default function SegmentList({ segments, onCreateClick }: Props) {
  const [search, setSearch]           = useState('');
  const [sortKey, setSortKey]         = useState<SortKey>(null);
  const [sortDir, setSortDir]         = useState<SortDir>('asc');
  const [columnOrder, setColumnOrder] = useState<(keyof Segment)[]>(() => ALL_COLUMNS.map(c => c.key));
  const [visibility, setVisibility]   = useState<Record<string, boolean>>(DEFAULT_VISIBILITY);
  const [showColPanel, setShowColPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Partial<Record<keyof Segment, string[]>>>({});
  const [filterDropdown, setFilterDropdown] = useState<keyof Segment | null>(null);
  const [draggedKey, setDraggedKey]   = useState<keyof Segment | null>(null);
  const [dragOverKey, setDragOverKey] = useState<keyof Segment | null>(null);
  const filterRef  = useRef<HTMLDivElement>(null);
  const colPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterDropdown) return;
    function onDown(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterDropdown(null);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [filterDropdown]);

  useEffect(() => {
    if (!showColPanel) return;
    function onDown(e: MouseEvent) {
      if (colPanelRef.current && !colPanelRef.current.contains(e.target as Node))
        setShowColPanel(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showColPanel]);

  const filterOptions = useMemo(() => {
    const opts: Partial<Record<keyof Segment, string[]>> = {};
    ALL_COLUMNS.filter(c => c.filterable).forEach(col => {
      opts[col.key] = [...new Set(segments.map(s => String(s[col.key] ?? '—')))].sort();
    });
    return opts;
  }, [segments]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = q
      ? segments.filter(s =>
          String(s.id).includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.creator.toLowerCase().includes(q)
        )
      : [...segments];

    (Object.entries(activeFilters) as [keyof Segment, string[]][]).forEach(([key, vals]) => {
      if (vals && vals.length > 0)
        list = list.filter(s => vals.includes(String(s[key] ?? '—')));
    });

    if (!sortKey) return list;
    return list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av ?? '').localeCompare(String(bv ?? ''));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [search, segments, activeFilters, sortKey, sortDir]);

  const footerStats = useMemo(() => computeFooterStats(filtered), [filtered]);

  function handleSort(key: keyof Segment) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function toggleFilterValue(col: keyof Segment, value: string) {
    setActiveFilters(prev => {
      const cur = prev[col] ?? [];
      return { ...prev, [col]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
    });
  }

  function onHandleDragStart(e: React.DragEvent, key: keyof Segment) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', key as string);
    setDraggedKey(key);
  }
  function onThDragOver(e: React.DragEvent, key: keyof Segment) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverKey(key);
  }
  function onThDrop(e: React.DragEvent, targetKey: keyof Segment) {
    e.preventDefault();
    const fromKey = e.dataTransfer.getData('text/plain') as keyof Segment;
    if (!fromKey || fromKey === targetKey) return;
    setColumnOrder(prev => {
      const next = [...prev];
      const from = next.indexOf(fromKey);
      const to   = next.indexOf(targetKey);
      next.splice(from, 1);
      next.splice(to, 0, fromKey);
      return next;
    });
    setDraggedKey(null);
    setDragOverKey(null);
  }
  function onThDragLeave() { setDragOverKey(null); }
  function onHandleDragEnd() { setDraggedKey(null); setDragOverKey(null); }

  const visibleCols = columnOrder
    .map(k => COL_MAP[k])
    .filter(c => c && visibility[c.key]);

  const activeFilterCount = Object.values(activeFilters).filter(v => v && v.length > 0).length;
  const hiddenCount = Object.values(visibility).filter(v => !v).length;

  return (
    <div className="segments-page">
      {/* Page header */}
      <div className="segments-header">
        <h1 className="segments-title">Segments</h1>
        <button className="btn-create" onClick={onCreateClick}>Create segment</button>
      </div>

      {/* Toolbar */}
      <div className="segments-toolbar">
        <div className="search-wrap">
          <SearchIcon />
          <input
            className="search-input"
            type="text"
            placeholder="Search by ID, Name, and Creator"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          {activeFilterCount > 0 && (
            <button className="btn-clear-filters" onClick={() => setActiveFilters({})}>
              Clear filters ({activeFilterCount})
            </button>
          )}
          <div className="col-panel-wrap" ref={colPanelRef}>
            <button
              className={`btn-columns${hiddenCount > 0 ? ' btn-columns--active' : ''}`}
              aria-label="Column settings"
              onClick={() => setShowColPanel(p => !p)}
            >
              <ColumnsIcon />
              {hiddenCount > 0 && <span className="btn-columns-badge">{hiddenCount}</span>}
            </button>
            {showColPanel && (
              <div className="col-panel">
                <div className="col-panel-header">
                  <span className="col-panel-title">Columns</span>
                  <button
                    className="col-panel-reset"
                    onClick={() => setVisibility(DEFAULT_VISIBILITY)}
                  >Reset</button>
                </div>
                <div className="col-panel-list">
                  {ALL_COLUMNS.map(col => (
                    <label
                      key={col.key}
                      className={`col-panel-item${col.locked ? ' col-panel-item--locked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={visibility[col.key] ?? true}
                        disabled={col.locked}
                        onChange={() => {
                          if (col.locked) return;
                          setVisibility(p => ({ ...p, [col.key]: !p[col.key] }));
                        }}
                      />
                      <span>{col.label}</span>
                      {col.locked && <span className="col-panel-lock">locked</span>}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="segments-table">
            <thead>
              <tr>
                {visibleCols.map(col => {
                  const colFilters = activeFilters[col.key] ?? [];
                  const isFiltered  = colFilters.length > 0;
                  const isDragging  = draggedKey  === col.key;
                  const isDragOver  = dragOverKey === col.key;
                  return (
                    <th
                      key={col.key}
                      style={{ width: col.width, minWidth: col.width }}
                      className={[
                        col.align === 'right' ? 'th-right' : '',
                        isDragging ? 'th--dragging' : '',
                        isDragOver ? 'th--drag-over' : '',
                      ].filter(Boolean).join(' ')}
                      onDragOver={e => onThDragOver(e, col.key)}
                      onDrop={e => onThDrop(e, col.key)}
                      onDragLeave={onThDragLeave}
                      onClick={() => handleSort(col.key)}
                    >
                      <span className="th-inner">
                        <span
                          className="th-drag-handle"
                          draggable
                          onDragStart={e => { e.stopPropagation(); onHandleDragStart(e, col.key); }}
                          onDragEnd={onHandleDragEnd}
                          onClick={e => e.stopPropagation()}
                          title="Drag to reorder"
                        >
                          <DragHandleIcon />
                        </span>
                        {col.align === 'right' && sortKey === col.key && <SortIcon dir={sortDir} />}
                        <span className="th-label">{col.label}</span>
                        {col.align !== 'right' && sortKey === col.key && <SortIcon dir={sortDir} />}
                        {isFiltered && <span className="th-filter-dot" />}
                        {col.filterable && (
                          <button
                            className={`th-filter-btn${isFiltered ? ' active' : ''}`}
                            title={`Filter by ${col.label}`}
                            onClick={e => {
                              e.stopPropagation();
                              setFilterDropdown(filterDropdown === col.key ? null : col.key);
                            }}
                          >
                            <FilterIcon active={isFiltered} />
                          </button>
                        )}
                      </span>

                      {filterDropdown === col.key && (
                        <div
                          className="col-filter-drop"
                          ref={filterRef}
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="col-filter-head">
                            <span className="col-filter-title">Filter by {col.label}</span>
                            {isFiltered && (
                              <button
                                className="col-filter-clear"
                                onClick={() => setActiveFilters(p => ({ ...p, [col.key]: [] }))}
                              >Clear</button>
                            )}
                          </div>
                          <div className="col-filter-options">
                            {(filterOptions[col.key] ?? []).map(val => (
                              <label key={val} className="col-filter-option">
                                <input
                                  type="checkbox"
                                  checked={colFilters.includes(val)}
                                  onChange={() => toggleFilterValue(col.key, val)}
                                />
                                <span>{val}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={visibleCols.length} className="td-empty">No segments found</td>
                </tr>
              ) : (
                filtered.map((seg, i) => (
                  <tr key={`${seg.id}-${i}`} className="segment-row">
                    {visibleCols.map(col => (
                      <td
                        key={col.key}
                        className={col.align === 'right' ? 'td-right' : ''}
                      >
                        {renderCell(seg, col.key)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="segments-footer">
        <span className="footer-updated">
          Last updated on 20-Feb-2026 19:45 &nbsp;·&nbsp; {filtered.length} segments
        </span>
        <div className="footer-badges">
          <span className="badge badge-static">
            <AnchorIcon />{footerStats.staticPlayers.toLocaleString()}
          </span>
          <span className="badge badge-dynamic">
            <WaveIcon />{footerStats.dynamicPlayers.toLocaleString()}
          </span>
          <span className="badge badge-uploaded">
            <UploadIcon />{footerStats.uploadedPlayers.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function renderCell(seg: Segment, key: keyof Segment) {
  switch (key) {
    case 'type':    return <TypeBadge type={seg.type} />;
    case 'name':    return <button className="td-name-btn">{seg.name}</button>;
    case 'players': return seg.players.toLocaleString();
    case 'state':   return <StateBadge state={seg.state} />;
    case 'usage':   return <span className="td-usage">{seg.usage ?? '—'}</span>;
    default:        return <span className="td-text">{String(seg[key])}</span>;
  }
}

/* ---- Sub-components ---- */

function TypeBadge({ type }: { type: SegmentType }) {
  return (
    <span className={`type-badge type-badge--${type}`}>
      {type === 'dynamic'  && <WaveIcon />}
      {type === 'static'   && <AnchorIcon />}
      {type === 'uploaded' && <UploadIcon />}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

function StateBadge({ state }: { state: Segment['state'] }) {
  return (
    <span className={`state-badge${state === 'used' ? ' state-used' : ' state-notused'}`}>
      <span className="state-dot" />
      {state === 'used' ? 'Used' : 'Not used'}
    </span>
  );
}

function SortIcon({ dir }: { dir: SortDir }) {
  return (
    <svg className="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
      {dir === 'asc'
        ? <path d="M6 2l4 6H2l4-6z" fill="currentColor"/>
        : <path d="M6 10L2 4h8l-4 6z" fill="currentColor"/>}
    </svg>
  );
}

function DragHandleIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
      <circle cx="3" cy="2.5"  r="1.2" fill="currentColor"/>
      <circle cx="7" cy="2.5"  r="1.2" fill="currentColor"/>
      <circle cx="3" cy="7"    r="1.2" fill="currentColor"/>
      <circle cx="7" cy="7"    r="1.2" fill="currentColor"/>
      <circle cx="3" cy="11.5" r="1.2" fill="currentColor"/>
      <circle cx="7" cy="11.5" r="1.2" fill="currentColor"/>
    </svg>
  );
}

function FilterIcon({ active }: { active?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 2.5h10M3 6h6M5 9.5h2"
        stroke={active ? '#2563eb' : 'currentColor'}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="var(--neutral-500)" strokeWidth="1.4"/>
      <path d="M10.5 10.5l3 3" stroke="var(--neutral-500)" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function ColumnsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="3" height="10" rx="1" fill="var(--neutral-500)"/>
      <rect x="6.5" y="3" width="3" height="10" rx="1" fill="var(--neutral-500)"/>
      <rect x="11" y="3" width="3" height="10" rx="1" fill="var(--neutral-500)"/>
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4.5c1.5-1.5 3-1.5 4.5 0S9 6 10.5 4.5 12 3 13 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M2 7.5c1.5-1.5 3-1.5 4.5 0S9 9 10.5 7.5 12 6 13 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M2 10.5c1.5-1.5 3-1.5 4.5 0S9 12 10.5 10.5 12 9 13 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function AnchorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M7 5v7M4 12c-.5 0-2-1.12-2-3h10c0 1.88-1.5 3-2 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M7 12v-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 9V3M4.5 5.5L7 3l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 10v1.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
