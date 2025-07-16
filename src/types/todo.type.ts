export type TodoItem = {
    id: number;
    title: string;
    createdAt: Date;
    deadline?: Date | null;
    isCompleted: boolean;
    dueDate: boolean;
};
