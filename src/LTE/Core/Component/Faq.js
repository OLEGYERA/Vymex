import Binder from "@/LTE/Core/Helpers/Binder";
import { encrypt, numberToArray } from '@/LTE/Core/Helpers/utilites';

class Faq extends Binder{
  constructor() {
    super();
  }

  getCategoriesRes(data) {
    this.$store.set('Categories', data);
  }

  async getCategories() {
    this.$socket.emit('listener', await encrypt(...arguments[1]))
  }

  async getArticles(categoryId) {
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(categoryId)))
  }

  getArticlesRes(data) {
    this.$store.set('Category', data);
    this.$router.push({name: 'vx.faq.category'})
  }

  async getArticle(articleId) {
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(articleId)))
  }

  getArticleRes(data) {
    this.$store.set('Article', data);
    this.$router.push({name: 'vx.faq.article'})
  }
}

export default new Faq();