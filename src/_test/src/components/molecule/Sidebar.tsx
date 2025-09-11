import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface SidebarProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Sidebar({ 
  title, 
  children, 
  className 
}: SidebarProps) {
  return (
    <div className={cn(
      'w-64 bg-white backdrop-blur-sm overflow-y-auto sticky top-0 h-screen',
      className
    )}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
