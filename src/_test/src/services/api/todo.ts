import { Todo } from "../../interfaces/Todo";
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
async function post(url: string, data: Partial<Todo>): Promise<Todo> {
	const response = await api.post<Partial<Todo>, Todo>(url, data);
	return response.data;
}

// PUT 메서드
async function put(url: string, data: Todo): Promise<Todo> {
	const response = await api.put<Todo, Todo>(url, data);
	return response.data;
}

// PATCH 메서드
async function patch(url: string, data: Partial<Todo>): Promise<Todo> {
	const response = await api.patch<Partial<Todo>, Todo>(url, data);
	return response.data;
}

// DELETE 메서드
async function deleteTodo(url: string): Promise<void> {
	await api.delete(url);
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