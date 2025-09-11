import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface SectionProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ 
  title, 
  icon, 
  children, 
  className 
}: SectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}
