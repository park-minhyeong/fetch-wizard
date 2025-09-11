import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface InfoBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export default function InfoBox({ 
  children, 
  variant = 'info',
  className 
}: InfoBoxProps) {
  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  };

  return (
    <div className={cn(
      'p-4 rounded-lg border',
      variantStyles[variant],
      className
    )}>
      {children}
    </div>
  );
}
