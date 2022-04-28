import Setting from "./app";
import Tuning from './view/tuning'
import Profile from './view/profile'
import Confidentiality from './view/confidentiality'
import Phone from './view/phone'
import Mail from './view/mail'
import ConfidentialityPhone from './view/confidentiality/phone'
import ConfidentialityMail from './view/confidentiality/mail'
import ConfidentialityActiveSessions from './view/confidentiality/activeSessions'
import ConfidentialityChangePassword from './view/confidentiality/changePassword'
import ConfidentialityPasscode from './view/confidentiality/passcode'

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
      },
      {
        path: 'confidentiality',
        name: 'vx.setting.confidentiality',
        component: Confidentiality,
      },
      {
        path: 'confidentiality/phone',
        name: 'vx.setting.confidentiality.phone',
        component: ConfidentialityPhone
      },
      {
        path: 'confidentiality/mail',
        name: 'vx.setting.confidentiality.mail',
        component: ConfidentialityMail
      },
      {
        path: 'confidentiality/active-sessions',
        name: 'vx.setting.confidentiality.active-sessions',
        component: ConfidentialityActiveSessions
      },
      {
        path: 'confidentiality/change-password',
        name: 'vx.setting.confidentiality.change-password',
        component: ConfidentialityChangePassword
      },
      {
        path: 'confidentiality/passcode',
        name: 'vx.setting.confidentiality.passcode',
        component: ConfidentialityPasscode
      },
      {
        path: 'phone',
        name: 'vx.setting.phone',
        component: Phone,
      },
      {
        path: 'mail',
        name: 'vx.setting.mail',
        component: Mail,
      }
    ]
  }
]