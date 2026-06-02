import { useState, useEffect, useRef } from 'react';
import { FILTER_DEFS, CATEGORIES } from '../data/filterDefs';
import type { FilterDef } from '../types/segment';
import './FilterSelector.css';

interface Props {
  onSelect: (filter: FilterDef) => void;
  onClose: () => void;
}

export default function FilterSelector({ onSelect, onClose }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All filters');
  const [hovered, setHovered] = useState<FilterDef | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const filtered = FILTER_DEFS.filter(f => {
    const matchesCat = category === 'All filters' || f.category === category;
    const q = search.toLowerCase();
    const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.subCategory.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Group by subCategory
  const grouped: Record<string, FilterDef[]> = {};
  for (const f of filtered) {
    const key = `${f.category} / ${f.subCategory}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(f);
  }

  const described = hovered ?? (filtered[0] ?? null);

  const counts: Record<string, number> = {};
  for (const f of FILTER_DEFS) {
    counts[f.category] = (counts[f.category] ?? 0) + 1;
  }
  counts['All filters'] = FILTER_DEFS.length;

  return (
    <div className="filter-selector-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="filter-selector" ref={ref}>
        {/* Search */}
        <div className="fs-search-wrap">
          <svg className="fs-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="var(--neutral-500)" strokeWidth="1.4"/>
            <path d="M10.5 10.5l3 3" stroke="var(--neutral-500)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            autoFocus
            className="fs-search-input"
            placeholder="Search by filter name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="fs-body">
          {/* Left: categories */}
          <div className="fs-sidebar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`fs-cat-item${category === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Middle: filter list */}
          <div className="fs-list">
            {Object.keys(grouped).length === 0 ? (
              <p className="fs-empty">No filters found</p>
            ) : (
              Object.entries(grouped).map(([groupName, filters]) => (
                <div key={groupName} className="fs-group">
                  <div className="fs-group-label">
                    <span className="fs-group-dot" style={{ background: filters[0].color }} />
                    {groupName}
                  </div>
                  {filters.map(f => (
                    <button
                      key={f.id}
                      className={`fs-filter-item${described?.id === f.id ? ' hovered' : ''}`}
                      onMouseEnter={() => setHovered(f)}
                      onClick={() => onSelect(f)}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Right: description */}
          {described && (
            <div className="fs-description">
              <h3 className="fs-desc-title">{described.name}</h3>
              <p className="fs-desc-cat">{described.category} / {described.subCategory}</p>
              <p className="fs-desc-text">{described.description}</p>
            </div>
          )}
        </div>

        <div className="fs-count-bar">
          <span>{filtered.length} FILTERS</span>
        </div>
      </div>
    </div>
  );
}
