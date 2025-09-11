import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo, TodoCreate, TodoUpdate } from '../interfaces/Todo'
import todoApi from '../services/api/todo'

// Query Keys
const QUERY_KEYS = {
  todos: ['todos'] as const,
  todo: (id: number) => ['todos', id] as const,
  todosWithParams: (params?: { page?: number; limit?: number }) => ['todos', 'list', params] as const,
}

export default function useTodo(id?: number) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const queryClient = useQueryClient()

  // 모든 Todo 조회
  const {
    data: todos = [],
    isLoading: todosLoading,
    error: todosError,
    refetch: getTodos
  } = useQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: async () => {
      const data = await todoApi.get()
      return Array.isArray(data) ? data : []
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  })

  const {
    data: todo,
    isLoading: todoLoading,
    error: todoError,
    refetch: getTodo
  } = useQuery({
    queryKey: QUERY_KEYS.todo(id as number),
    queryFn: async () => {
      const data = await todoApi.get({ id: id as number })
      return data as Todo
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })


  // Todo 생성 Mutation
  const createTodoMutation = useMutation({
    mutationFn: async (todoData: TodoCreate) => {
      return await todoApi.post(todoData)
    },
    onSuccess: (newTodo) => {
      // todos 목록 업데이트
      queryClient.setQueryData(QUERY_KEYS.todos, (old: Todo[] = []) => [...old, newTodo])
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos })
    },
    onError: (error) => {
      console.error('Todo 생성 실패:', error)
    }
  })

  // Todo 수정 (PUT) Mutation: 멱등성 보장
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TodoCreate }) => {
      return await todoApi.put(id, data)
    },
    onSuccess: (updatedTodo, { id }) => {
      // todos 목록 업데이트
      queryClient.setQueryData(QUERY_KEYS.todos, (old: Todo[] = []) => 
        old.map(todo => todo.id === id ? updatedTodo : todo)
      )
      // 특정 todo 쿼리 업데이트
      queryClient.setQueryData(QUERY_KEYS.todo(id), updatedTodo)
      // selectedTodo 업데이트
      if (selectedTodo?.id === id) {
        setSelectedTodo(updatedTodo)
      }
    },
    onError: (error) => {
      console.error('Todo 수정 실패:', error)
    }
  })

  // Todo 부분 수정 (PATCH) Mutation
  const patchTodoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TodoUpdate }) => {
      return await todoApi.patch(id, data)
    },
    onSuccess: (patchedTodo, { id }) => {
      // todos 목록 업데이트
      queryClient.setQueryData(QUERY_KEYS.todos, (old: Todo[] = []) => 
        old.map(todo => todo.id === id ? patchedTodo : todo)
      )
      // 특정 todo 쿼리 업데이트
      queryClient.setQueryData(QUERY_KEYS.todo(id), patchedTodo)
      // selectedTodo 업데이트
      if (selectedTodo?.id === id) {
        setSelectedTodo(patchedTodo)
      }
    },
    onError: (error) => {
      console.error('Todo 부분 수정 실패:', error)
    }
  })

  // Todo 삭제 Mutation
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      await todoApi.delete(id)
      return id
    },
    onSuccess: (deletedId) => {
      // todos 목록에서 제거
      queryClient.setQueryData(QUERY_KEYS.todos, (old: Todo[] = []) => 
        old.filter(todo => todo.id !== deletedId)
      )
      // 특정 todo 쿼리 제거
      queryClient.removeQueries({ queryKey: QUERY_KEYS.todo(deletedId) })
      // selectedTodo 초기화
      if (selectedTodo?.id === deletedId) {
        setSelectedTodo(null)
      }
    },
    onError: (error) => {
      console.error('Todo 삭제 실패:', error)
    }
  })

  // 편의 함수들
  const createTodo = (todoData: TodoCreate) => createTodoMutation.mutate(todoData)
  const updateTodo = (id: number, todoData: TodoCreate) => updateTodoMutation.mutate({ id, data: todoData })
  const patchTodo = (id: number, todoData: TodoUpdate) => patchTodoMutation.mutate({ id, data: todoData })
  const deleteTodo = (id: number) => deleteTodoMutation.mutate(id)

  // 로딩 상태 통합
  const loading = todosLoading || todoLoading || 
    createTodoMutation.isPending || 
    updateTodoMutation.isPending || 
    patchTodoMutation.isPending || 
    deleteTodoMutation.isPending

  // 에러 상태 통합
  const error = todosError?.message ||  todoError?.message || 
    createTodoMutation.error?.message || 
    updateTodoMutation.error?.message || 
    patchTodoMutation.error?.message || 
    deleteTodoMutation.error?.message || 
    null

  return {
    // 상태
    todos,
    todo,
    selectedTodo,
    loading,
    error,
    
    // 액션
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    patchTodo,
    deleteTodo,
    setSelectedTodo,
    
    // Mutation 상태
    createTodoMutation,
    updateTodoMutation,
    patchTodoMutation,
    deleteTodoMutation,
    
    // 유틸리티
    clearError: () => {
      queryClient.clear()
    },
    clearTodos: () => {
      queryClient.setQueryData(QUERY_KEYS.todos, [])
    },
    refetchTodos: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos })
    }
  }
}