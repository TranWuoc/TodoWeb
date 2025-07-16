import InputField from '@/components/input/InputField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { userSignIn, userSignUp } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const signInSchema = yup.object({
    identifier: yup.string().required(),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be from 8 charaters')
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
            'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
        ),
});

const signUpSchema = yup.object({
    username: yup.string().required().max(255, 'Username must not exceed 255 charaters'),
    email: yup
        .string()
        .required()
        .matches(/^[\w.+-]+@gmail\.com$/, 'Email must end with @gmail.com'),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be from 8 charaters')
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
            'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
        ),
});

type SignInFormData = yup.InferType<typeof signInSchema>;
type SignUpFormData = yup.InferType<typeof signUpSchema>;

function Auth() {
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState('');
    const [signInError, setSignInError] = useState('');

    const signInForm = useForm<SignInFormData>({
        resolver: yupResolver(signInSchema as yup.ObjectSchema<SignInFormData>),
        defaultValues: { identifier: '', password: '' },
    });
    const signUpForm = useForm<SignUpFormData>({
        resolver: yupResolver(signUpSchema as yup.ObjectSchema<SignUpFormData>),
        defaultValues: { username: '', email: '', password: '' },
    });

    const handleSignIn = async (data: SignInFormData) => {
        const user = {
            identifier: data.identifier,
            password: data.password,
        };
        try {
            const res = await userSignIn(user);
            setSignInError('');
            navigate('/');
        } catch (error: any) {
            const apiError = error?.response?.data?.error?.message;
            setSignInError(apiError || 'SignIn Fail!');
        }
    };
    const handleSignUp = async (data: SignUpFormData) => {
        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password,
        };
        try {
            const res = await userSignUp(newUser);
            setSignUpError('');
            navigate('/');
        } catch (error: any) {
            const apiError = error?.response?.data?.error?.message;
            setSignUpError(apiError || 'SignUp Fail!');
        }
    };

    return (
        <div className="flex h-lvh w-full items-center justify-center">
            <div className="flex h-[700px] w-[600px] items-center justify-center rounded-2xl border-2 border-black bg-gray-300">
                <Tabs defaultValue="signIn" className="h-[500px] w-[450px]">
                    <TabsList className="h-[50px] w-[200px]">
                        <TabsTrigger value="signIn" className="cursor-pointer">
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger value="signUp" className="cursor-pointer">
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="signIn"
                        className="flex flex-col items-center gap-6 rounded-2xl bg-[#f5f5f5] p-4"
                    >
                        <Label htmlFor="signin" className="mt-3 text-5xl font-bold">
                            Sign In
                        </Label>
                        <FormProvider {...signInForm}>
                            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="mt-6 flex flex-col gap-3">
                                <div className="flex w-[400px] flex-col gap-2">
                                    <Label htmlFor="identifier">Username</Label>
                                    <InputField name="identifier" />
                                </div>
                                <div className="flex w-[400px] flex-col gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <InputField name="password" type="password" />
                                </div>
                                {signInError && <Label className="text-red-500">{signInError}</Label>}
                                <Button className="cursor-pointer" type="submit">
                                    Sign In
                                </Button>
                            </form>
                        </FormProvider>
                    </TabsContent>
                    <TabsContent
                        value="signUp"
                        className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-[#f5f5f5] p-4"
                    >
                        <Label htmlFor="signin" className="text-5xl font-bold">
                            Sign Up
                        </Label>
                        <FormProvider {...signUpForm}>
                            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="mt-6 flex flex-col gap-3">
                                <div className="flex w-[400px] flex-col gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <InputField name="username" />
                                </div>
                                <div className="flex w-[400px] flex-col gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <InputField name="email" />
                                </div>
                                <div className="flex w-[400px] flex-col gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <InputField name="password" type="password" />
                                </div>
                                {signUpError && <Label className="text-red-500">{signUpError}</Label>}
                                <Button className="cursor-pointer" type="submit">
                                    Sign Up
                                </Button>
                            </form>
                        </FormProvider>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Auth;
