export interface Todo{
	userId: number,
	id: number,	
	title: string,
	completed: boolean
}
const todoAutoSetKeys=['id'] as const;
type TodoAutoSetKey=typeof todoAutoSetKeys[number];
export interface TodoCreate extends Omit<Todo, TodoAutoSetKey>{}
export interface TodoUpdate extends Partial<TodoCreate>{}
