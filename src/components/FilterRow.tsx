import { useState, useRef, useEffect } from 'react';
import { CONDITIONS_BY_TYPE } from '../data/filterDefs';
import type { ActiveFilter } from '../types/segment';
import './FilterRow.css';

interface Props {
  filter: ActiveFilter;
  onChange: (updated: ActiveFilter) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export default function FilterRow({ filter, onChange, onDelete, onDuplicate }: Props) {
  const [openDrop, setOpenDrop] = useState<'condition' | 'valueType' | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const conditions = CONDITIONS_BY_TYPE[filter.dataType] ?? CONDITIONS_BY_TYPE.string;

  useEffect(() => {
    function close(e: MouseEvent) {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  function setCondition(c: string) {
    onChange({ ...filter, condition: c });
    setOpenDrop(null);
  }

  function setValueType(vt: 'exact' | 'equivalent') {
    onChange({ ...filter, valueType: vt });
    setOpenDrop(null);
  }

  const isDate    = filter.dataType === 'date';
  const isBool    = filter.dataType === 'boolean';
  const showValue = !isBool;
  const showUnit  = filter.dataType === 'number';
  const showValueType = filter.dataType === 'number';
  const isWithin  = filter.condition === 'within' || filter.condition === 'not within';

  return (
    <div className="filter-row" ref={rowRef}>
      <div className="filter-row-stripe" style={{ background: filter.color }} />

      <div className="filter-row-body">
        <div className="filter-row-left">
          {/* field name */}
          <strong className="filter-name">{filter.name}</strong>
          <span className="filter-is">is</span>

          {/* condition dropdown */}
          <div className="filter-drop-wrap">
            <button
              className="filter-chip"
              onClick={() => setOpenDrop(openDrop === 'condition' ? null : 'condition')}
            >
              {filter.condition}
              <ChevronIcon />
            </button>
            {openDrop === 'condition' && (
              <div className="filter-dropdown dark">
                {conditions.map(c => (
                  <button
                    key={c}
                    className={`fd-item${c === filter.condition ? ' active' : ''}`}
                    onClick={() => setCondition(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Value inputs */}
          {showValue && !isBool && (
            <>
              {isDate && isWithin ? (
                <>
                  <span className="filter-kw">dynamic dates from</span>
                  <span className="filter-kw">custom</span>
                  <input
                    className="filter-chip-input"
                    type="number"
                    min="0"
                    value={filter.value}
                    onChange={e => onChange({ ...filter, value: e.target.value })}
                    style={{ width: 48 }}
                  />
                  <span className="filter-kw">days ago to</span>
                  <span className="filter-chip no-arrow">today</span>
                </>
              ) : isDate ? (
                <input
                  className="filter-chip-input"
                  type="date"
                  value={filter.value}
                  onChange={e => onChange({ ...filter, value: e.target.value })}
                />
              ) : (
                <>
                  <span className="filter-kw">to</span>
                  <input
                    className="filter-chip-input"
                    type="text"
                    value={filter.value}
                    onChange={e => onChange({ ...filter, value: e.target.value })}
                    style={{ width: 64 }}
                  />
                </>
              )}

              {showUnit && !isDate && (
                <span className="filter-chip no-arrow">{filter.unit || 'EUR'}</span>
              )}

              {showValueType && !isDate && (
                <div className="filter-drop-wrap">
                  <button
                    className="filter-chip"
                    onClick={() => setOpenDrop(openDrop === 'valueType' ? null : 'valueType')}
                  >
                    {filter.valueType}
                    <ChevronIcon />
                  </button>
                  {openDrop === 'valueType' && (
                    <div className="filter-dropdown dark">
                      {(['exact', 'equivalent'] as const).map(vt => (
                        <button
                          key={vt}
                          className={`fd-item${vt === filter.valueType ? ' active' : ''}`}
                          onClick={() => setValueType(vt)}
                        >
                          {vt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {showValueType && !isDate && (
                <span className="filter-chip no-arrow">value</span>
              )}
            </>
          )}
        </div>

        <div className="filter-row-right">
          <span className="filter-player-count">
            <PeopleIcon />
            {filter.playerCount.toLocaleString()} players
          </span>
          <button className="filter-icon-btn" onClick={onDuplicate} title="Duplicate">
            <CopyIcon />
          </button>
          <button className="filter-icon-btn danger" onClick={onDelete} title="Delete">
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
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

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="4.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1.5 5.5v8a1 1 0 0 0 1 1h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2 4h11M5 4V2.5A.5.5 0 0 1 5.5 2h4a.5.5 0 0 1 .5.5V4M6 7v4M9 7v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M3 4l.75 8.5A.5.5 0 0 0 4.25 13h6.5a.5.5 0 0 0 .5-.5L12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
