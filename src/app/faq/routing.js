import Faq from "./app";
import KnowlageBase from "./views/knowlage.base";
import Category from "./views/category";
import Article from "./views/article";

export default [
  {
    path: 'faq',
    component: Faq,
    children: [
      {
        path: '/',
        name: 'vx.faq',
        component: KnowlageBase,
      },
      {
        path: 'category',
        name: 'vx.faq.category',
        component: Category,
      },
      {
        path: 'article',
        name: 'vx.faq.article',
        component: Article,
      }
    ]
  }
]