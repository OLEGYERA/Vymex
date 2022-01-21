import Binder from "@/LTE/Core/Helpers/Binder";
import {concatArrays, encrypt, utf8ToArray, ed25519, serialize, hexToArray, arrayToHex, ecies25519, numberToArray} from "@/core/SEKSproto/utilites";

class Setting extends Binder{
  constructor() {
    super();
  }

  async checkAlias(newAlias){
    const Alias = String(newAlias);
    this.$store.set('UserAlias', Alias); //нужно переделать!!
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(Alias.replace(/@/i, ''))));
  }

  async checkAliasRes(data){
    let aliasError = data?.errors?.[Object.keys(data?.errors)]?.[0];
    this.$store.set('UserAliasError', aliasError || null);
  }

  async fillProfile(){
    let concatPasswordAT = concatArrays(utf8ToArray(this.$store.get('UserPassword')), hexToArray(this.$store.get('AT')))
    let signPassword = await ed25519.sign(concatPasswordAT, this.$store.get('Dask'));
    let newAT = concatArrays(hexToArray(this.$store.get('AT')), ecies25519.randomBytes(32));
    this.$store.set('AT', arrayToHex(newAT));
    let data = serialize(
      utf8ToArray(String(this.$store.get('UserName'))),
      utf8ToArray(String(this.$store.get('UserLastname'))),
      utf8ToArray(String(this.$store.get('UserAlias').replace(/@/i, ''))),
      utf8ToArray(String(this.$store.get('UserPassword'))),
      newAT, signPassword
    );
    this.$socket.emit('listener', await encrypt(...arguments[1], data));
  }
  async fillProfileRes(data){
    if(!data.length) {
      await this.$router.push({name: 'vx'})
      this.$store.set('UserJumpReg', true)
    }
  }

  async cloudPassword(password){
    const newPassword =  utf8ToArray(password);
    this.$store.set('UserPassword', newPassword);
    let newAT = concatArrays(hexToArray(this.$store.get('AT')), ecies25519.randomBytes(32));
    let signPassword = await ed25519.sign(concatArrays(newPassword, newAT), this.$store.get('Dask'));
    this.$store.set('TempAT', arrayToHex(newAT));
    this.$socket.emit('listener', await encrypt(
      arguments[1][0],
      'ThirdEra',
      arguments[1][2],
      serialize(newPassword, newAT, signPassword))
    );
  }

  //Profile funcs
  async editAvatar(avatarId){
    this.$socket.emit('listener', await encrypt(...arguments[1], numberToArray(avatarId)));
  }
  async editAvatarRes({path}){
    this.$store.set('UserAvatar', path)
  }
  async editName(name){
    this.$store.set('UserName', name);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(name)));
  }
  async editLastname(lastname){
    this.$store.set('UserLastname', lastname);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(lastname)));
  }
  async editAlias(){
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(this.$store.get('UserAlias').replace(/@/i, ''))));
  }
  async editBirthDate(birthday){
    this.$store.set('UserBirthday', birthday);
    this.$socket.emit('listener', await encrypt(...arguments[1], utf8ToArray(birthday)));
  }
}

export default new Setting();