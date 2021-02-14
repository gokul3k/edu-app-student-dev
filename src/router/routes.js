import { Dashboard, NotFound, Signin, Signup, Verify, Register,Reset,Exam,UserAuth } from '../pages';
import { AUTH_ONLY } from './types';

export default () => [
    {
        path: '/home',
        component: Dashboard,

        meta: {
            [AUTH_ONLY]: true,
        },
    },
    {
        path: '/signin',
        exact: true,
        component: Signin,
    },
    {
        path: '/auth',
        component: UserAuth,
    },
    {
        path: '/signup',
        exact: true,
        component: Signup,
    },
    {
        path: '/verify',
        exact: true,
        component: Verify,
    },
    {
        path: '/exam/:id',
        component: Exam,
    },
    {
        path: '/register',
        exact: true,
        component: Register,

            meta: {
                [AUTH_ONLY]: true,
            },
    },
    {
        path: '/reset/:token',
        exact: true,
        component: Reset,
    },
    {
        path: '*',
        component: NotFound,
        ignoreGlobal: true,
    },
];
