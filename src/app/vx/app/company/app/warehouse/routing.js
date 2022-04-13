import WareHouse from './app'
import Main from "@/app/vx/app/company/app/warehouse/view/main";

export default[
    {
        path: 'warehouse',
        component: WareHouse,
        children: [
            {
                path: '/',
                component: Main,
                name: 'vx.warehouse',
            },
        ]
    }
]