import Binder from "@/LTE/Core/Helpers/Binder";
import { encrypt } from '@/LTE/Core/Helpers/utilites';

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
}

export default new Faq();