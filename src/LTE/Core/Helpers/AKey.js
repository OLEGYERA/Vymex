import {ecies25519} from '@/LTE/Core/Helpers/utilites';

class AKey{
  publicKey; privateKey;

  constructor(password) {
    if(password){
      const entropy = ecies25519.sha256Sync(password)
      const keyPair = ecies25519.generateKeyPair(entropy);

      this.publicKey = keyPair.publicKey;
      this.privateKey = keyPair.privateKey;
    }
  }

  encrypt(data){
    return ecies25519.encryptSync(data, this.publicKey);
  }

  encryptCustomPK(data){
    return ecies25519.encryptSync(data, this.publicKey);
  }

  decrypt(data){
    return ecies25519.decryptSync(data, this.privateKey);
  }
}

export {AKey}
