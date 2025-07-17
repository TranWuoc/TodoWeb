import type { TodoItem } from '@/types/todo.type';
import axiosClient from '../utils/axiosClient';

export async function getTodos(): Promise<TodoItem[]> {
    const response = await axiosClient.get('/todo-webs');
    const res = response.data;
    const userId = Number(localStorage.getItem('userId'));
    return (res.data || [])
        .filter((item: any) => item && item.users_permissions_user && item.users_permissions_user.id === userId)
        .map((item: any) => ({
            id: item.id,
            title: item.title,
            deadline: item.deadline ? new Date(item.deadline) : null,
            isCompleted: item.isCompleted,
            dueDate: item.dueDate,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
        }))
        .sort((a: any, b: any) => b.id - a.id);
}

export async function getTodosDeleted(): Promise<TodoItem[]> {
    const response = await axiosClient.get('/todo-webs/deleted');
    const res = response.data;
    return res.data;
}

export async function createTodo(todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axiosClient.post('/todo-webs', { data: todo });
    const res = await response.data;
    return res.data;
}

export async function restoreTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axiosClient.post(`todo-webs/${id}/restore`, { data: todo });
    const res = await response.data;
    return res.data;
}

export async function updateTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axiosClient.put(`/todo-webs/${id}`, { data: todo });
    const res = await response.data;
    return res.data;
}

export async function deleteTodo(id: number): Promise<void> {
    await axiosClient.delete(`todo-webs/${id}`);
}

export async function deleteHardTodo(id: number) {
    await axiosClient.delete(`todo-wes/${id}/hard-delete`);
}
