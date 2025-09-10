import { Todo, TodoCreate, TodoUpdate } from "../../interfaces/Todo";
import http from "../config";

const api = http.api();

interface ReadOption {
	id: number;
}

// GET 메서드 오버로드
async function get(): Promise<Todo[]>;
async function get(props: {id: number}): Promise<Todo|undefined>;
async function get(props?: Partial<ReadOption>): Promise<Todo[]|Todo|undefined> {
	if(props?.id){
		const response = await api.get<Todo>(`/todos/${props.id}`);
		return response.data;
	}
	const response = await api.get<Todo[]>("/todos");
	return response.data;
}

// POST 메서드
async function post(data: TodoCreate) {
	const response = await api.post<TodoCreate, Todo>('/todos', data);
	return response.data;
}

// PUT 메서드
async function put(id:number, data: TodoCreate) {
	const response = await api.put<TodoCreate, Todo>(`/todos/${id}`, data);
	return response.data;
}

// PATCH 메서드
async function patch(id:number, data: TodoUpdate) {
	const response = await api.patch<TodoUpdate, Todo>(`/todos/${id}`, data);
	return response.data;
}

// DELETE 메서드
async function deleteTodo(id: number) {
	await api.delete(`/todos/${id}`);
}

// API 객체 반환
const todoApi = {
	get,
	post,
	put,
	patch,
	delete: deleteTodo
};

export default todoApi;