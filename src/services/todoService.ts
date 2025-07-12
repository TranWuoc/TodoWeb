import type { TodoItem } from '@/todo.type';

const URL = 'http://localhost:1337/api/todos';

export async function getTodos(): Promise<TodoItem[]> {
    const response = await fetch(URL);
    const json = await response.json();
    return (json.data || []).map((item: any) => ({
        ...item,
        deadline: item.deadline ? new Date(item.deadline) : null,
        createAt: new Date(item.createAt),
    }));
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

export async function updateTodo(documentId: string, todo: Partial<TodoItem>): Promise<TodoItem> {
    const response = await fetch(URL + '/' + documentId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: todo }),
    });
    const json = await response.json();
    return json.data;
}

export async function deleteTodo(documentId: string): Promise<void> {
    await fetch(URL + '/' + documentId, {
        method: 'DELETE',
    });
}
