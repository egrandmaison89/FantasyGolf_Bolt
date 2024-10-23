import React from 'react';
import { Medal } from 'lucide-react';

export function LeagueStandings() {
  const standings = [
    { rank: 1, name: "Tiger's Team", points: 1250 },
    { rank: 2, name: "Golf Kings", points: 1180 },
    { rank: 3, name: "Birdie Brigade", points: 1150 },
    { rank: 4, name: "Eagle Elite", points: 1120 },
    { rank: 5, name: "Par Partners", points: 1090 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Medal className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">League Standings</h2>
      </div>
      <div className="space-y-3">
        {standings.map((team) => (
          <div key={team.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-600">#{team.rank}</span>
              <span className="text-gray-800">{team.name}</span>
            </div>
            <span className="font-semibold text-green-600">{team.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}