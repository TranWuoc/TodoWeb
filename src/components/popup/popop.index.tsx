import type { TodoItem } from '../../types/todo.type';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar24 } from '@/components/ui/Calender24';
import { Label } from '@radix-ui/react-label';
import InputField from '../input/InputField';
import { Button } from '../ui/button';
import { getTodo } from '@/services/todoService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
type PopupProps = {
    onClose: () => void;
    onAdd: (newTodo: Omit<TodoItem, 'id'>) => void;
    onEdit?: TodoItem | null;
};

const schema = yup.object({
    title: yup.string().required().max(255, ' Title must not exceed 255 charaters '),
    deadline: yup
        .date()
        .nullable()
        .notRequired()
        .transform((value, originalValue) => {
            if (originalValue === '') return null;
            return value;
        })
        .min(new Date(), 'Deadline must be in the future'),
});

type FormData = yup.InferType<typeof schema>;

function Popup({ onClose, onAdd, onEdit }: PopupProps) {
    const methods = useForm<FormData>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormData>),
    });

    const { data } = useQuery({
        queryKey: ['todo', onEdit?.id],
        queryFn: () => getTodo(onEdit!.id),
        enabled: Boolean(onEdit?.id),
        select: (res) => res.data,
    });

    useEffect(() => {
        if (data) {
            methods.reset({
                title: data.title,
                deadline: data.deadline ? new Date(data.deadline) : null,
            });
        }
    }, [data, methods]);

    const onSubmit = async (data: FormData) => {
        const newTodo = {
            title: data.title,
            createdAt: new Date(),
            deadline: data.deadline ? new Date(data.deadline) : null,
            isCompleted: false,
            dueDate: false,
        };
        onAdd(newTodo);
        onClose();
    };

    return (
        <div
            className="display:none z-1 fixed left-0 top-0 h-[100%] w-[100%] overflow-auto pt-[100px]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
            <div
                className="relative m-auto h-[300px] w-[30%] rounded-2xl border-solid p-[20px]"
                style={{ backgroundColor: '#D7C49E' }}
            >
                <span className="float-right cursor-pointer text-[28px] font-bold" onClick={onClose}>
                    &times;
                </span>

                <Label className="text-2xl text-blue-500">{onEdit ? 'Edit Todo' : 'Add Todo'}</Label>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Label htmlFor="title">Title</Label>
                        <InputField name="title" />

                        <div className="mt-4">
                            <Label htmlFor="deadline">Deadline</Label>
                            <InputField name="deadline" component={Calendar24} />
                        </div>

                        <div className="absolute bottom-0 right-0 flex gap-2 p-2">
                            <Button type="submit">{onEdit ? 'Update' : 'Add Todo'}</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Popup;
