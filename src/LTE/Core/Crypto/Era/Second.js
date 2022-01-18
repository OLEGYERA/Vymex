import Binder from "@/LTE/Core/Helpers/Binder";
import {ecies25519 as ECIES, ed25519 as ED, CryptoJS as CRYPTO, arrayToHex, arrayToWordArray, hexToArray} from '@/core/SEKSproto/utilites'

class Second extends Binder{
  constructor() {
    super();
  }
  generateNewAuthData(){
    if(this.$store.get('AT').length === 0){
      this.$store.set('AT', arrayToHex(ECIES.randomBytes(16)))
      this.$store.set('Salt', arrayToHex(ECIES.randomBytes(16)))
    }
  }

  /**
   * Фаза - 1
   * Ввод номер телефона.
   */
  async phase1() {
    this.generateNewAuthData()
    setTimeout(() => this.$router.push({name: 'auth.login'}), 1000)
  }

  /**
   * Фаза - 4
   * Запись DASH.
   *
   * @param data
   */
  async phase4(data) {
    this.$store.set('DashServer', data.dash)
    await this.$router.push({name: 'auth.code'})
  }

  async phase5(code){
    const KDF1 = CRYPTO.PBKDF2(code + this.$store.get('UT'), arrayToWordArray(hexToArray(this.$store.get('Salt'))), {
      iterations: 10000
    }).toString();

    this.$store.set('Dask', CRYPTO.PBKDF2(KDF1, arrayToWordArray(hexToArray(this.$store.get('Salt'))), {
      keySize: 256/32,
      iterations: 1,
      hasher: CRYPTO.algo.SHA256
    }).toString());

    const DashClient = await ED.getPublicKey(hexToArray(this.$store.get('Dask')));
    this.$store.set('DashClient', arrayToHex(DashClient))
  }

  async phase6() {
    if(!this.$store.get('DashClient')){
      await this.$router.push({name: 'auth.code'})
    }
    if(this.$store.get('IsEqualDash')){
      const UTat = Math.floor(Date.now() / 1000);
      const AT256 = CRYPTO.SHA256(this.$store.get('AT') + UTat).toString();
      this.$store.set('AT', AT256);

      await this.$router.push({name: 'auth.pending.code.verification'})
    }
  }

  async phase10() {
    const Dask = ECIES.randomBytes(32);
    const DashClient = await ED.getPublicKey(Dask);

    this.$store.set('Dask', arrayToHex(Dask))
    this.$store.set('DashClient', arrayToHex(DashClient))
  }

  async newDASH(data) {
    if(!this.$store.get('IsEqualDash')){
      this.$store.set('DashServer', data.dash)
      this.$store.set('UserProfileData', data.user)
    }
  }

  async keyError(errorMessage) {
    console.log('Я штука, про которую ты забыл', errorMessage)
  }
}

export default new Second();
