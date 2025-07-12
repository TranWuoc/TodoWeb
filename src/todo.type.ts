export type TodoItem = {
    documentId: string;
    title: string;
    createAt: Date;
    deadline?: Date | null;
    isCompleted: boolean;
    dueDate: boolean;
};
