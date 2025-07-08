import type { TodoItem } from '../../todo.type';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Calendar24 } from '@/components/ui/Calender24';
import { Label } from '@radix-ui/react-label';
type PopupProps = {
    onClose: () => void;
    onAdd: (newTodo: TodoItem) => void;
};

const schema = yup.object({
    title: yup.string().required('Do not blank this field').max(255, ' Title must not exceed 255 charaters '),
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
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema as yup.ObjectSchema<FormData>),
    });

    const onSubmit = (data: FormData) => {
        const idTodo = Math.floor(Math.random() * 1000000);
        const now = new Date();
        const newTodo = {
            id: idTodo,
            title: data.title,
            createAt: now,
            deadline: data.deadline,
            isCompleted: false,
            dueDate: false,
        };
        console.log(newTodo);
        onAdd(newTodo);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Label htmlFor="title">Title</Label>
                                <Input {...field} placeholder="Title todo ..." />
                            </>
                        )}
                    />

                    <p style={{ color: 'red' }}>{errors.title?.message}</p>

                    <div className="mt-4">
                        <Label htmlFor="deadline">Deadline:</Label>
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) => (
                                <Calendar24 value={field.value ?? undefined} onChange={field.onChange} />
                            )}
                        />
                        <p style={{ color: 'red' }}>{errors.deadline?.message}</p>
                    </div>

                    <div className="absolute bottom-0 right-0 flex gap-2 p-2">
                        <button
                            className="h-[40px] w-[100px] cursor-pointer rounded-2xl"
                            type="submit"
                            style={{ backgroundColor: '#F3A950', color: '#161B21' }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Popup;
