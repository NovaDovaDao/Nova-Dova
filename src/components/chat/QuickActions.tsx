// src/components/chat/QuickActions.tsx
import React from 'react';
import { QuickActionButton } from '../ui/QuickActionButton';

interface QuickActionsProps {
  onActionSelect: (message: string) => void;
  disabled?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onActionSelect,
  disabled = false
}) => {
  const predefinedActions = [
    "Build a Marketing Agent",
    "Build a Trading Agent",
    "Tell me more about Nova Dova"
  ];

  return (
    <div className="w-full px-4 py-3 bg-gray-900/30 border-t border-gray-700">
      <div className="flex flex-col space-y-2">
        <div className="text-xs text-gray-400 mb-1">Quick Actions</div>
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory 
                      scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {predefinedActions.map((action) => (
            <div key={action} className="snap-start">
              <QuickActionButton
                label={action}
                onClick={() => onActionSelect(action)}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;