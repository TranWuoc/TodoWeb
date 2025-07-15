import axios from 'axios';
import type { UserSignIn, UserSignUp } from '@/types/user.type';

const URL = 'http://localhost:1337/api/auth/local';

export async function userSignIn(user: Partial<UserSignIn>): Promise<UserSignIn> {
    const res = await axios.post(URL, user, { headers: { 'Content-Type': 'application/json' } });
    if (res.data && res.data.jwt) {
        localStorage.setItem('token', res.data.jwt);
    }
    return res.data;
}

export async function userSignUp(newUser: Partial<UserSignUp>): Promise<UserSignUp> {
    const res = await axios.post(URL + '/register', newUser, { headers: { 'Content-Type': 'application/json' } });
    if (res.data && res.data.jwt) {
        localStorage.setItem('token', res.data.jwt);
    }
    return res.data;
}
