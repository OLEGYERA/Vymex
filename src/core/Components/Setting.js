import {
  concatArrays,
  encrypt,
  utf8ToArray,
  ed25519,
  serialize,
  hexToArray,
  arrayToHex,
  ecies25519,
  numberToArray
} from "@/core/SEKSproto/utilites";
import Router from '@/router'


export default class Setting {

  constructor(storagePad, SocketClient) {
    this.router = Router
    this.storage = storagePad;
    this.SClient = SocketClient;
  }

  async checkAlias(newAlias){
    this.storage.set('UserAlias', String(newAlias));

    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'Setting', 'checkAlias', utf8ToArray(this.storage.get('UserAlias').replace(/@/i, '')));

    this.SClient.Emit('listener', fullPack)
  }

  async checkAliasRes(data){
    if(data?.errors?.alias)
      this.storage.set('UserAliasError', data.errors.alias[0])
    else
      this.storage.set('UserAliasError', null)
  }

  async fillProfile(){
    let concatPasswordAT = concatArrays(utf8ToArray(this.storage.get('UserPassword')), hexToArray(this.storage.get('AT')))
    let signPassword = await ed25519.sign(concatPasswordAT, this.storage.get('Dask'));
    let newAT = concatArrays(hexToArray(this.storage.get('AT')), ecies25519.randomBytes(32));
    this.storage.set('AT', arrayToHex(newAT));

    let data = serialize(
      utf8ToArray(String(this.storage.get('UserName'))),
      utf8ToArray(String(this.storage.get('UserLastname'))),
      utf8ToArray(String(this.storage.get('UserAlias').replace(/@/i, ''))),
      utf8ToArray(String(this.storage.get('UserPassword'))),
      newAT, signPassword
    );

    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'Setting', 'fillProfile', data);

    this.SClient.Emit('listener', fullPack)
  }

  async fillProfileRes(data){
    if(!data.length) {
      await this.router.push({name: 'vx'})
      this.storage.set('UserJumpReg', true)
    }
  }

  async cloudPassword(password){
    this.storage.set('UserPassword', password)
    const newPassword = utf8ToArray(password);

    let newAT = concatArrays(hexToArray(this.storage.get('AT')), ecies25519.randomBytes(32));
    let concatPasswordAT = concatArrays(newPassword, newAT)
    let signPassword = await ed25519.sign(concatPasswordAT, this.storage.get('Dask'));
    this.storage.set('TempAT', arrayToHex(newAT));

    let data = serialize(
      newPassword,
      newAT,
      signPassword
    );

    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'ThirdEra', 'cloudPassword', data);

    this.SClient.Emit('listener', fullPack)
  }


  //Profile funcs


  async editAvatar(avatarId){
    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'Setting', 'editAvatar', numberToArray(avatarId));

    this.SClient.Emit('listener', fullPack)
  }

  async editAvatarRes({path}){
    this.storage.set('UserAvatar', path)
  }
}