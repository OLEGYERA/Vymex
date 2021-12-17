/*eslint-disable*/

import {
  ecies25519 as ECIES,
  CryptoJS as CRYPTO,
  arrayToHex,
  arrayToWordArray,
  hexToArray
} from '@/core/SEKSproto/utilites'
import Router from '@/router'
import * as ed25519 from "noble-ed25519";
import * as ecies25519 from "ecies-25519";

export default class Second{

  constructor(StoragePad) {
    this.storage = StoragePad;
    this.router = Router;
  }

  generateNewAuthData(){
    if(this.storage.get('AT').length === 0){
      this.storage.set('AT', arrayToHex(ECIES.randomBytes(16)))
      this.storage.set('Salt', arrayToHex(ECIES.randomBytes(16)))
    }
  }

  /**
   * Фаза - 1
   * Ввод номер телефона.
   */
  async phase1() {
    this.generateNewAuthData()
    setTimeout(() => this.router.push({name: 'auth.login'}), 1000)
  }


  /**
   * Фаза - 4
   * Запись DASH.
   *
   * @param data
   */
  async phase4(data) {
    this.storage.set('DashServer', data.dash)
    await this.router.push({name: 'auth.code'})
  }

  async phase5(code){
    const KDF1 = CRYPTO.PBKDF2(code + this.storage.get('UT'), arrayToWordArray(hexToArray(this.storage.get('Salt'))), {
      iterations: 10000
    }).toString();

    this.storage.set('Dask', CRYPTO.PBKDF2(KDF1, arrayToWordArray(hexToArray(this.storage.get('Salt'))), {
      keySize: 256/32,
      iterations: 1,
      hasher: CRYPTO.algo.SHA256
    }).toString());

    const DashClient = await ed25519.getPublicKey(hexToArray(this.storage.get('Dask')));
    this.storage.set('DashClient', arrayToHex(DashClient))
  }

  async phase6() {
    if(!this.storage.get('DashClient')){
      await this.router.push({name: 'auth.code'})
    }
    if(this.storage.get('IsEqualDash')){
      const UTat = Math.floor(Date.now() / 1000);
      const AT256 = CRYPTO.SHA256(this.storage.get('AT') + UTat).toString();
      this.storage.set('AT', AT256);

      await this.router.push({name: 'auth.pending.code.verification'})
    }
  }

  async phase10() {
    const Dask = ecies25519.randomBytes(32);
    const DashClient = await ed25519.getPublicKey(Dask);

    this.storage.set('Dask', arrayToHex(Dask))
    this.storage.set('DashClient', arrayToHex(DashClient))
  }

  async newDASH(data) {
    if(!this.storage.get('IsEqualDash')){
      this.storage.set('DashServer', data.dash)
      this.storage.set('UserProfileData', data.user)
    }
  }

  async keyError(errorMessage) {
    console.log('Я штука, про которую ты забыл')
  }


}