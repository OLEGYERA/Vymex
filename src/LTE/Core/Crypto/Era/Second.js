import Binder from "@/LTE/Core/Helpers/Binder";
import {
  hexToArray,
  ed25519 as Ed,
  arrayToHex,
  ecies25519 as ECIES,
  CryptoJS as CRYPTO,
  arrayToWordArray,
} from '@/LTE/Core/Helpers/utilites'

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

  async phase1() {
    this.generateNewAuthData();
    setTimeout(() => this.$router.push({name: 'auth.login'}), 1000)
  }

  async phase4({dash}) {
    this.$store.set('DashServer', dash)
    await this.$router.push({name: 'auth.code'})
  }

  async phase5(code){
    const KDF1 = CRYPTO.PBKDF2(code + this.$store.get('UT'), arrayToWordArray(hexToArray(this.$store.get('Salt'))), {
      iterations: 10000
    }).toString();
    const Dask = CRYPTO.PBKDF2(KDF1, arrayToWordArray(hexToArray(this.$store.get('Salt'))), {
      keySize: 256/32,
      iterations: 1,
      hasher: CRYPTO.algo.SHA256
    }).toString();

    this.$store.set('Dask', Dask);
    this.$store.set('DashClient', arrayToHex(await Ed.getPublicKey(hexToArray(Dask))))
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
    const DashClient = await Ed.getPublicKey(Dask);

    this.$store.set('Dask', arrayToHex(Dask))
    this.$store.set('DashClient', arrayToHex(DashClient))
  }


  async newDASH({dash, user}) {
    if(!this.$store.get('IsEqualDash')){
      this.$store.set('DashServer', dash)
      this.$store.set('UserProfileData', user)
    }
  }

  async keyError(errorMessage) {
    console.log('Я штука, про которую ты забыл', errorMessage)
  }
}

export default new Second();