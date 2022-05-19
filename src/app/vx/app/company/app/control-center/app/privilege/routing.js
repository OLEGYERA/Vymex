import Privilege from "./app";
import AppList from './view/app-list'
import Structure from "./view/structure";

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
      {
        path: 'structure',
        name: 'vx.co.control-center.privilege.structure',
        component: Structure,
      },
    ]
  },
]