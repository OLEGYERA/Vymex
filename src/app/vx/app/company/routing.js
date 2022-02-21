import Company from "./app";
import Structure from './view/structure',
import CoCreate from "./view/create";

export default [
  {
    path: 'company',
    component: Company,
    children: [
      {
        path: '/',
        name: 'vx.company',
        component: Structure,
      }
    ]
  },
  {
    path: 'co-create',
    name: 'vx.co.create',
    component: CoCreate,
  },
  // {
  //   path: 'co',
  //   component: Setting,
  //   children: [
  //     {
  //       path: '/create',
  //       name: 'vx.setting',
  //       component: Tuning,
  //     },
  //     {
  //       path: 'profile',
  //       name: 'vx.setting.profile',
  //       component: Profile,
  //     }
  //   ]
  // }
]