import Vx from './app'
import Home from './view/home'
import Setting from './app/setting/routing'
import Api from './app/api/routing'
import Messenger from './app/messenger/routing'
import Company from './app/company/routing'

export default [
  {
    path: '/vx',
    component: Vx,
    children: [
      {
        path: '/', //start /vx/
        name: 'vx',
        component: Home,
      },
      ...Setting,
      ...Api,
      ...Messenger,
      ...Company
    ]
  }
]