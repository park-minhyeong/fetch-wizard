import { useState } from "react";
import { Todo } from "../../interfaces/Todo";
import Button from "../atom/Button";
import Input from "../atom/Input";
import FormField from "../molecule/FormField";
import StatusBadge from "../molecule/StatusBadge";
import TitleBox from "../molecule/TitleBox";

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: Partial<Todo>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function TodoForm({ 
  todo, 
  onSubmit, 
  onCancel, 
  loading = false 
}: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title || "");
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      completed,
      userId: todo?.userId || 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="제목" required>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo 제목을 입력하세요"
          required
        />
      </FormField>

      <FormField label="상태">
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="mr-2"
            />
            <span>완료됨</span>
          </label>
          <StatusBadge 
            status={completed ? "completed" : "pending"} 
            size="sm" 
          />
        </div>
      </FormField>

      {todo && (
        <>
          <TitleBox title="ID">
            <p className="text-gray-600">{todo.id}</p>
          </TitleBox>
          <TitleBox title="사용자 ID">
            <p className="text-gray-600">{todo.userId}</p>
          </TitleBox>
        </>
      )}

      <div className="flex gap-2 mt-6">
        <Button 
          type="submit" 
          variant="success"
          disabled={loading || !title.trim()}
        >
          {loading ? "저장 중..." : "저장"}
        </Button>
        <Button 
          type="button" 
          variant="secondary"
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
