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
  minWidth?: number;
  flex?: boolean;
  filterable?: boolean;
  locked?: boolean;
}

const ALL_COLUMNS: ColDef[] = [
  { key: 'id',       label: 'ID',            width: 120, locked: true },
  { key: 'type',     label: 'Type',          width: 160, minWidth: 140, filterable: true },
  { key: 'name',     label: 'Name',          width: 200, flex: true, minWidth: 200, locked: true },
  { key: 'players',  label: 'Players',       width: 110, align: 'right' },
  { key: 'state',    label: 'State',         width: 120, filterable: true },
  { key: 'usage',    label: 'Usage',         width: 130, flex: true, minWidth: 120, filterable: true },
  { key: 'creator',  label: 'Creator',       width: 130, filterable: true },
  { key: 'created',  label: 'Created date',  width: 150 },
  { key: 'modified', label: 'Modified date', width: 150 },
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
  const [colPanelSearch, setColPanelSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Partial<Record<keyof Segment, string[]>>>({});
  const [filterDropdown, setFilterDropdown] = useState<keyof Segment | null>(null);
  const [draggedKey, setDraggedKey]   = useState<keyof Segment | null>(null);
  const [dragOverKey, setDragOverKey] = useState<keyof Segment | null>(null);
  const filterRef   = useRef<HTMLDivElement>(null);
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
      if (colPanelRef.current && !colPanelRef.current.contains(e.target as Node)) {
        setShowColPanel(false);
        setColPanelSearch('');
      }
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

  const lastUpdated = useMemo(() => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()).replace(',', '');
  }, []);

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

  const filteredPanelCols = colPanelSearch.trim()
    ? ALL_COLUMNS.filter(c => c.label.toLowerCase().includes(colPanelSearch.toLowerCase()))
    : ALL_COLUMNS;

  return (
    <div className="sl">
      {/* Header */}
      <header className="sl__header">
        <h1 className="sl__title">Segments</h1>
        <button className="sl__btn-create" onClick={onCreateClick}>Create segment</button>
      </header>

      {/* Toolbar */}
      <div className="sl__toolbar">
        <div className="sl__search">
          <span className="sl__search-addon" aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            type="search"
            className="sl__search-input"
            placeholder="Search by ID, Name, and Creator"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="sl__toolbar-actions" ref={colPanelRef}>
          {activeFilterCount > 0 && (
            <button className="sl__btn-clear-filters" onClick={() => setActiveFilters({})}>
              Clear filters ({activeFilterCount})
            </button>
          )}
          <button
            type="button"
            className={`sl__columns-btn${showColPanel ? ' sl__columns-btn--open' : ''}`}
            aria-label="Column visibility"
            onClick={() => { setShowColPanel(p => !p); if (showColPanel) setColPanelSearch(''); }}
          >
            <ColumnsIcon />
          </button>

          {showColPanel && (
            <div className="sl__col-panel" role="dialog" aria-label="Column visibility" onClick={e => e.stopPropagation()}>
              <div className="sl__col-panel-search">
                <input
                  type="search"
                  className="sl__col-panel-search-input"
                  placeholder="Search columns"
                  value={colPanelSearch}
                  onChange={e => setColPanelSearch(e.target.value)}
                  autoFocus
                />
              </div>
              <ul className="sl__col-panel-list">
                {filteredPanelCols.map(col => (
                  <li key={col.key} className="sl__col-panel-row">
                    <label className={`sl__col-panel-label${col.locked ? ' sl__col-panel-label--locked' : ''}`}>
                      <input
                        type="checkbox"
                        className="sl__col-panel-checkbox"
                        checked={visibility[col.key] ?? true}
                        disabled={col.locked}
                        onChange={() => {
                          if (col.locked) return;
                          setVisibility(p => ({ ...p, [col.key]: !p[col.key] }));
                        }}
                      />
                      <span>{col.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="sl__col-panel-footer">
                <button
                  type="button"
                  className="sl__col-panel-btn"
                  onClick={() => setVisibility(DEFAULT_VISIBILITY)}
                >
                  <UndoIcon />
                  Revert to default
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="sl__grid-wrap">
        <div className="sl__grid-scroll">
          <table className="sl__table">
            <thead>
              <tr>
                {visibleCols.map(col => {
                  const colFilters = activeFilters[col.key] ?? [];
                  const isFiltered = colFilters.length > 0;
                  return (
                    <th
                      key={col.key}
                      style={{ width: col.width, minWidth: col.minWidth ?? col.width }}
                      className={[
                        col.align === 'right' ? 'th-right' : '',
                        draggedKey  === col.key ? 'th--dragging' : '',
                        dragOverKey === col.key ? 'th--drag-over' : '',
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
                        <div className="col-filter-drop" ref={filterRef} onClick={e => e.stopPropagation()}>
                          <div className="col-filter-head">
                            <span className="col-filter-title">Filter by {col.label}</span>
                            {isFiltered && (
                              <button className="col-filter-clear" onClick={() => setActiveFilters(p => ({ ...p, [col.key]: [] }))}>Clear</button>
                            )}
                          </div>
                          <div className="col-filter-options">
                            {(filterOptions[col.key] ?? []).map(val => (
                              <label key={val} className="col-filter-option">
                                <input type="checkbox" checked={colFilters.includes(val)} onChange={() => toggleFilterValue(col.key, val)} />
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
                <tr><td colSpan={visibleCols.length} className="td-empty">No segments found</td></tr>
              ) : (
                filtered.map((seg, i) => (
                  <tr key={`${seg.id}-${i}`} className="sl__row">
                    {visibleCols.map(col => (
                      <td key={col.key} className={col.align === 'right' ? 'td-right' : ''}>
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
      <footer className="sl__footer">
        <span className="sl__footer-updated">Last updated on {lastUpdated}</span>
        <div className="sl__footer-stats">
          <span className="sl__footer-chip sl__footer-chip--static">
            <AnchorIcon />{footerStats.staticPlayers.toLocaleString()}
          </span>
          <span className="sl__footer-chip sl__footer-chip--dynamic">
            <WaveIcon />{footerStats.dynamicPlayers.toLocaleString()}
          </span>
          <span className="sl__footer-chip sl__footer-chip--uploaded">
            <UploadIcon />{footerStats.uploadedPlayers.toLocaleString()}
          </span>
        </div>
      </footer>
    </div>
  );
}

function renderCell(seg: Segment, key: keyof Segment) {
  switch (key) {
    case 'type':    return <TypeChip type={seg.type} />;
    case 'name':    return <a className="sl__name-link" href="#">{seg.name}</a>;
    case 'players': return seg.players.toLocaleString();
    case 'state':   return <StateCell state={seg.state} />;
    case 'usage':   return <span className="td-usage">{seg.usage ?? '—'}</span>;
    default:        return String(seg[key]);
  }
}

function TypeChip({ type }: { type: SegmentType }) {
  return (
    <span className={`sl__footer-chip sl__footer-chip--${type}`}>
      {type === 'dynamic'  && <WaveIcon />}
      {type === 'static'   && <AnchorIcon />}
      {type === 'uploaded' && <UploadIcon />}
      {type === 'dynamic' ? 'Dynamic' : type === 'static' ? 'Static' : 'Uploaded'}
    </span>
  );
}

function StateCell({ state }: { state: Segment['state'] }) {
  return (
    <span className={`sl__state sl__state--${state}`}>
      <span className="sl__state-dot" aria-hidden="true" />
      {state === 'used' ? 'Used' : 'Not used'}
    </span>
  );
}

function SortIcon({ dir }: { dir: SortDir }) {
  return (
    <svg className="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
      {dir === 'asc' ? <path d="M6 2l4 6H2l4-6z" fill="currentColor"/> : <path d="M6 10L2 4h8l-4 6z" fill="currentColor"/>}
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
      <path d="M1 2.5h10M3 6h6M5 9.5h2" stroke={active ? '#2563eb' : 'currentColor'} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function ColumnsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="3" height="10" rx="1" fill="currentColor"/>
      <rect x="7" y="4" width="3" height="10" rx="1" fill="currentColor"/>
      <rect x="12" y="4" width="3" height="10" rx="1" fill="currentColor"/>
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 5.5h6a4 4 0 0 1 0 8H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 5.5L5.5 3M3 5.5L5.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 3.5c1.2-1.2 2.4-1.2 3.6 0S7 4.7 8.2 3.5 9.6 2.3 10.4 2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1 6.5c1.2-1.2 2.4-1.2 3.6 0S7 7.7 8.2 6.5 9.6 5.3 10.4 5.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1 9.5c1.2-1.2 2.4-1.2 3.6 0S7 10.7 8.2 9.5 9.6 8.3 10.4 8.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function AnchorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="3" r="1.3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 4.3v6M3.5 10.3c-.4 0-1.7-.9-1.7-2.5h8.4c0 1.6-1.3 2.5-1.7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 8V2.5M4 4.5L6 2.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.5 8.5v1.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
