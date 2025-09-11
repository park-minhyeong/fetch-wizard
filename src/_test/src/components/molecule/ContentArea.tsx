import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface ContentAreaProps {
  children: ReactNode;
  className?: string;
}

export default function ContentArea({ 
  children, 
  className 
}: ContentAreaProps) {
  return (
    <div className={cn(
      'flex-1 p-8 overflow-y-auto',
      className
    )}>
      <div className="max-w-4xl">
        {children}
      </div>
    </div>
  );
}
