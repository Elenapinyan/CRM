import './NavBar.css';

export default function NavBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">BROADWAY</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-time">{time}</span>
        <button className="navbar-icon-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5A1 1 0 0 0 3.5 15h13a1 1 0 0 0 .866-1.5L16 11V8a6 6 0 0 0-6-6z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M8 15a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.5"/>
          </svg>
          <span className="navbar-badge" />
        </button>
        <button className="navbar-avatar" aria-label="User menu">
          <span>SD</span>
        </button>
        <span className="navbar-username">Sophia Davis</span>
      </div>
    </header>
  );
}
