import { Route, Routes } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBg from './components/ParticleBg';
import HomePage from './pages/Home';

const navItems = [
  { to: '/', label: 'Best Of Luck...!!', icon: Home }
];

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-canvas text-slate-100">
      <ParticleBg />
      <Navbar navItems={navItems} />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Shell>
  );
}
