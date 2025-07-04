import { useState } from 'react';
import type { Todo } from './type';

function App() {
    const [todo, setTodo] = useState<Todo[]>([
        { id: 1, title: 'Todo 1', completed: true },
        { id: 2, title: 'Todo 2', completed: false },
        { id: 3, title: 'Todo 3', completed: false },
    ]);

    const handleUpdateStatus = (id: number) => {
        const newTodo = todo.map((todoItem) => {
            if (todoItem.id !== id) {
                return todoItem;
            }

            return {
                ...todoItem,
                completed: !todoItem.completed,
            };
        });

        setTodo(newTodo);
    };

    const handleDelete = (id: number) => {
        const newTodo = todo.filter((todoItem) => {
            return todoItem.id !== id;
        });

        setTodo(newTodo);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '50px',
            }}
        >
            <div>
                <ul>
                    {todo.map((item) => {
                        return (
                            <li key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => {
                                        handleUpdateStatus(item.id);
                                    }}
                                />
                                <span
                                    style={{
                                        marginLeft: 8,
                                        textDecoration: item.completed ? 'line-through' : 'none',
                                    }}
                                >
                                    {item.title}
                                </span>

                                <button
                                    style={{ marginLeft: 8 }}
                                    onClick={() => {
                                        handleDelete(item.id);
                                    }}
                                >
                                    &times;
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <button>Add todo</button>
            </div>
        </div>
    );
}

export default App;
