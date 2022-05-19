import ControlCenter from "./app";
import PersonalArea from './view/personal-area'
import PersonalAccount from './app/personal-account/routing'
import CompanyInfo from './app/company-info/routing'
import FileStorage from "./app/file-storage/routing";

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
      ...Privilege,
      ...PersonalAccount,
      ...CompanyInfo,
      ...FileStorage
    ]
  },
]