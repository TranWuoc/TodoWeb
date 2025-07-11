import { useEffect, useState } from 'react';
import '../App.css';
import searchIcon from '../assets/search.svg';
import CardInfo from '../components/cardInfo/cardInfo.index';
import Popup from '../components/popup/popop.index';
import type { TodoItem } from '../todo.type';
import { Button } from '../components/ui/button';
import { loadTodos, saveTodos } from '../utils/todoStorage';
import { deleteTodo, getTodos, updateTodo } from '@/services/todoService';

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [tododelete, setTodoDelete] = useState<TodoItem[]>(loadTodos('tododelete'));

    useEffect(() => {
        getTodos().then(setTodos);
    }, []);

    useEffect(() => {
        saveTodos('tododelete', tododelete);
    }, [tododelete]);

    useEffect(() => {
        const now = new Date().getTime();
        const todosUpdate = todos.filter((todo) => todo.deadline && todo.deadline.getTime() <= now && !todo.dueDate);

        Promise.all(todosUpdate.map((todo) => updateTodo(todo.documentId, { dueDate: true }))).then(() =>
            setTodos((prev) =>
                prev.map((todo) => {
                    if (todo.deadline && todo.deadline.getTime() <= now) {
                        return { ...todo, dueDate: true };
                    }
                    return todo;
                }),
            ),
        );
    }, [todos]);

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

    const toggleTodoState = async (documentId: string) => {
        const todo = todos.find((t) => t.documentId === documentId);
        if (!todo) return;

        await updateTodo(documentId, {
            isCompleted: !todo.isCompleted,
        });

        setTodos((prev) => prev.map((t) => (t.documentId === documentId ? { ...t, isCompleted: !t.isCompleted } : t)));
    };

    const handleDeleteTodo = async (documentId: string) => {
        await deleteTodo(documentId);
        setTodos((prev) => prev.filter((todo) => todo.documentId !== documentId));
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
                                key={todo.documentId}
                                todo={todo}
                                onToggle={toggleTodoState}
                                onDelete={() => handleDeleteTodo(todo.documentId)}
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

export default Home;
