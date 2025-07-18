import type { TodoItem } from '@/types/todo.type';
import http from '../utils/axiosClient';

export const getTodos = () => http.get<TodoItem[]>('todo-webs');

export const getTodo = (id: number) => http.get<TodoItem>(`todo-webs/${id}`);

export const getTodosDeleted = () => http.get<TodoItem[]>('todo-webs/deleted');

export const createTodo = (todo: Omit<TodoItem, 'id'>) => http.post<TodoItem>('todo-webs', { data: todo });

export const restoreTodo = (id: number, todo: TodoItem) =>
    http.post<TodoItem>(`todo-webs/${id}/restore`, { data: todo });

export const updateTodo = (id: number, todo: TodoItem) => http.put<TodoItem>(`todo-webs/${id}`, { data: todo });

export const deleteTodo = (id: number) => http.delete(`todo-webs/${id}`);

export const deleteHardTodo = (id: number) => http.delete(`todo-webs/${id}/hard-delete`);
