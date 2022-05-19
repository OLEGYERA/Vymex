import Account from "./app";
import Main from "./view/main"

export default [
    {
        path: 'account',
        component: Account,
        children: [
            {
                path: '/',
                name: 'vx.co.control-center.account',
                component: Main,
            },
        ]
    },
]