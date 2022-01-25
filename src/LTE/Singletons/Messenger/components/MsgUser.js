/*eslint-disable*/
import Binder from "@Core/Helpers/Binder";
import {encrypt, utf8ToArray, numberToArray} from "@Core/Helpers/utilites";

class MsgUser extends Binder{
  constructor() {
    super();
  }

  async search(query){
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(query)))
  }

  searchRes(response){
    console.log(response)
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

  // searchRes(contacts){
  //   this.$store.set('MsgSearchContacts', contacts)
  // }
}

export default new MsgUser();