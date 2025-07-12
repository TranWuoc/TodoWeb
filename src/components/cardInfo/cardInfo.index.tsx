import type { TodoItem } from '../../todo.type';
import { Button } from '../ui/button';
import formatDate from '../../utils/formatdate';
import { Input } from '../ui/input';
type CardInfoProps = {
    todo: TodoItem;
    onToggle: (documentId: string) => void;
    onDelete: (documentId: string) => void;
};

function CardInfo({ todo, onToggle, onDelete }: CardInfoProps) {
    return (
        <div
            className="bg-gra relative flex h-[120px] w-full flex-row rounded-3xl"
            style={{ backgroundColor: todo.dueDate ? '#F1C40F' : '#343148' }}
        >
            <Input
                type={'checkbox'}
                checked={todo.isCompleted}
                className="ml-2.5 mt-10 h-8 w-8"
                onChange={() => onToggle(todo.documentId)}
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
                        {formatDate(todo.createAt)}
                    </span>
                    <span className="w-[160px] text-red-400">
                        DeadLine:
                        <br />
                        {todo.deadline ? formatDate(todo.deadline) : 'No Deadline'}
                    </span>
                </div>
            </div>
            <Button
                className="m-[10px] mt-[50px] cursor-pointer"
                variant="destructive"
                onClick={() => onDelete(todo.documentId)}
            >
                Delete
            </Button>
        </div>
    );
}

export default CardInfo;
