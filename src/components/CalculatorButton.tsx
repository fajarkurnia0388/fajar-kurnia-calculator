
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type: 'number' | 'operator' | 'function' | 'clear';
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  children,
  onClick,
  type,
  className = ''
}) => {
  const getButtonStyles = () => {
    const baseStyles = 'h-16 rounded-2xl font-medium text-lg transition-all duration-200 transform active:scale-95 shadow-lg';
    
    switch (type) {
      case 'number':
        return cn(
          baseStyles,
          'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600 shadow-slate-900/50',
          className
        );
      case 'operator':
        return cn(
          baseStyles,
          'bg-orange-500 text-white hover:bg-orange-400 border border-orange-400 shadow-orange-900/50',
          className
        );
      case 'function':
        return cn(
          baseStyles,
          'bg-slate-600 text-white hover:bg-slate-500 border border-slate-500 shadow-slate-900/50',
          className
        );
      case 'clear':
        return cn(
          baseStyles,
          'bg-slate-500 text-white hover:bg-slate-400 border border-slate-400 shadow-slate-900/50',
          className
        );
      default:
        return cn(baseStyles, className);
    }
  };

  return (
    <button
      onClick={onClick}
      className={getButtonStyles()}
    >
      <span className="drop-shadow-sm">
        {children}
      </span>
    </button>
  );
};

export default CalculatorButton;
