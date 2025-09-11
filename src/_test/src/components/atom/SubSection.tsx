import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface SubSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SubSection({ 
  title, 
  children, 
  className 
}: SubSectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        {title}
      </h3>
      {children}
    </div>
  );
}
