import Support from "./app";
import Technical from "@/app/vx/app/support/view/technical";
import Feedback from "@/app/vx/app/support/view/feedback";

export default [
  {
    path: 'support',
    component: Support,
    children: [
      {
        path: '/',
        name: 'vx.support',
        component: Technical,
      },
      {
        path: 'feedback',
        name: 'vx.support.feedback',
        component: Feedback,
      }
    ]
  }
]