import Settings from "./app";
// import PersonalSetting from "./view/personal";
import Personal from "@/app/vhome/app/settings/view/personal";

const RouteName = 'vhome.settings'

export default [
  {
    path: 'settings',
    component: Settings,
    name: RouteName,
    children: [
      {
        path: 'personal',
        component: Personal,
        name: RouteName + '.personal'
      },
    ]
  },
]