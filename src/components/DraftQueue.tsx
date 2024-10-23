import React from 'react';
import { Users } from 'lucide-react';

interface DraftQueueProps {
  draftOrder: string[];
  currentPick: number;
  isSnakeReverse: boolean;
  currentRound: number;
}

export function DraftQueue({ draftOrder, currentPick, isSnakeReverse, currentRound }: DraftQueueProps) {
  const getPickOrder = () => {
    let order = [...draftOrder];
    if (isSnakeReverse) {
      order = order.reverse();
    }
    return order;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Draft Order</h2>
      </div>
      
      <div className="space-y-3">
        {getPickOrder().map((team, index) => (
          <div
            key={team}
            className={`p-4 rounded-lg ${
              index === (isSnakeReverse ? draftOrder.length - 1 - currentPick : currentPick)
                ? 'bg-green-100 border-2 border-green-500'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800">{team}</span>
                <p className="text-sm text-gray-500">
                  Round {currentRound}, Pick {index + 1}
                </p>
              </div>
              {index === (isSnakeReverse ? draftOrder.length - 1 - currentPick : currentPick) && (
                <span className="text-sm font-semibold text-green-600">
                  On the clock
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}