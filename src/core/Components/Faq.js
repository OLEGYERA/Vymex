import { encrypt } from '@/core/SEKSproto/utilites';

export default class Faq{

  constructor(storagePad, SocketClient) {
    this.storage = storagePad;
    this.SClient = SocketClient;
  }

  getCategoriesRes(data) {
    this.storage.set('Categories', data);
  }

  async getCategories() {
    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'FAQ', 'getCategories');

    this.SClient.Emit('listener', fullPack)
  }
}