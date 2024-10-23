import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export function TournamentCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Tournament</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-green-600" />
          <span className="text-gray-700">April 11-14, 2024</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <span className="text-gray-700">Augusta National Golf Club</span>
        </div>
        <div className="bg-green-50 p-4 rounded-md">
          <h3 className="font-semibold text-green-800">The Masters 2024</h3>
          <p className="text-sm text-green-700 mt-1">Purse: $18,000,000</p>
        </div>
      </div>
    </div>
  );
}