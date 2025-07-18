import { deleteHardTodo, getTodosDeleted, restoreTodo } from '@/services/todoService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { TodoItem } from '../types/todo.type';
import formatDate from '../utils/formatdate';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

function Restore() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['todosdeleted'],
        queryFn: getTodosDeleted,
        select: (res) => res.data,
    });

    const handleRestoreMutation = useMutation({
        mutationFn: ({ id, todo }: { id: number; todo: TodoItem }) => restoreTodo(id, todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todosdeleted'] }),
        onError: (error) => console.log(error),
    });

    const handleHardDeletemutation = useMutation({
        mutationFn: (id: number) => deleteHardTodo(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todosdeleted'] }),
        onError: (error) => console.log(error),
    });

    const handleRestore = async (id: number, todo: TodoItem) => {
        handleRestoreMutation.mutate({
            id,
            todo,
        });
    };

    const handleHardDelete = async (id: number) => {
        handleHardDeletemutation.mutate(id);
    };

    return (
        <div className="m-[20px] flex h-[700px] w-[900px] flex-col items-center rounded-3xl border-2 bg-gray-300">
            <Label htmlFor="title" className="mt-8 flex justify-center text-5xl">
                Restore
            </Label>
            <div className="mt-14 flex h-[500px] w-[700px] flex-col gap-3 overflow-y-auto rounded-2xl border-2 bg-gray-100 p-2">
                {data?.map((todo: TodoItem) => (
                    <div
                        key={todo.id}
                        className="flex h-[70px] min-h-[70px] w-full flex-col justify-center rounded-2xl border-2 border-red-600 bg-zinc-300"
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
                            <div>
                                <Button
                                    variant="outline"
                                    className="mr-3 cursor-pointer"
                                    onClick={() => handleRestore(todo.id, todo)}
                                >
                                    Restore
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="mr-3 cursor-pointer"
                                    onClick={() => handleHardDelete(todo.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Restore;
