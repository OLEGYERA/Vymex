import CoCreate from "./create.app";
import Co from "./app";
import Dashboard from "./app/dashboard/app";

import Task from './app/task/routing'
import ControlCenter from "./app/control-center/routing";

// import Profile from './view/profile'

export default [
  {
    path: 'co-create',
    name: 'vx.co.create',
    component: CoCreate,
  },
  {
    path: 'co-:companyID',
    component: Co,
    children: [
      {
        path: '/',
        name: 'vx.co',
        component: Dashboard
      },
      ...Task,
      ...ControlCenter,
    ]
  },
]