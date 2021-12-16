import Preload from './app'
import Launch from "./app/launch";

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