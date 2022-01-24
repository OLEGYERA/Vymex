/*
eslint-disable
*/
import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, utf8ToArray, numberToArray} from "@/LTE/Core/Helpers/utilites";

class MsgUser extends Binder{
  name='MsgUser'
  constructor() {
    super();
  }

  async search(query){
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'MsgUser', 'search', utf8ToArray(query));

    this.$socket.emit('listener', fullPack)
  }


  shortRes(data){
    console.log('short', data)
  }

  details(data){
    console.log('details', data)
  }

  full(data){
    console.log('full', data)
  }

  searchRes(contacts){
    this.$store.set('MsgSearchContacts', contacts)
  }
}

export default new MsgUser();