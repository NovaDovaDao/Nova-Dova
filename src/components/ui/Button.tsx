import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  withGlow?: boolean;
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  withGlow = false,
  children,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = 'relative px-4 py-2 text-sm rounded-lg transition-all duration-300';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-space-blue to-space-purple hover:opacity-90',
    secondary: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500'
  };
  const glowClasses = withGlow ? 'hover:shadow-[0_0_20px_rgba(156,107,255,0.5)]' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${glowClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;