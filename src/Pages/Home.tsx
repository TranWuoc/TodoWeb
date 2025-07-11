import { useEffect, useState } from 'react';
import '../App.css';
import searchIcon from '../assets/search.svg';
import CardInfo from '../components/cardInfo/cardInfo.index';
import Popup from '../components/popup/popop.index';
import type { TodoItem } from '../todo.type';
import { Button } from '../components/ui/button';
import { loadTodos, saveTodos } from '../utils/todoStorage';

function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [todos, setTodos] = useState<TodoItem[]>(loadTodos('todos'));
    const [tododelete, setTodoDelete] = useState<TodoItem[]>(loadTodos('tododelete'));

    useEffect(() => {
        saveTodos('todos', todos);
    }, [todos]);

    useEffect(() => {
        saveTodos('tododelete', tododelete);
    }, [tododelete]);

    useEffect(() => {
        setTodos((prev) =>
            prev.map((todo) => {
                const now = new Date().getTime();
                if (todo.deadline && todo.deadline.getTime() <= now) {
                    return { ...todo, dueDate: true };
                }
                return todo;
            }),
        );
    }, []);

    const handleOpenAddTodo = () => {
        setShowPopup(true);
    };

    const handleCloseAddTodo = () => {
        setShowPopup(false);
    };

    const handleAddTodo = (newTodo: TodoItem) => {
        setTodos([newTodo, ...todos]);
        setShowPopup(false);
    };
    console.log(todos);

    const toggleTodoState = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
            }),
        );
    };

    const handleDeleteTodo = (id: number) => {
        setTodos((prev) =>
            prev.filter((todo) => {
                if (todo.id !== id) {
                    return todo;
                }
            }),
        );
        const deletedTodo = todos.find((todo) => todo.id === id);
        if (deletedTodo) {
            setTodoDelete((prev) => [deletedTodo, ...prev]);
        }
    };

    return (
        <div className="flex flex-row justify-center p-[20px]">
            <div className="flex h-[800px] w-[550px] flex-col rounded-2xl bg-gray-100">
                <div className="h-1/12 w-full rounded-t-2xl" style={{ backgroundColor: '#343148' }}>
                    <h1 className="flex justify-center p-3 text-3xl" style={{ color: '#D7C49E' }}>
                        ToDoWeb
                    </h1>
                </div>
                <div className="flex h-5/6 flex-col gap-2 p-5">
                    <img src={searchIcon} alt="" className="absolute ml-2 mt-3 h-7 w-7" />
                    <input
                        placeholder="Search for your task ..."
                        className="h-[50px] w-full rounded-2xl border-2 p-1.5 pl-10"
                    />
                    <div className="flex h-[512px] flex-col gap-2 overflow-y-auto">
                        {todos.map((todo) => (
                            <CardInfo
                                key={todo.id}
                                todo={todo}
                                onToggle={toggleTodoState}
                                onDelete={handleDeleteTodo}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    className="rounded-4xl absolute ml-[250px] mt-[700px] h-[50px] w-[50px] cursor-pointer bg-gray-400 text-4xl text-black hover:bg-zinc-500"
                    onClick={handleOpenAddTodo}
                >
                    +
                </Button>
                {showPopup && <Popup onClose={handleCloseAddTodo} onAdd={handleAddTodo} />}
                <div
                    className="flex h-[80px] w-full flex-row rounded-b-2xl"
                    style={{ backgroundColor: '#343148' }}
                ></div>
            </div>
        </div>
    );
}

export default App;
