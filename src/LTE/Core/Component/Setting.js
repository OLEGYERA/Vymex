import Binder from "@/LTE/Core/Helpers/Binder";
import {concatArrays, encrypt, utf8ToArray, ed25519, serialize, hexToArray, arrayToHex, ecies25519, numberToArray} from "@/core/SEKSproto/utilites";

class Setting extends Binder{
  constructor() {
    super();
  }

  async checkAlias(newAlias){
    this.$store.set('UserAlias', String(newAlias));

    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'checkAlias', utf8ToArray(this.$store.get('UserAlias').replace(/@/i, '')));

    this.$socket.emit('listener', fullPack)
  }

  async checkAliasRes(data){
    if(data?.errors?.alias)
      this.$store.set('UserAliasError', data.errors.alias[0])
    else
      this.$store.set('UserAliasError', null)
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

    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'fillProfile', data);

    this.$socket.emit('listener', fullPack)
  }

  async fillProfileRes(data){
    if(!data.length) {
      await this.$router.push({name: 'vx'})
      this.$store.set('UserJumpReg', true)
    }
  }

  async cloudPassword(password){
    this.$store.set('UserPassword', password)
    const newPassword = utf8ToArray(password);

    let newAT = concatArrays(hexToArray(this.$store.get('AT')), ecies25519.randomBytes(32));
    let concatPasswordAT = concatArrays(newPassword, newAT)
    let signPassword = await ed25519.sign(concatPasswordAT, this.$store.get('Dask'));
    this.$store.set('TempAT', arrayToHex(newAT));

    let data = serialize(
      newPassword,
      newAT,
      signPassword
    );

    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'ThirdEra', 'cloudPassword', data);

    this.$socket.emit('listener', fullPack)
  }


  //Profile funcs


  async editAvatar(avatarId){
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'editAvatar', numberToArray(avatarId));

    this.$socket.emit('listener', fullPack)
  }

  async editAvatarRes({path}){
    this.$store.set('UserAvatar', path)
  }


  async editName(name){
    this.$store.set('UserName', name);
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'editName', utf8ToArray(name));

    this.$socket.emit('listener', fullPack)
  }

  async editLastname(lastname){
    this.$store.set('UserLastname', lastname);
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'editLastname', utf8ToArray(lastname));

    this.$socket.emit('listener', fullPack)
  }

  async editAlias(alias){
    this.$store.set('UserAlias', alias);
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'editAlias', utf8ToArray(alias.replace(/@/i, '')));

    this.$socket.emit('listener', fullPack)
  }


  async editBirthDate(birthday){
    this.$store.set('UserBirthday', birthday);
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Setting', 'editBirthDate', utf8ToArray(birthday));

    this.$socket.emit('listener', fullPack)
  }

}


export default new Setting();