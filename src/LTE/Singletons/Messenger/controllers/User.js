/*eslint-disable*/
import Binder from "@Core/Helpers/Binder";
import {encrypt, utf8ToArray, numberToArray} from "@Core/Helpers/utilites";

class User extends Binder{
  constructor() {
    super();
  }

  async search(query){
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(query)))
  }

  searchRes(response){
    this.$store.name('Messenger').set('SearchedContacts', response);
  }


  shortRes(data){
    console.log('short', data)
  }

  details(data){
    console.log('details', data)
  }

  async full(personID){
    this.$store.name('Messenger').set('CurrentContact', []);
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(personID)))
  }

  fullRes(fullContactData){
    this.$store.name('Messenger').set('CurrentContact', fullContactData);
  }

  // searchRes(contacts){
  //   this.$store.set('MsgSearchContacts', contacts)
  // }
}

export default new User();