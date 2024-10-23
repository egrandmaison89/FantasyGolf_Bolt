import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, teamName: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  tournamentTeams: Team[];
}

interface User {
  email: string;
  teamName: string;
}

interface Team {
  teamName: string;
  joinedAt: Date;
  players: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tournamentTeams, setTournamentTeams] = useState<Team[]>([]);
  const [isDraftComplete, setIsDraftComplete] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTeams = localStorage.getItem('tournamentTeams');
    const storedDraftStatus = localStorage.getItem('isDraftComplete');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedTeams) {
      setTournamentTeams(JSON.parse(storedTeams));
    }
    if (storedDraftStatus) {
      setIsDraftComplete(JSON.parse(storedDraftStatus));
    }
  }, []);

  const addTeamToTournament = (teamName: string) => {
    if (isDraftComplete) return false;
    
    const newTeam: Team = {
      teamName,
      joinedAt: new Date(),
      players: [],
    };

    const updatedTeams = [...tournamentTeams, newTeam];
    setTournamentTeams(updatedTeams);
    localStorage.setItem('tournamentTeams', JSON.stringify(updatedTeams));
    return true;
  };

  const login = async (email: string, password: string) => {
    // In a real app, validate credentials against a backend
    const mockUser = { email, teamName: "Team " + email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return 'dashboard';
  };

  const register = async (email: string, teamName: string, password: string) => {
    // In a real app, send registration data to backend
    const mockUser = { email, teamName };
    const canJoinTournament = addTeamToTournament(teamName);
    
    if (!canJoinTournament) {
      throw new Error('Tournament draft is already complete');
    }

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return 'dashboard';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      tournamentTeams 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};