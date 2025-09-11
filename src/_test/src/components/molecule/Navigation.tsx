import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface NavigationItem {
  id: string;
  title: string;
  icon: string;
}

interface NavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  className?: string;
}

export default function Navigation({ 
  items, 
  activeItem, 
  onItemClick, 
  className 
}: NavigationProps) {
  return (
    <nav className={cn('space-y-2', className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            'w-full text-left px-4 py-3 rounded-lg transition-colors',
            activeItem === item.id
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <span className="mr-2">{item.icon}</span>
          {item.title}
        </button>
      ))}
    </nav>
  );
}
