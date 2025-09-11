import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useTodo from '../../../hooks/useTodo'
import TodoDetailTemplate from '../../../components/template/todo/Detail'
import TodoForm from '../../../components/organism/TodoForm'
import LoadingSpinner from '../../../components/atom/Loading.Spinner'
import StatusBadge from '../../../components/molecule/StatusBadge'
import TitleBox from '../../../components/molecule/TitleBox'
import Button from '../../../components/atom/Button'

export default function TodoDetailPage() {
  const { todoId } = useParams<{ todoId: string }>()
  const { todo, loading, error, getTodo, patchTodo } = useTodo(Number(todoId))
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (todoId) {
      getTodo()
    }
  }, [todoId, getTodo])

  const handleUpdateTodo = async (data: Partial<any>) => {
    if (!todoId || !todo) return
    try {
      await patchTodo(parseInt(todoId), {
        ...todo,
        ...data
      })
      setIsEditing(false)
    } catch (err) {
      console.error('Todo 수정 실패:', err)
    }
  }

  const handleToggleComplete = async () => {
    if (!todoId) return

    try {
      await patchTodo(parseInt(todoId), {
        completed: !todo?.completed
      })
    } catch (err) {
      console.error('Todo 상태 변경 실패:', err)
    }
  }
  if(!todoId) return null;
  if (loading && !todo) {
    return <LoadingSpinner text="Todo를 불러오는 중..." />;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">에러: {error}</div>
      </div>
    );
  }
  if (!todo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Todo를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <TodoDetailTemplate
      title="Todo 상세"
      onEdit={() => setIsEditing(!isEditing)}
      isEditing={isEditing}
    >
      {isEditing ? (
        <TodoForm
          todo={todo}
          onSubmit={handleUpdateTodo}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="space-y-4">
          <TitleBox title="제목">
            <p className="text-lg">{todo.title}</p>
          </TitleBox>

          <TitleBox title="상태">
            <div className="flex items-center gap-2">
              <StatusBadge 
                status={todo.completed ? "completed" : "pending"} 
                size="md" 
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleToggleComplete}
              >
                상태 변경
              </Button>
            </div>
          </TitleBox>

          <TitleBox title="ID">
            <p className="text-gray-600">{todo.id}</p>
          </TitleBox>

          <TitleBox title="사용자 ID">
            <p className="text-gray-600">{todo.userId}</p>
          </TitleBox>
        </div>
      )}
    </TodoDetailTemplate>
  )
}
