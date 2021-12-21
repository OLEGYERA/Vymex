import Setting from "./app";
import Tuning from './view/tuning'
import Profile from './view/profile'

export default [
  {
    path: 'setting',
    component: Setting,
    children: [
      {
        path: '/',
        name: 'vx.setting',
        component: Tuning,
      },
      {
        path: 'profile',
        name: 'vx.setting.profile',
        component: Profile,
      }
    ]
  }
]