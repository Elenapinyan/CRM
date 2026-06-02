import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <div className="app-body">
        <NavBar />
        <div className="app-row">
          <SideMenu />
          <main className="app-main">
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
