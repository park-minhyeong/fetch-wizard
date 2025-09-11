import { ReactNode } from "react";
import Button from "../../atom/Button";

interface TodoPageTemplateProps {
  title: string;
  children: ReactNode;
  onCreateTodo?: () => void;
  showCreateButton?: boolean;
}

export default function TodoPageTemplate({ 
  title, 
  children, 
  onCreateTodo,
  showCreateButton = true 
}: TodoPageTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {showCreateButton && onCreateTodo && (
          <Button onClick={onCreateTodo}>
            새 Todo 추가
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
