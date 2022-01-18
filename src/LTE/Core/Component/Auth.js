import {encrypt, hexToArray, serialize, utf8ToArray, ed25519} from '@/core/SEKSproto/utilites'
import Binder from "@/LTE/Core/Helpers/Binder";

export default class Auth extends Binder{

  constructor() {
    super();
  }

  async getCountries(){
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Auth', 'getCountries');

    this.$socket.emit('listener', fullPack)
  }

  setCountries(data){
    this.$store.set('Countries', data);
  }

  /**
   * sendPhoneData
   * Фаза - 2
   * Отправка пакета.
   *
   * @returns {Promise<void>}
   */

  async sendPhoneData() {
    this.$store.set('UT', Math.floor(Date.now() / 1000))
    let data = serialize(
      utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent)),
      utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent + this.$store.get('PhoneLthNumber').withoutMask)),
      utf8ToArray(String(this.$store.get('UT'))),
      hexToArray(this.$store.get('Salt')),
      hexToArray(this.$store.get('AT')),
    );
    let fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'SecondEra', 'phase3', data);

    this.$socket.emit('listener', fullPack)
  }

  async sendNewCode(){
    this.$store.set('UT', Math.floor(Date.now() / 1000))
    let data = serialize(
      utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent + this.$store.get('PhoneLthNumber').withoutMask)),
      utf8ToArray(String(this.$store.get('UT'))),
      hexToArray(this.$store.get('Salt')),
      hexToArray(this.$store.get('AT')),
    );

    let fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'SecondEra', 'resendCode', data);

    this.$socket.emit('listener', fullPack)
  }

  async verifyCode(){
    const SGDFinalPack = serialize(
      this.$store.get('FP'),
      this.$store.get('ESClientPublicKey'),
      hexToArray(this.$store.get('AT'))
    );

    const SGDdsa = await ed25519.sign(SGDFinalPack, this.$store.get('Dask'));
    const data = serialize(SGDFinalPack, SGDdsa);

    let fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'SecondEra', 'phase7', data);

    this.$socket.emit('listener', fullPack)
  }

  async flipFlopDash(){
    let fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'SecondEra', 'phase10', hexToArray(this.$store.get('DashClient')));

    this.$socket.emit('listener', fullPack)
  }

  async sendKeyError() {
    let fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'SecondEra', 'keyError', utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent + this.$store.get('PhoneLthNumber').withoutMask)));

    this.$socket.emit('listener', fullPack)
    this.$store.set('ClearDaskDash');
  }


  async user(){
    const fullPack = await encrypt({
      AES256Key: this.$store.get('AesKey'),
      MAC256Key: this.$store.get('MacKey')
    }, 'Auth', 'user');

    this.$socket.emit('listener', fullPack)
  }

  userRes(data){
    this.$store.set('UserProfileData', data);
  }
}