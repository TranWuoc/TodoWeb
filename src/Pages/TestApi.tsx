import type { TodoItem } from '@/types/todo.type';
import { useEffect, useState } from 'react';
import { Label } from '../components/ui/label';
import formatDate from '@/utils/formatdate';
import { getTodos } from '@/services/todoService';

function TestApi() {
    const [data, setData] = useState<TodoItem[]>([]);

    useEffect(() => {
        getTodos().then(setData);
    }, []);

    return (
        <div>
            <ul>
                {data.map((todo: TodoItem) => (
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
                ))}
            </ul>
        </div>
    );
}

export default TestApi;
