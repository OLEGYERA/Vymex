import Company from "./app";
import Structure from './view/structure'

export default [
  {
    path: 'company',
    component: Company,
    children: [
      {
        path: '/',
        name: 'vx.company',
        component: Structure,
      }
    ]
  }
]