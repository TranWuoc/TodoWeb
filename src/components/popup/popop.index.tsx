import type { TodoItem } from '../../types/todo.type';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar24 } from '@/components/ui/Calender24';
import { Label } from '@radix-ui/react-label';
import InputField from '../input/InputField';
import { Button } from '../ui/button';
import { createTodo } from '@/services/todoService';
type PopupProps = {
    onClose: () => void;
    onAdd: (newTodo: TodoItem) => void;
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

function Popup({ onClose, onAdd }: PopupProps) {
    const methods = useForm<FormData>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormData>),
    });

    const onSubmit = async (data: FormData) => {
        const newTodo = {
            title: data.title,
            createdAt: new Date(),
            deadline: data.deadline ? new Date(data.deadline) : null,
            isCompleted: false,
            dueDate: false,
        };
        const created = await createTodo(newTodo);
        onAdd(created);
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
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Label htmlFor="title">Title</Label>
                        <InputField name="title" />

                        <div className="mt-4">
                            <Label htmlFor="deadline">Deadline</Label>
                            <InputField name="deadline" component={Calendar24} />
                        </div>

                        <div className="absolute bottom-0 right-0 flex gap-2 p-2">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Popup;
