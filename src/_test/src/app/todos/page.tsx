import { useEffect } from 'react'
import useTodo from '../../hooks/useTodo'
import TodoPageTemplate from '../../components/template/TodoPageTemplate'
import TodoList from '../../components/organism/TodoList'

export default function TodosPage() {
  const { todos, loading, error, getTodos, createTodo, deleteTodo } = useTodo()

  useEffect(() => {
    getTodos()
  }, [getTodos])

  const handleCreateTodo = async () => {
    try {
      await createTodo({
        title: '새로운 Todo',
        completed: false,
        userId: 1
      })
    } catch (err) {
      console.error('Todo 생성 실패:', err)
    }
  }

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id)
    } catch (err) {
      console.error('Todo 삭제 실패:', err)
    }
  }

  return (
    <TodoPageTemplate
      title="Todo 목록"
      onCreateTodo={handleCreateTodo}
    >
      <TodoList
        todos={todos}
        loading={loading}
        error={error}
        onDelete={handleDeleteTodo}
      />
    </TodoPageTemplate>
  )
}
