import { useState } from 'react';
import Button from '../button/button.index';
import type { TodoItem } from '../../todo.type';

type PopupProps = {
    onClose: () => void;
    onAdd: (newTodo: TodoItem) => void;
};

function Popup({ onClose, onAdd }: PopupProps) {
    const [inputValue, setInputValue] = useState('');
    const [timeValue, setTimeValue] = useState<Date>(new Date());

    function formatTime(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    const handleSubmit = () => {
        const idTodo = Math.floor(Math.random() * 1000000);
        const now = new Date();
        const newTodo = {
            id: idTodo,
            title: inputValue,
            createAt: now,
            deadline: timeValue,
            isCompleted: false,
            dueDate: false,
        };
        onAdd(newTodo);
    };

    return (
        <div
            className="display:none z-1 fixed left-0 top-0 h-[100%] w-[100%] overflow-auto pt-[100px]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
            <div
                className="relative m-auto h-[300px] w-[50%] rounded-2xl border-solid p-[20px]"
                style={{ backgroundColor: '#D7C49E' }}
            >
                <span className="float-right cursor-pointer text-[28px] font-bold" onClick={onClose}>
                    &times;
                </span>
                <input
                    placeholder="Thêm mới công việc ..."
                    className="h-[50px] max-h-[100px] w-full rounded-2xl border-2 p-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="mt-4">
                    Deadline:
                    <input
                        value={formatTime(timeValue)}
                        onChange={(e) => setTimeValue(new Date(e.target.value))}
                        type="datetime-local"
                        className="rounded-2xl border-2 p-2"
                    />
                </div>

                <div className="absolute bottom-0 right-0 flex gap-2 p-2">
                    <Button
                        label="Delete"
                        type="danger"
                        onClick={() => {
                            setInputValue('');
                            setTimeValue(new Date());
                        }}
                    />
                    <Button label="Add" type="success" onClick={handleSubmit} disabled={!inputValue.trim()} />
                </div>
            </div>
        </div>
    );
}

export default Popup;
