import type { TodoItem } from '@/todo.type';

export function loadTodos(key: string): TodoItem[] {
    const storeTodo = localStorage.getItem(key);
    if (storeTodo) {
        const prased = JSON.parse(storeTodo);
        return prased.map((todo: any) => ({
            ...todo,
            createAt: new Date(todo.createAt),
            deadline: todo.deadline ? new Date(todo.deadline) : null,
        }));
    }
    return [];
}

export function saveTodos(key: string, todos: TodoItem[]) {
    localStorage.setItem(key, JSON.stringify(todos));
}
