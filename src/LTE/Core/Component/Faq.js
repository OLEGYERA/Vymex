import Binder from "@/LTE/Core/Helpers/Binder";
import { encrypt } from '@/core/SEKSproto/utilites';

class Faq extends Binder{
  constructor() {
    super();
  }

  getCategoriesRes(data) {
    this.$store.set('Categories', data);
  }

  async getCategories() {
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'FAQ', 'getCategories');

    this.$socket.emit('listener', fullPack)
  }
}

export default new Faq();