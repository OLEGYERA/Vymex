import Vx from './app'
import Profile from './view/profile'
import Setting from './app/setting/routing'
import Api from './app/api/routing'
import Messenger from './app/messenger/routing'
import Resources from "@/LTE/Singletons/Resources/routing";

export default [
  {
    path: '/vx',
    component: Vx,
    children: [
      {
        path: '/', //start /vx/
        name: 'vx',
        component: Profile,
      },
      ...Setting,
      ...Api,
      ...Messenger,
      ...Resources
    ]
  }
]