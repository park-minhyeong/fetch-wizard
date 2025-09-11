import { Todo } from "../../interfaces/Todo";
import TodoCard from "./TodoCard";
import LoadingSpinner from "../atom/Loading.Spinner";

interface TodoListProps {
  todos: Todo[];
  loading?: boolean;
  error?: string | null;
  onDelete: (id: number) => void;
  onEdit?: (id: number) => void;
}

export default function TodoList({ 
  todos, 
  loading = false, 
  error, 
  onDelete, 
  onEdit 
}: TodoListProps) {
  if (loading) {
    return <LoadingSpinner text="Todo 목록을 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">에러: {error}</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">Todo가 없습니다.</p>
        <p className="text-sm mt-2">새 Todo를 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
