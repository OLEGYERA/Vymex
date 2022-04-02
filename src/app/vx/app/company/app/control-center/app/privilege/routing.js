import Privilege from "./app";
import AppList from './view/app-list'

export default [
  {
    path: 'privilege',
    component: Privilege,
    children: [
      {
        path: '/',
        name: 'vx.co.control-center.privilege',
        component: AppList,
      },
    ]
  },
]