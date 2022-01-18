/*
eslint-disable
*/
import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, utf8ToArray} from "@/core/SEKSproto/utilites";

class MsgContact extends Binder{
  name='MsgContact'
  constructor() {
    super();
  }

  async search(query){
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, this.name, 'search', utf8ToArray(query));

    this.$socket.emit('listener', fullPack)
  }


  searchRes(contacts){
    this.$store.set('MsgSearchContacts', contacts)
  }
}

export default new MsgContact();