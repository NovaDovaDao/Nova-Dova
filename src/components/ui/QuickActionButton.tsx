// src/components/ui/QuickActionButton.tsx
import React from 'react';

interface QuickActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 text-sm rounded-xl bg-gray-800/50 backdrop-blur-sm 
                border border-gray-700 text-gray-300
                hover:bg-gray-700/50 hover:border-purple-500/50 hover:text-white
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                whitespace-nowrap flex-shrink-0 max-w-[200px] truncate"
    >
      {label}
    </button>
  );
};

export default QuickActionButton;