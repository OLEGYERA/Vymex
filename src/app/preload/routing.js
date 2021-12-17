import Preload from './app'
import Launch from "./view/launch";

export default [
  {
    path: '/preload',
    component: Preload,
    name: 'preload',
    children: [
      {
        path: 'launch',
        component: Launch,
        name: 'preload.launch'
      },
    ]
  }
]