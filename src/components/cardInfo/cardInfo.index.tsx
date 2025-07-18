import type { TodoItem } from '../../types/todo.type';
import { Button } from '../ui/button';
import formatDate from '../../utils/formatdate';
import { Input } from '../ui/input';
type CardInfoProps = {
    todo: TodoItem;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
};

function CardInfo({ todo, onToggle, onDelete, onUpdate }: CardInfoProps) {
    return (
        <div
            className="bg-gra relative flex h-[120px] w-full flex-row rounded-3xl"
            style={{ backgroundColor: todo.dueDate ? '#F1C40F' : '#343148' }}
        >
            <Input
                type={'checkbox'}
                checked={todo.isCompleted}
                className="ml-2.5 mt-10 h-8 w-8"
                onChange={() => onToggle(todo.id)}
                style={{ accentColor: '#f3f4f6' }}
            />
            <div className="flex flex-col">
                <span
                    id="todo"
                    className={`w-[300px] overflow-hidden truncate whitespace-nowrap p-3 ${todo.isCompleted ? 'text-red-600 line-through' : 'text-white'}`}
                >
                    {todo.title}
                </span>
                <div className="flex gap-3 p-3">
                    <span className="text-white">
                        At: <br />
                        {formatDate(todo.createdAt)}
                    </span>
                    <span className="w-[160px] text-red-400">
                        DeadLine:
                        <br />
                        {todo.deadline ? formatDate(todo.deadline) : 'No Deadline'}
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-3">
                <Button className="cursor-pointer" variant="destructive" onClick={() => onDelete(todo.id)}>
                    Delete
                </Button>
                <Button className="cursor-pointer" variant="update" onClick={() => onUpdate(todo.id)}>
                    Update
                </Button>
            </div>
        </div>
    );
}

export default CardInfo;
