import {
    createTodo,
    deleteHardTodo,
    deleteTodo,
    getTodos,
    getTodosDeleted,
    restoreTodo,
    updateTodo,
} from '@/services/todoService';
import type { TodoItem } from '@/types/todo.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const todoApiKeys = {
    getList: 'todos',
    getDeleteList: 'todosdeleted',
};

export const useGetTodoList = () =>
    useQuery({
        queryKey: [todoApiKeys.getList],
        queryFn: getTodos,
        select: (res) => res.data,
    });

export const useGetTodoDeletedList = () =>
    useQuery({
        queryKey: [todoApiKeys.getDeleteList],
        queryFn: getTodosDeleted,
        select: (res) => res.data,
    });

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [todoApiKeys.getList] }),
        onError: (error) => console.log(error),
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, todo }: { id: number; todo: TodoItem }) => updateTodo(id, todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [todoApiKeys.getList] }),
        onError: (error) => console.log(error),
    });
};

export const useRestoreTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, todo }: { id: number; todo: TodoItem }) => restoreTodo(id, todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [todoApiKeys.getDeleteList] }),
        onError: (error) => console.log(error),
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [todoApiKeys.getList] }),
        onError: (error) => console.log(error),
    });
};

export const useHardDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteHardTodo(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [todoApiKeys.getDeleteList] }),
        onError: (error) => console.log(error),
    });
};
