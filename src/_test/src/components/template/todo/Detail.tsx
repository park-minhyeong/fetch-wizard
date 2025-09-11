import { ReactNode } from "react";
import Button from "../../atom/Button";
import Card from "../../molecule/Card";

interface TodoDetailTemplateProps {
  title: string;
  children: ReactNode;
  onEdit?: () => void;
  isEditing?: boolean;
}

export default function TodoDetailTemplate({ 
  title, 
  children, 
  onEdit,
  isEditing = false 
}: TodoDetailTemplateProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {onEdit && (
              <Button 
                variant="primary"
                onClick={onEdit}
              >
                {isEditing ? "취소" : "수정"}
              </Button>
            )}
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
}
