import { Link, useNavigate } from "react-router-dom";
import { Todo } from "../../interfaces/Todo";
import Button from "../atom/Button";
import StatusBadge from "../molecule/StatusBadge";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
}

export default function TodoCard({ todo, onDelete, onEdit }: TodoCardProps) {
  const router = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>ID: {todo.id}</span>
            <span>사용자: {todo.userId}</span>
            <StatusBadge 
              status={todo.completed ? "completed" : "pending"} 
              size="sm" 
            />
          </div>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onEdit(todo.id)}
            >
              수정
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => router(`/todos/${todo.id}`)}
          >
            상세
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(todo.id)}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
