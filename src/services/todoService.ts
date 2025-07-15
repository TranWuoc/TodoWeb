import type { TodoItem } from '@/types/todo.type';
import axios from 'axios';

const URL = 'http://localhost:1337/api/todo-webs';

export async function getTodos(): Promise<TodoItem[]> {
    const response = await axios.get(URL);
    const res = response.data;
    return (res.data || [])
        .map((item: any) => ({
            id: item.id,
            ...item.attributes,
            deadline: item.attributes.deadline ? new Date(item.attributes.deadline) : null,
            createAt: item.attributes.createdAt ? new Date(item.attributes.createdAt) : null,
        }))
        .sort((a: any, b: any) => b.id - a.id);
}

export async function getTodosDeleted(): Promise<TodoItem[]> {
    const response = await axios.get(URL + '/deleted');
    const res = response.data;
    return res.data;
}

export async function createTodo(todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axios.post(
        URL,
        { data: todo },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    console.log(response);
    const res = await response.data;
    return res.data;
}

export async function restoreTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axios.post(
        URL + '/' + id + '/restore',
        { data: todo },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    const res = await response.data;
    return res.data;
}

export async function updateTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await axios.put(
        URL + '/' + id,
        { data: todo },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
    const res = await response.data;
    return res.data;
}

export async function deleteTodo(id: number): Promise<void> {
    await axios.delete(URL + '/' + id);
}

export async function deleteHardTodo(id: number) {
    await axios.delete(URL + '/' + id + '/hard-delete');
}
