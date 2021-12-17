import VHome from './app'
import Me from "@/app/vhome/view/me";
import Settings from "@/app/vhome/app/settings/routing";

export default [
  {
    path: '/vhome',
    component: VHome,
    name: 'vhome',
    children: [
      {
        path: 'me',
        component: Me,
        name: 'vhome.me'
      },
      ...Settings
    ]
  }
]