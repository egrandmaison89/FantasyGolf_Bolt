import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TournamentCard } from './components/TournamentCard';
import { LeagueStandings } from './components/LeagueStandings';
import { PlayerRoster } from './components/PlayerRoster';
import { DraftPage } from './components/DraftPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AuthProvider } from './components/auth/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
        {currentPage === 'dashboard' ? (
          <main className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TournamentCard />
              <LeagueStandings />
              <div className="md:col-span-2">
                <PlayerRoster />
              </div>
            </div>
          </main>
        ) : currentPage === 'draft' ? (
          <DraftPage />
        ) : currentPage === 'login' ? (
          <LoginPage onNavigate={setCurrentPage} />
        ) : currentPage === 'register' ? (
          <RegisterPage onNavigate={setCurrentPage} />
        ) : null}
      </div>
    </AuthProvider>
  );
}

export default App;