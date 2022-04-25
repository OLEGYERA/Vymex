import ControlCenter from "./app";
import PersonalArea from './view/personal-area'

import Privilege from './app/privilege/routing'

export default [
  {
    path: 'control-center',
    component: ControlCenter,
    children: [
      {
        path: '/',
        name: 'vx.co.control-center',
        component: PersonalArea,
      },
      ...Privilege
    ]
  },
]