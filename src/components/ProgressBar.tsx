
import React from 'react';
import { Gift } from 'lucide-react';

interface ProgressBarProps {
  currentTotal: number;
  threshold: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTotal, threshold }) => {
  const progress = Math.min((currentTotal / threshold) * 100, 100);
  const isGiftUnlocked = progress >= 100;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress to Free Gift</span>
        <span className="text-sm font-medium text-purple-600">${currentTotal.toFixed(2)} / ${threshold.toFixed(2)}</span>
      </div>
      
      <div className="relative w-full">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Gift icon at the end of progress bar */}
        <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2">
          <div className={`rounded-full p-2 ${
            isGiftUnlocked ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            <Gift size={16} />
          </div>
        </div>
      </div>
      
      <div className="text-sm text-center mt-4">
        {isGiftUnlocked ? (
          <div className="text-purple-600 font-medium animate-pulse">
            🎁 Congratulations! Free gift unlocked!
          </div>
        ) : (
          <div className="text-gray-600">
            Add ${(threshold - currentTotal).toFixed(2)} more to unlock your free gift
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
