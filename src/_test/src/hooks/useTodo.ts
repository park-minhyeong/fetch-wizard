import { useState, useCallback } from 'react'
import { Todo } from '../interfaces/Todo'
import todoApi from '../services/api/todo'

export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 모든 Todo 조회
  const getTodos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await todoApi.get()
      setTodos(Array.isArray(data) ? data : [])
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // 특정 Todo 조회
  const getTodo = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      const data = await todoApi.get({ id })
      setSelectedTodo(data as Todo)
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Todo 생성
  const createTodo = useCallback(async (todoData: Partial<Todo>) => {
    setLoading(true)
    setError(null)
    try {
      const newTodo = await todoApi.post('/todos', todoData)
      setTodos(prev => [...prev, newTodo])
      return newTodo
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Todo 수정 (PUT)
  const updateTodo = useCallback(async (id: number, todoData: Todo) => {
    setLoading(true)
    setError(null)
    try {
      const updatedTodo = await todoApi.put(`/todos/${id}`, todoData)
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo))
      if (selectedTodo?.id === id) {
        setSelectedTodo(updatedTodo)
      }
      return updatedTodo
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [selectedTodo])

  // Todo 부분 수정 (PATCH)
  const patchTodo = useCallback(async (id: number, todoData: Partial<Todo>) => {
    setLoading(true)
    setError(null)
    try {
      const patchedTodo = await todoApi.patch(`/todos/${id}`, todoData)
      setTodos(prev => prev.map(todo => todo.id === id ? patchedTodo : todo))
      if (selectedTodo?.id === id) {
        setSelectedTodo(patchedTodo)
      }
      return patchedTodo
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [selectedTodo])

  // Todo 삭제
  const deleteTodo = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await todoApi.delete(`/todos/${id}`)
      setTodos(prev => prev.filter(todo => todo.id !== id))
      if (selectedTodo?.id === id) {
        setSelectedTodo(null)
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [selectedTodo])

  return {
    // 상태
    todos,
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
    
    // 유틸리티
    clearError: () => setError(null),
    clearTodos: () => setTodos([])
  }
}