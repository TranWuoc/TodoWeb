import { useState } from 'react';
import { Label } from './components/ui/label';
import type { TodoItem } from './todo.type';
import { Separator } from './components/ui/separator';
import formatDate from './components/formatdate';
function Statistic() {
    const [todos] = useState<TodoItem[]>(() => {
        const storeTodos = localStorage.getItem('todos');
        if (storeTodos) {
            const param = JSON.parse(storeTodos);
            return param.map((todo: any) => ({
                ...todo,
                createAt: new Date(todo.createAt),
                deadline: todo.deadline ? new Date(todo.deadline) : null,
            }));
        } else {
            return [];
        }
    });

    return (
        <div className="mt-[50px] flex items-center justify-center p-[20px]">
            <div className="bg-accent flex h-[700px] w-[900px] items-center justify-center rounded-3xl border-2 p-3">
                <div className="flex flex-col items-center justify-center gap-5">
                    <Label htmlFor="Thong ke" className="text-5xl">
                        Statistic
                    </Label>
                    <Separator />
                    <div className="flex flex-row gap-5">
                        <div className="flex h-[300px] w-[420px] flex-col gap-5 overflow-y-auto">
                            <Label> Todo is completed </Label>
                            {todos.filter((todo) => todo.isCompleted).length === 0 ? (
                                <Label>No todo</Label>
                            ) : (
                                todos
                                    .filter((todo) => todo.isCompleted)
                                    .map((todo) => (
                                        <div
                                            key={todo.id}
                                            className="flex h-[70px] min-h-[70px] w-[400px] flex-col justify-center rounded-2xl border-2 bg-zinc-300"
                                        >
                                            <div className="ml-[20px] flex flex-col gap-2">
                                                <Label htmlFor="todo">Todo: {todo.title}</Label>
                                                <Label htmlFor="time">
                                                    Deadline:
                                                    {todo.deadline ? formatDate(todo.deadline) : 'No DeadLine'}
                                                </Label>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                        <div className="flex h-[300px] w-[420px] flex-col gap-5 overflow-y-auto">
                            <Label> Todo isn't completed </Label>
                            {todos.filter((todo) => !todo.isCompleted).length === 0 ? (
                                <Label>No todo</Label>
                            ) : (
                                todos
                                    .filter((todo) => !todo.isCompleted)
                                    .map((todo) => (
                                        <div
                                            key={todo.id}
                                            className="flex h-[70px] min-h-[70px] w-[400px] flex-col justify-center rounded-2xl border-2 bg-zinc-300"
                                        >
                                            <div className="ml-[20px] flex flex-col gap-2">
                                                <Label htmlFor="todo">Todo: {todo.title}</Label>
                                                <Label htmlFor="time">
                                                    Deadline:
                                                    {todo.deadline ? formatDate(todo.deadline) : 'No Deadline'}
                                                </Label>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
