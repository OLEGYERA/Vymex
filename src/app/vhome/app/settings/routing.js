import Settings from "./app";
import PersonalSetting from "./view/personal";

const RouteName = 'vhome.settings'

export default [
  {
    path: 'settings',
    component: Settings,
    name: RouteName,
    children: [
      {
        path: 'personal',
        component: PersonalSetting,
        name: RouteName + '.personal'
      },
    ]
  },
]