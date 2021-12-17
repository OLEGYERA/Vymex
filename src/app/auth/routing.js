import Auth from './app'
import Login from './view/login'
import Code from './view/code'
import PendingCodeVerification from './view/pending-code-verification'
import FillProfile from './view/fill-profile'
import Password from './view/password'

export default [
  {
    path: '/auth',
    component: Auth,
    name: 'auth',
    children: [
      {
        path: 'login',
        component: Login,
        name: 'auth.login'
      },
      {
        path: 'code',
        component: Code,
        name: 'auth.code'
      },
      {
        path: 'pending-code-verification',
        component: PendingCodeVerification,
        name: 'auth.pending.code.verification'
      },
      {
        path: 'fill-vx',
        component: FillProfile,
        name: 'auth.fill.profile'
      },
      {
        path: 'password',
        component: Password,
        name: 'auth.password'
      }
    ]
  }
]