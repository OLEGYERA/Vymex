import Vx from './app'
import Home from './view/home'
import Career from './view/career'

import Setting from './app/setting/routing'
import Api from './app/api/routing'
import Company from './app/company/routing';
import Messenger from './app/messenger/routing'

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
      {
        path: 'career/:companyID', //start /vx/
        name: 'vx.career',
        component: Career,
      },
      ...Setting,
      ...Api,
      ...Company,
      ...Messenger,
      ...Company
    ]
  }
]