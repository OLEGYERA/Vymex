import {
  ecies25519 as ECIES,
  bufferToArray, serialize,
  hexToArray, utf8ToArray,
  concatArrays
} from '@/core/SEKSproto/utilites'

export default class Zero{

  constructor(StoragePad) {
    this.storage = StoragePad;
  }

  /**
   * Фаза - 3
   * Генерация пары ключей
   */
  async createKeyPair(){
    const keys = ECIES.generateKeyPair();

    this.storage.set('ESClientKeys', {
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
  async createSharedKey(ServerPublicKey) {
    this.storage.set('ESServerPublicKey', ServerPublicKey);

    const sharedKey = await ECIES.derive(
      this.storage.get('ESClientPrivateKey'),
      ServerPublicKey
    )

    this.storage.set('ESShareKey', sharedKey)

    return this.createAesMacKeys();
  }

  /**
   * Фаза - 6
   * Подготовка опций шифрования
   */
  async createAesMacKeys() {
    let ShK512 = await ECIES.sha512(this.storage.get('ESSharedKey'));
    this.storage.set('AesMacKeys', [ECIES.getEncryptionKey(ShK512), ECIES.getMacKey(ShK512)])


   return this.createFGD();
  }

  /**
   * Фаза - 7
   * Шифрование FGD.
   */

  async createFGD(){
    let IV128 = ECIES.randomBytes(16);

    const FGDmsg = serialize(
      hexToArray(this.storage.get('AT')),
      utf8ToArray(this.storage.get('FP')),
    )

    const FGDcipher = await ECIES.aesCbcEncrypt(
      IV128,
      this.storage.get('AesKey'),
      FGDmsg
    );
    this.storage.set('FGDcipher', FGDcipher);


    let FGDmacData = concatArrays(
      IV128,
      this.storage.get('ESClientPublicKey'),
      this.storage.get('FGDcipher'),
    );


    const FGDmac = await ECIES.hmacSha256Sign(
      this.storage.get('MacKey'),
      FGDmacData
    );


    this.storage.set('FGDmac', FGDmac);

    return this.getPublicKey(IV128);
  }

  /**
   * Фаза - 8
   * Отправка FGD на Socket Server
   */
  getPublicKey(IV128) {
    return concatArrays(
      IV128,
      this.storage.get('ESClientPublicKey'),
      this.storage.get('FGDmac'),
      this.storage.get('FGDcipher'),
    );
  }
}

