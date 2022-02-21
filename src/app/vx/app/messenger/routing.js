import Messenger from "./app";
import Dialog from './view/dialog'

export default [
  {
    path: 'msg',
    component: Messenger,
    children: [
      {
        path: 'dialog',
        name: 'vx.msg',
        component: Dialog,
      },
    ]
  }
]