import Vx from './app'
import Profile from './app/profile/routing'

export default [
  {
    path: '/vx',
    component: Vx,
    children: [
      ...Profile
    //   {
    //     path: 'me',
    //     component: Launch,
    //     name: 'preload.launch'
    //   },
    ]
  }
]