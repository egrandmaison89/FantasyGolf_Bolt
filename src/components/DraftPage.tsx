import React, { useState, useEffect } from 'react';
import { Users, Timer, Search, Lock } from 'lucide-react';
import { DraftQueue } from './DraftQueue';
import { PlayerPool } from './PlayerPool';
import { DraftTimer } from './DraftTimer';
import { useAuth } from './auth/AuthContext';

export function DraftPage() {
  const { isAuthenticated, user } = useAuth();
  const [draftOrder] = useState([
    "Tiger's Team",
    "Golf Kings",
    "Birdie Brigade",
    "Eagle Elite",
    "Par Partners"
  ]);
  
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPick, setCurrentPick] = useState(0);
  const [isSnakeReverse, setIsSnakeReverse] = useState(false);
  
  const calculateCurrentTeam = () => {
    return draftOrder[currentPick];
  };

  const nextPick = () => {
    if (isSnakeReverse) {
      if (currentPick > 0) {
        setCurrentPick(currentPick - 1);
      } else {
        setCurrentRound(currentRound + 1);
        setIsSnakeReverse(false);
        setCurrentPick(0);
      }
    } else {
      if (currentPick < draftOrder.length - 1) {
        setCurrentPick(currentPick + 1);
      } else {
        setIsSnakeReverse(true);
        setCurrentPick(draftOrder.length - 1);
      }
    }
  };

  const isCurrentTeam = user?.teamName === calculateCurrentTeam();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 pt-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Viewing Mode Only</h2>
            <p className="text-gray-600 mb-4">Sign in to participate in the draft</p>
            <DraftQueue 
              draftOrder={draftOrder}
              currentPick={currentPick}
              isSnakeReverse={isSnakeReverse}
              currentRound={currentRound}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Draft Room</h1>
            <p className="text-gray-600">Round {currentRound} - Pick {currentPick + 1}</p>
          </div>
          <DraftTimer onTimeExpired={nextPick} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PlayerPool 
              currentTeam={calculateCurrentTeam()} 
              onPlayerDrafted={nextPick}
              isCurrentTeam={isCurrentTeam}
            />
          </div>
          <div>
            <DraftQueue 
              draftOrder={draftOrder}
              currentPick={currentPick}
              isSnakeReverse={isSnakeReverse}
              currentRound={currentRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
}