import type { TodoItem } from '../../todo.type';

type CardInfoProps = {
    todo: TodoItem;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

function CardInfo({ todo, onToggle, onDelete }: CardInfoProps) {
    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const mins = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${mins}`;
    }

    return (
        <div
            className="relative flex h-[120px] w-full flex-row rounded-3xl"
            style={{ backgroundColor: todo.dueDate ? '#317773' : '#96351F' }}
        >
            <input
                type={'checkbox'}
                checked={todo.isCompleted}
                className="ml-2.5 mt-10 h-8 w-8"
                onChange={() => onToggle(todo.id)}
                style={{ accentColor: '#DBB98F' }}
            />
            <div className="flex flex-col">
                <span
                    id="todo"
                    className={`w-[300px] overflow-hidden truncate whitespace-nowrap p-3 text-teal-300 ${todo.isCompleted ? 'line-through' : ''}`}
                >
                    {todo.title}
                </span>
                <div className="flex gap-3 p-3">
                    <span>At: {formatDate(todo.createAt)}</span>
                    <span className="text-red-400">
                        DeadLine:{todo.deadline ? formatDate(todo.deadline) : 'No Deadline'}
                    </span>
                </div>
            </div>
            <button
                className="m-[10px] mt-[50px] h-[30px] w-[100px] cursor-pointer rounded-xl"
                style={{ backgroundColor: '#DBB98F' }}
                onClick={() => onDelete(todo.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default CardInfo;
