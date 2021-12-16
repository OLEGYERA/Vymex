import {
  bufferToArray, getPackage, checkHMACVerify, decrypt
} from '@/core/SEKSproto/utilites'

export default class CryptoHelper{

  /**
   * Парсим пакет
   * @param data
   */
  async ParsingPackage(data){
    let packageData = getPackage(bufferToArray(data))

    let decryptedData = packageData.data.length ? await this.Decrypt(...packageData.data) : null;
    let component = new components[pac.component](this.$socket, this);

    component[pac.method](decryptedData, pac.data)
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
    this.CheckHMACVerify(IV128, mac, cipher);

    return await decrypt(IV128, this.$store.state.vxData.AES256Key, cipher);
  },

  /**
   * Проверяем подпись пакета.
   *
   * @param data
   */
  async CheckHMACVerify(...data){
    let HMACVerify = await checkHMACVerify(this.$store.state.vxData.MAC256Key, ...data);

    // Убиваем соединение.
    if(!HMACVerify){
      this.$socket.disconnect();
      throw new Error('HMAC not Verify\n');
    }
  }
}