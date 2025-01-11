// src/context/TransitionContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: () => Promise<void>;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = async () => {
    setIsTransitioning(true);
    // Minimum transition time for visual consistency
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const endTransition = () => {
    setIsTransitioning(false);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};