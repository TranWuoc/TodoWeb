import type { TodoItem } from '@/types/todo.type';
import axios from 'axios';

const URL = 'http://localhost:1337/api/todo-webs';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
}

export async function getTodos(): Promise<TodoItem[]> {
    const response = await axios.get(URL, getAuthHeaders());
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
    const response = await axios.get(URL + '/deleted', getAuthHeaders());
    const res = response.data;
    return res.data;
}

export async function createTodo(todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axios.post(URL, { data: todo }, getAuthHeaders());
    console.log(response);
    const res = await response.data;
    return res.data;
}

export async function restoreTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axios.post(URL + '/' + id + '/restore', { data: todo }, getAuthHeaders());
    const res = await response.data;
    return res.data;
}

export async function updateTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axios.put(URL + '/' + id, { data: todo }, getAuthHeaders());
    const res = await response.data;
    return res.data;
}

export async function deleteTodo(id: number): Promise<void> {
    await axios.delete(URL + '/' + id, getAuthHeaders());
}

export async function deleteHardTodo(id: number) {
    await axios.delete(URL + '/' + id + '/hard-delete', getAuthHeaders());
}
