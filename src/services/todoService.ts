import type { TodoItem } from '@/todo.type';

const URL = 'http://localhost:1337/api/todo-webs';

export async function getTodos(): Promise<TodoItem[]> {
    const response = await fetch(URL);
    const json = await response.json();
    return (json.data || [])
        .map((item: any) => ({
            id: item.id,
            ...item.attributes,
            deadline: item.attributes.deadline ? new Date(item.attributes.deadline) : null,
            createAt: item.attributes.createdAt ? new Date(item.attributes.createdAt) : null,
        }))
        .sort((a: any, b: any) => b.id - a.id);
}

export async function getTodosDeleted(): Promise<TodoItem[]> {
    const response = await fetch(URL + '/deleted');
    const json = await response.json();
    return json.data;
}

export async function createTodo(todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: todo }),
    });
    const json = await response.json();
    return json.data;
}
export async function restoreTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetch(URL + '/' + id + '/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: todo }),
    });
    const json = await response.json();
    return json.data;
}

export async function updateTodo(id: number, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetch(URL + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: todo }),
    });
    const json = await response.json();
    return json.data;
}

export async function deleteTodo(id: number): Promise<void> {
    await fetch(URL + '/' + id, {
        method: 'DELETE',
    });
}
