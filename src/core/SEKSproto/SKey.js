import {concatArrays, arrayToHex, ecies25519} from '@/core/SEKSproto/utilites';

class SKey {
  IV; AES; MACKey;
  constructor(data = null) {
    if(data) this.initKey(data);
  }

  initKey(_bytes = null){
    const Bytes = _bytes || ecies25519.randomBytes(64);
    this.AES = Bytes.slice(0, 32);
    this.MACKey = Bytes.slice(32, 64);

    return this;
  }

  toHex(){
    return arrayToHex(concatArrays(this.IV, this.AES, this.MACKey));
  }

  toArray(){
    return concatArrays(this.AES, this.MACKey);
  }

  /**
   * Шифрование данных
   */
  async encrypt (data){
    return await ecies25519.aesCbcEncrypt(this.IV, this.AES, data);
  }

  /**
   * Дешифрование данных
   */
  async decrypt (data){
    return await ecies25519.aesCbcDecrypt(this.IV, this.AES, data);
  }

  /**
   * Шифрование данных
   */
  async encryptWithSign (data){
    let cipher = await this.encrypt(data);
    let hmac = await ecies25519.hmacSha256Sign(this.MACKey, cipher);

    return concatArrays(hmac, cipher)
  }

  /**
   * Шифрование данных
   */
  async decryptWithVerify(data){
    let mac = this.getHmacKey(data);
    let cipher = this.getCipher(data);
    let verify = await ecies25519.hmacSha256Verify(this.MACKey, cipher, mac);

    if(verify) return this.decrypt(cipher);

    throw new Error("Error verify");
  }

  getHmacKey(data) {
    return data.slice(0, 32);
  }

  getCipher(data) {
    return data.slice(32);
  }

}

export default SKey;
