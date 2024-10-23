import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const AVAILABLE_PLAYERS = [
  { id: 1, name: "Scottie Scheffler", rank: 1, country: "USA", avgScore: 69.8 },
  { id: 2, name: "Rory McIlroy", rank: 2, country: "NIR", avgScore: 70.1 },
  { id: 3, name: "Jon Rahm", rank: 3, country: "ESP", avgScore: 69.9 },
  { id: 4, name: "Viktor Hovland", rank: 4, country: "NOR", avgScore: 70.2 },
  { id: 5, name: "Xander Schauffele", rank: 5, country: "USA", avgScore: 70.0 },
];

interface PlayerPoolProps {
  currentTeam: string;
  onPlayerDrafted: () => void;
  isCurrentTeam: boolean;
}

export function PlayerPool({ currentTeam, onPlayerDrafted, isCurrentTeam }: PlayerPoolProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [draftedPlayers, setDraftedPlayers] = useState<number[]>([]);

  const handleDraft = (playerId: number) => {
    if (draftedPlayers.includes(playerId) || !isCurrentTeam) return;
    setDraftedPlayers([...draftedPlayers, playerId]);
    onPlayerDrafted();
  };

  const filteredPlayers = AVAILABLE_PLAYERS.filter(player => 
    !draftedPlayers.includes(player.id) &&
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Players</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search players..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{player.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.avgScore}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDraft(player.id)}
                    className={`${
                      isCurrentTeam 
                        ? 'text-green-600 hover:text-green-900' 
                        : 'text-gray-400 cursor-not-allowed'
                    } font-semibold`}
                    disabled={!isCurrentTeam || draftedPlayers.includes(player.id)}
                  >
                    {isCurrentTeam ? 'Draft' : 'Waiting'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}