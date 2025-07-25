import { useGetTodoList } from '@/hooks/getTodoList';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import formatDate from '../utils/formatdate';

function Statistic() {
    const { data: todoList } = useGetTodoList();
    return (
        <div className="bg-accent flex h-[700px] w-[900px] items-center justify-center rounded-3xl border-2 p-3">
            <div className="flex flex-col items-center justify-center gap-5">
                <Label htmlFor="Thong ke" className="text-5xl">
                    Statistic
                </Label>
                <Separator />
                <div className="flex flex-row gap-5">
                    <div className="flex h-[300px] w-[420px] flex-col gap-5 overflow-y-auto">
                        <Label className="text-green-500"> Todo is completed </Label>
                        {todoList?.filter((todo) => todo.isCompleted).length === 0 ? (
                            <Label>No todo</Label>
                        ) : (
                            todoList
                                ?.filter((todo) => todo.isCompleted)
                                .map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="flex h-[70px] min-h-[70px] w-[400px] flex-col justify-center rounded-2xl border-2 border-green-500 bg-zinc-300"
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
                        <Label className="text-red-600"> Todos were out of date </Label>
                        {todoList?.filter((todo) => todo.dueDate == true).length === 0 ? (
                            <Label>No todo</Label>
                        ) : (
                            todoList
                                ?.filter((todo) => todo.dueDate == true)
                                .map((todo) => (
                                    <div
                                        key={todo.id}
                                        className="flex h-[70px] min-h-[70px] w-[400px] flex-col justify-center rounded-2xl border-2 border-red-600 bg-zinc-300"
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
    );
}

export default Statistic;
