import {ecies25519 as ECIES, bufferToArray, serialize, hexToArray, utf8ToArray, concatArrays} from '@/core/SEKSproto/utilites'
import Binder from "@/LTE/Core/Helpers/Binder";

class Zero extends Binder{
  /**
   * Фаза - 3
   * Генерация пары ключей
   */
  async createKeyPair(){
    const keys = ECIES.generateKeyPair();

    this.$store.set('ESClientKeys', {
      public: keys.publicKey,
      private: keys.privateKey
    })
  }
  /**
   * Фазы - launch 5 phase
   * Cборка
   */
  async createFGDfullPack(ServerPublicKey){
    return this.createSharedKey(bufferToArray(ServerPublicKey))
  }
  /**
   * Фаза - 5
   * Созданеи общего ключа шифрования
   */
  async createSharedKey(serverPubKey) {
    this.$store.set('ESServerPublicKey', serverPubKey);
    this.$store.set('ESShareKey', await ECIES.derive(this.$store.get('ESClientPrivateKey'), serverPubKey))
    return this.createAesMacKeys();
  }
  /**
   * Фаза - 6
   * Подготовка опций шифрования
   */
  async createAesMacKeys() {
    let ShK512 = await ECIES.sha512(this.$store.get('ESSharedKey'));
    this.$store.set('AesMacKeys', [ECIES.getEncryptionKey(ShK512), ECIES.getMacKey(ShK512)])
   return this.createFGD();
  }
  /**
   * Фаза - 7
   * Шифрование FGD.
   */
  async createFGD(){
    let IV128 = ECIES.randomBytes(16);
    const FGDmsg = serialize(hexToArray(this.$store.get('AT')), utf8ToArray(this.$store.get('FP')));
    const FGDcipher = await ECIES.aesCbcEncrypt(IV128, this.$store.get('AesKey'), FGDmsg);
    this.$store.set('FGDcipher', FGDcipher);
    let FGDmacData = concatArrays(IV128, this.$store.get('ESClientPublicKey'), this.$store.get('FGDcipher'));
    this.$store.set('FGDmac', await ECIES.hmacSha256Sign(this.$store.get('MacKey'), FGDmacData));
    return this.getPublicKey(IV128);
  }
  /**
   * Фаза - 8
   * Отправка FGD на Socket Server
   */
  getPublicKey(IV128) {
    return concatArrays(
      IV128,
      this.$store.get('ESClientPublicKey'),
      this.$store.get('FGDmac'),
      this.$store.get('FGDcipher'),
    );
  }
}

export default new Zero();

