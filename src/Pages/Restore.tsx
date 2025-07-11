import { useEffect, useState } from 'react';
import { Label } from '../components/ui/label';
import type { TodoItem } from '../todo.type';
import formatDate from '../utils/formatdate';
import { Button } from '../components/ui/button';
import { loadTodos, saveTodos } from '../utils/todoStorage';
import { createTodo } from '@/services/todoService';

function Restore() {
    const [todosdelete, setTodoDelete] = useState<TodoItem[]>(loadTodos('tododelete'));

    useEffect(() => {
        saveTodos('tododelete', todosdelete);
    }, [todosdelete]);

    const handleRestore = async (documentId: string) => {
        const todoToRestore = todosdelete.find((todo) => todo.documentId == documentId);
        if (!todoToRestore) return;

        await createTodo({
            ...todoToRestore,
            documentId: undefined,
        });

        setTodoDelete((prev) =>
            prev.filter((todo) => {
                if (todo.documentId !== documentId) return todo;
            }),
        );
    };

    return (
        <div className="m-[20px] flex h-[700px] w-[900px] flex-col items-center rounded-3xl border-2 bg-gray-300">
            <Label htmlFor="title" className="mt-8 flex justify-center text-5xl">
                Restore
            </Label>
            <div className="mt-14 flex h-[500px] w-[700px] flex-col gap-3 overflow-y-auto rounded-2xl border-2 bg-gray-100 p-2">
                {todosdelete.map((todo) => (
                    <div
                        key={todo.documentId}
                        className="flex h-[70px] min-h-[70px] w-full flex-col justify-center rounded-2xl border-2 bg-zinc-300"
                    >
                        <div className="flex justify-between">
                            <div className="ml-[20px] flex flex-col gap-2">
                                <Label
                                    htmlFor="tododelete"
                                    className={todo.isCompleted ? 'text-red-600 line-through' : ''}
                                >
                                    Todo: {todo.title}
                                </Label>
                                <Label htmlFor="time">
                                    Deadline:
                                    {todo.deadline ? formatDate(todo.deadline) : 'No DeadLine'}
                                </Label>
                            </div>
                            <Button className="mr-3" onClick={() => handleRestore(todo.documentId)}>
                                Restore
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Restore;
