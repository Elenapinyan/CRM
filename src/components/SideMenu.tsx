import './SideMenu.css';

const NAV_ITEMS = [
  { label: 'Dashboard',         icon: <DashboardIcon />,  active: true  },
  { label: 'Analytics',         icon: <AnalyticsIcon />,  active: false },
  { label: 'Segments',          icon: <SegmentsIcon />,   active: false },
  { label: 'Workflows',         icon: <WorkflowsIcon />,  active: false },
  { label: 'Communication Hub', icon: <CommsIcon />,      active: false },
  { label: 'Player 360',        icon: <PlayerIcon />,     active: false },
];

export default function SideMenu() {
  return (
    <aside className="side-menu">
      {/* App selector */}
      <div className="side-menu-app">
        <div className="side-menu-app-icon">
          <CrmAppIcon />
        </div>
        <span className="side-menu-app-name">CRM</span>
        <ChevronUpDownIcon />
      </div>

      {/* Nav */}
      <nav className="side-menu-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.label}
            className={`side-menu-item${item.active ? ' active' : ''}`}
          >
            <span className="side-menu-item-icon">{item.icon}</span>
            <span className="side-menu-item-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Decorative background */}
      <div className="side-menu-deco" aria-hidden="true">
        <svg className="side-menu-deco-svg" viewBox="0 0 236 620" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Isometric cube 1 */}
          <IsoCube cx={68} cy={130} s={44} strokeWidth={2.2} />
          {/* Isometric cube 2 */}
          <IsoCube cx={164} cy={240} s={32} strokeWidth={1.8} />
          {/* </> code icon */}
          <g transform="translate(118, 430)" stroke="#18181b" strokeLinecap="round" strokeLinejoin="round">
            {/* < */}
            <polyline points="-52,-28 -72,0 -52,28" strokeWidth="5" fill="none"/>
            {/* > */}
            <polyline points="52,-28 72,0 52,28" strokeWidth="5" fill="none"/>
            {/* / */}
            <line x1="16" y1="-34" x2="-16" y2="34" strokeWidth="5"/>
          </g>
        </svg>
      </div>

      {/* Footer / collapse */}
      <div className="side-menu-footer">
        <div className="side-menu-footer-border" />
        <button className="side-menu-collapse" aria-label="Collapse menu">
          <CollapseIcon />
        </button>
      </div>
    </aside>
  );
}

/* ---- Isometric cube helper ---- */
function IsoCube({ cx, cy, s, strokeWidth }: { cx: number; cy: number; s: number; strokeWidth: number }) {
  const w = s * 0.866; // cos(30°)
  const h = s * 0.5;   // sin(30°)
  // 6 outer vertices of isometric cube
  const top = `${cx},${cy - s}`;
  const tr  = `${cx + w},${cy - h}`;
  const br  = `${cx + w},${cy + h}`;
  const bot = `${cx},${cy + s}`;
  const bl  = `${cx - w},${cy + h}`;
  const tl  = `${cx - w},${cy - h}`;
  const mid = `${cx},${cy}`;
  const props = { stroke: '#18181b', strokeWidth, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <g>
      {/* Top face */}
      <polygon points={`${top} ${tr} ${mid} ${tl}`} {...props} />
      {/* Right face */}
      <polygon points={`${tr} ${br} ${bot} ${mid}`} {...props} />
      {/* Left face */}
      <polygon points={`${tl} ${mid} ${bot} ${bl}`} {...props} />
    </g>
  );
}

/* ---- Icons ---- */

function CrmAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2l7 3.5-3.5 1.5L4 11 2 2z" fill="white" fillOpacity="0.95"/>
      <path d="M7.5 7.5l3.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
    </svg>
  );
}

function ChevronUpDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.5 9.5l2.5 2.5 2.5-2.5" stroke="var(--neutral-500)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 6.5l2.5-2.5 2.5 2.5" stroke="var(--neutral-500)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="6.5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11" y="2.5" width="6.5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="2.5" y="9.5" width="6.5" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11" y="9.5" width="6.5" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 10 L10 2.5 A7.5 7.5 0 1 1 2.5 10 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M10 2.5 A7.5 7.5 0 0 1 17.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function SegmentsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="10" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function WorkflowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1.5" y="7.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="13.5" y="2.5" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="13.5" y="13.5" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 10h3.5M10 10V4.5h3.5M10 10v5.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function CommsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 14.5V17l2.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 14.5C2.7 13.3 2 11.7 2 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M7 9.5h6M7 12.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function PlayerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="10" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5.5 16c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 4.5l-5 4.5 5 4.5" stroke="var(--neutral-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="13" y1="4" x2="13" y2="14" stroke="var(--neutral-500)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
