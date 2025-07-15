export type UserSignUp = {
    id: number;
    username: string;
    email: string;
    isConfirmed: boolean;
};

export type UserSignIn = {
    identifier: string;
    password: string;
};
