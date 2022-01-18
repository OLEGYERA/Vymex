/*
eslint-disable
*/
import {encrypt, utf8ToArray} from "@/core/SEKSproto/utilites";

export default class MsgContact{
  name='MsgContact'

  constructor(storagePad, SocketClient) {
    this.storage = storagePad;
    this.SClient = SocketClient;
  }

  async search(query){
    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, this.name, 'search', utf8ToArray(query));

    this.SClient.Emit('listener', fullPack)
  }


  searchRes(contacts){
    this.storage.set('MsgSearchContacts', contacts)
  }


}