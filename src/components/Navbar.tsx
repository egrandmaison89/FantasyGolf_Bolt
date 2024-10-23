import React from 'react';
import { Trophy, LogOut } from 'lucide-react';
import { useAuth } from './auth/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">Fantasy Golf Pro</span>
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`text-white hover:text-green-200 ${currentPage === 'dashboard' ? 'border-b-2 border-white' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('draft')}
            className={`text-white hover:text-green-200 ${currentPage === 'draft' ? 'border-b-2 border-white' : ''}`}
          >
            Draft Room
          </button>
          <button 
            onClick={() => onNavigate('tournaments')}
            className={`text-white hover:text-green-200 ${currentPage === 'tournaments' ? 'border-b-2 border-white' : ''}`}
          >
            Tournaments
          </button>
          {isAuthenticated ? (
            <>
              <button 
                onClick={() => onNavigate('team')}
                className={`text-white hover:text-green-200 ${currentPage === 'team' ? 'border-b-2 border-white' : ''}`}
              >
                {user?.teamName}
              </button>
              <button 
                onClick={() => {
                  logout();
                  onNavigate('dashboard');
                }}
                className="text-white hover:text-green-200 flex items-center space-x-1"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className="text-white hover:text-green-200"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-white text-green-700 px-4 py-2 rounded-md hover:bg-green-100"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}