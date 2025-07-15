export type TodoItem = {
    id: number;
    title: string;
    createAt: Date;
    deadline?: Date | null;
    isCompleted: boolean;
    dueDate: boolean;
};
