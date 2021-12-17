import {
  bufferToArray, getPackage, checkHMACVerify, decrypt
} from '@/core/SEKSproto/utilites'

export default class PackageHelper{

  constructor(StoragePad, SClient) {
    this.storage = StoragePad;
    this.socket = SClient;
  }

  /**
   * Парсим пакет
   * @param responsePackage
   * @param next {function}
   */
  async parser(responsePackage, next){
    let packageData = getPackage(bufferToArray(responsePackage))

    let decryptedData = packageData.data.length ? await this.Decrypt(...packageData.data) : null;

    next({
      component: packageData.component,
      method: packageData.method,
      data: decryptedData
    })
  }

  /**
   * Расшифровать данные.
   *
   * @param IV128
   * @param mac
   * @param cipher
   * @returns Uint8Array
   */
  async Decrypt(IV128, mac, cipher){
    await this.CheckHMACVerify(IV128, mac, cipher);

    return await decrypt(IV128, this.storage.get('AesKey'), cipher);
  }

  /**
   * Проверяем подпись пакета.
   *
   * @param data
   */
  async CheckHMACVerify(...data){
    let HMACVerify = await checkHMACVerify(this.storage.get('MacKey'), ...data);

    // Убиваем соединение.
    if(!HMACVerify){
      this.socket.Disconnect();
      throw new Error('HMAC not Verify\n');
    }
  }
}