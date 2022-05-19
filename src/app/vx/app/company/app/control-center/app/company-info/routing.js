import CompanyInfo from "./app";
import Main from "./view/main"
import CompanyEdit from "./view/edit.company.info"

export default [
    {
        path: 'company-info',
        component: CompanyInfo,
        children: [
            {
                path: '/',
                name: 'vx.co.control-center.company-info',
                component: Main,
            },
            {
                path: 'company-edit',
                name: 'vx.co.control-center.company-edit',
                component: CompanyEdit,
            }
        ]
    },
]