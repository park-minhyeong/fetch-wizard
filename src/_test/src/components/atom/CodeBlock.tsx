import { ReactNode } from 'react';
import { cn } from 'fast-jsx/util';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  language?: string;
}

export default function CodeBlock({ 
  children, 
  className,
  language = 'typescript' 
}: CodeBlockProps) {
  return (
    <div className={cn(
      'bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto',
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {language}
        </span>
        <button 
          onClick={() => navigator.clipboard.writeText(children?.toString() || '')}
          className="text-gray-400 hover:text-gray-200 transition-colors text-xs"
        >
          복사
        </button>
      </div>
      <pre className="text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
