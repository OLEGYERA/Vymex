import FileStorage from "./app";
import Main from "./view/main"

export default [
    {
        path: 'file-storage',
        component: FileStorage,
        children: [
            {
                path: '/',
                name: 'vx.co.control-center.file-storage',
                component: Main,
            },
            // {
            //     path: 'company-edit',
            //     name: 'vx.co.control-center.company-edit',
            //     component: CompanyEdit,
            // }
        ]
    },
]