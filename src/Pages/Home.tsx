import { useEffect, useState } from 'react';
import '../App.css';
import searchIcon from '../assets/search.svg';
import CardInfo from '../components/cardInfo/cardInfo.index';
import Popup from '../components/popup/popop.index';
import type { TodoItem } from '../types/todo.type';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTodo, useDeleteTodo, useGetTodoList, useUpdateTodo } from '@/hooks/getTodoList';

function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [search, setSearch] = useState('');
    const [editTodo, setEditTodo] = useState<TodoItem | null>(null);

    const { data: todoList, isLoading } = useGetTodoList();
    const { mutate: createTodo } = useCreateTodo();
    const { mutate: updateTodo } = useUpdateTodo();
    const { mutate: deleteTodo } = useDeleteTodo();

    const checkOverDue = async (data: TodoItem[]) => {
        const now = new Date().getTime();

        const todosUpdate = data.filter((todo) => {
            const deadlineDate = new Date(todo.deadline || '');
            return deadlineDate.getTime() <= now;
        });
        Promise.all(
            todosUpdate.map((todo) =>
                updateTodo({
                    id: todo.id,
                    todo: { ...todo, dueDate: true },
                }),
            ),
        );
    };

    useEffect(() => {
        if (todoList && !isLoading) {
            checkOverDue(todoList);
        }
    }, [isLoading]);

    const handleOpenAddTodo = () => {
        setShowPopup(true);
    };

    const handleCloseAddTodo = () => {
        setShowPopup(false);
        setEditTodo(null);
    };

    const handleAddTodo = async (newTodo: Omit<TodoItem, 'id'>) => {
        createTodo(newTodo);
        setShowPopup(false);
    };

    const toggleTodoState = async (id: number) => {
        const todo = todoList?.find((t) => t.id === id);
        if (!todo) return;
        updateTodo({
            id,
            todo: { ...todo, isCompleted: !todo.isCompleted },
        });
    };

    const handleDeleteTodo = async (id: number) => {
        deleteTodo(id);
    };

    const handleUpdateTodo = (id: number, newTodo: Omit<TodoItem, 'id'>) => {
        const selectedTodo = todoList?.find((todo) => (todo.id = id));
        if (selectedTodo) {
            setEditTodo(selectedTodo);
            setShowPopup(true);
            updateTodo({
                id,
                todo: { ...selectedTodo, ...newTodo },
            });
        }
    };

    const filteredTodos = todoList?.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex h-[800px] w-[550px] flex-col rounded-2xl bg-gray-100">
            <div className="h-1/12 w-full rounded-t-2xl" style={{ backgroundColor: '#343148' }}>
                <h1 className="flex justify-center p-3 text-3xl" style={{ color: '#D7C49E' }}>
                    ToDoWeb
                </h1>
            </div>
            <div className="flex h-5/6 flex-col gap-2 p-5">
                <img src={searchIcon} alt="" className="absolute ml-2 mt-3 h-7 w-7" />
                <Input
                    placeholder="Search for your task ..."
                    className="h-[50px] w-full rounded-2xl border-2 border-black p-1.5 pl-10"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex h-[512px] flex-col gap-2 overflow-y-auto">
                    {(search.trim() ? (filteredTodos ?? []) : (todoList ?? [])).map((todo: TodoItem) => (
                        <CardInfo
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodoState}
                            onDelete={() => handleDeleteTodo(todo.id)}
                            onUpdate={() => handleUpdateTodo(todo.id, todo)}
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
            {showPopup && (
                <Popup
                    onClose={handleCloseAddTodo}
                    onEdit={editTodo}
                    onAdd={(newTodo) => {
                        if (editTodo) {
                            handleUpdateTodo(editTodo.id, newTodo);
                        } else {
                            handleAddTodo(newTodo);
                        }
                    }}
                />
            )}
            <div className="flex h-[80px] w-full flex-row rounded-b-2xl" style={{ backgroundColor: '#343148' }}></div>
        </div>
    );
}

export default Home;
