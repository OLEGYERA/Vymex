import Binder from "@/LTE/Core/Helpers/Binder";
import {serialize, utf8ToArray, hexToArray, ed25519, encrypt} from '@/LTE/Core/Helpers/utilites'

class Auth extends Binder{
  async getCountries(){
    this.$socket.emit('listener', await encrypt(...arguments[1]));
  }
  setCountries(data){
    this.$store.set('Countries', data);
  }

  async sendPhoneData() {
    this.$store.set('UT', Math.floor(Date.now() / 1000));
    console.log(String(this.$store.get('ChooseCountry').phoneIdent), '1111')
    let data = serialize(
      utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent)),
      utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent + this.$store.get('PhoneLthNumber').withoutMask)),
      utf8ToArray(String(this.$store.get('UT'))),
      hexToArray(this.$store.get('Salt')),
      hexToArray(this.$store.get('AT')),
    );
    this.$socket.emit('listener', await encrypt(arguments[1][0], 'SecondEra', 'phase3', data))
  }
  async sendNewCode(){
    this.$store.set('UT', Math.floor(Date.now() / 1000))
    let data = serialize(
      utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent + this.$store.get('PhoneLthNumber').withoutMask)),
      utf8ToArray(String(this.$store.get('UT'))),
      hexToArray(this.$store.get('Salt')),
      hexToArray(this.$store.get('AT')),
    );

    this.$socket.emit('listener', await encrypt(arguments[1][0], 'SecondEra', 'phase7', data))
  }

  async verifyCode(){
    const SGDFinalPack = serialize(
      this.$store.get('FP'),
      this.$store.get('EsClPbKey'),
      hexToArray(this.$store.get('AT'))
    );
    const SGDdsa = await ed25519.sign(SGDFinalPack, this.$store.get('Dask'));
    const data = serialize(SGDFinalPack, SGDdsa);

    this.$socket.emit('listener', await encrypt(arguments[1][0], 'SecondEra', 'phase7', data))
  }

  async flipFlopDash(){
    this.$socket.emit('listener', await encrypt(arguments[1][0], 'SecondEra', 'phase10', hexToArray(this.$store.get('DashClient'))))
  }

  async sendKeyError() {
    const Tel = utf8ToArray(String(this.$store.get('ChooseCountry').phoneIdent + this.$store.get('PhoneLthNumber').withoutMask));
    this.$socket.emit('listener', await encrypt(arguments[1][0], 'SecondEra', 'keyError', Tel))
    this.$store.set('ClearDaskDash');
  }

  async user(){
    this.$socket.emit('listener', await encrypt(...arguments[1]))
  }

  userRes(data){
    this.$store.set('UserProfileData', data);
  }
}

export default new Auth();