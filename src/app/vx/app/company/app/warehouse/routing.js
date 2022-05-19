import WareHouse from './app'
import Main from "@/app/vx/app/company/app/warehouse/view/main";
import CreateResource from "@/app/vx/app/company/app/warehouse/view/create.resource";
import EditResource from "@/app/vx/app/company/app/warehouse/view/edit.resource"

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
            {
                path: 'create-resource',
                component: CreateResource,
                name: 'vx.warehouse.create.resource',
            },
            {
                path: 'edit-resource',
                component: EditResource,
                name: 'vx.warehouse.edit.resource',
            },
        ]
    }
]