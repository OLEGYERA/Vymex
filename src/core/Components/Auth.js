import {encrypt, hexToArray, serialize, utf8ToArray, ed25519} from '@/core/SEKSproto/utilites'
import BaseComponent from '@/core/Components/Base';

export default class Auth extends BaseComponent{

  constructor(storagePad, SocketClient) {
    super();
    this.storage = storagePad;
    this.SClient = SocketClient;
  }

  async getCountries(){
    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'Auth', 'getCountries');

    this.SClient.Emit('listener', fullPack)
  }

  setCountries(data){
    this.storage.set('Countries', data);
  }

  /**
   * sendPhoneData
   * Фаза - 2
   * Отправка пакета.
   *
   * @returns {Promise<void>}
   */

  async sendPhoneData() {
    this.storage.set('UT', Math.floor(Date.now() / 1000))
    let data = serialize(
      utf8ToArray(String(this.storage.get('ChooseCountry').phoneIdent)),
      utf8ToArray(String(this.storage.get('ChooseCountry').phoneIdent + this.storage.get('PhoneLthNumber').withoutMask)),
      utf8ToArray(String(this.storage.get('UT'))),
      hexToArray(this.storage.get('Salt')),
      hexToArray(this.storage.get('AT')),
    );
    let fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'SecondEra', 'phase3', data);

    this.SClient.Emit('listener', fullPack)
  }

  async sendNewCode(){
    this.storage.set('UT', Math.floor(Date.now() / 1000))
    let data = serialize(
      utf8ToArray(String(this.storage.get('ChooseCountry').phoneIdent + this.storage.get('PhoneLthNumber').withoutMask)),
      utf8ToArray(String(this.storage.get('UT'))),
      hexToArray(this.storage.get('Salt')),
      hexToArray(this.storage.get('AT')),
    );

    let fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'SecondEra', 'resendCode', data);

    this.SClient.Emit('listener', fullPack)
  }

  async verifyCode(){
    const SGDFinalPack = serialize(
      this.storage.get('FP'),
      this.storage.get('ESClientPublicKey'),
      hexToArray(this.storage.get('AT'))
    );

    const SGDdsa = await ed25519.sign(SGDFinalPack, this.storage.get('Dask'));
    const data = serialize(SGDFinalPack, SGDdsa);

    let fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'SecondEra', 'phase7', data);

    this.SClient.Emit('listener', fullPack)
  }

  async flipFlopDash(){
    let fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'SecondEra', 'phase10', hexToArray(this.storage.get('DashClient')));

    this.SClient.Emit('listener', fullPack)
  }

  async sendKeyError() {
    let fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'SecondEra', 'keyError', utf8ToArray(String(this.storage.get('ChooseCountry').phoneIdent + this.storage.get('PhoneLthNumber').withoutMask)));

    this.SClient.Emit('listener', fullPack)
    this.storage.set('ClearDaskDash');
  }


  async user(){
    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, 'Auth', 'user');

    this.SClient.Emit('listener', fullPack)
  }

  userRes(data){
    this.storage.set('UserProfileData', data);
  }
}