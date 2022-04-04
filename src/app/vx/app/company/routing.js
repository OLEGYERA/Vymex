import CoCreate from "./create.app";
import CoFounder from "./founder.app";
import Blur from "./blur"
import Co from "./app";
import Dashboard from "./app/dashboard/app";

import Task from './app/task/routing'
// import Profile from './view/profile'

export default [
  {
    path: 'co-create',
    name: 'vx.co.create',
    component: CoCreate,
  },
  {
    path: 'co-founder',
    name: 'vx.co.founder',
    component: CoFounder,
  },
  {
    path: 'blur',
    name: 'vx.co.founder.blur',
    component: Blur,
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
      ...Task
    ]
  },
]