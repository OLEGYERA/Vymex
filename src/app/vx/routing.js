import Vx from './app'
import Home from './view/home'
import Career from './view/career'

import Setting from './app/setting/routing'
import Api from './app/api/routing'
// import Messenger from './app/messenger/routing'
import Company from './app/company/routing'
import Support from './app/support/routing'
import Processes from './app/company/app/process/routing';
import Faq from '../faq/routing';


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
      // ...Messenger,
      ...Company,
      ...Processes,
        ...Support,
        ...Faq
    ]
  }
]