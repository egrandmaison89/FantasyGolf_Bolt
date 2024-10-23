import React from 'react';
import { User } from 'lucide-react';

export function PlayerRoster() {
  const players = [
    { name: "Scottie Scheffler", rank: 1, score: -8, status: "active" },
    { name: "Rory McIlroy", rank: 2, score: -6, status: "active" },
    { name: "Jon Rahm", rank: 3, score: -5, status: "active" },
    { name: "Brooks Koepka", rank: 4, score: -4, status: "active" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <User className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">My Players</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player) => (
          <div key={player.name} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{player.name}</h3>
                <p className="text-sm text-gray-600">World Rank: {player.rank}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{player.score}</p>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {player.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}