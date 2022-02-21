import {ecies25519 as ECIES, bufferToArray, serialize, hexToArray, utf8ToArray, concatArrays} from '@/LTE/Core/Helpers/utilites'
import Binder from "@/LTE/Core/Helpers/Binder";

let EsClPrKey;

class Zero extends Binder{
  async createKeyPair(){
    const keyPair = ECIES.generateKeyPair();
    EsClPrKey = keyPair.privateKey;
    this.$store.set('EsClPbKey', keyPair.publicKey);
  }

  async createFGDPack(ServerPublicKey){
    //createSharedKey
    const ESSharedKey = await ECIES.derive(EsClPrKey, bufferToArray(ServerPublicKey));

    //createAesMacKeys
    let ShK512 = await ECIES.sha512(ESSharedKey);
    const AES256MAC = [ECIES.getEncryptionKey(ShK512), ECIES.getMacKey(ShK512)];

    //createFGD
    let IV128 = ECIES.randomBytes(16);
    const FGDcipher = await ECIES.aesCbcEncrypt(IV128, AES256MAC[0], serialize(hexToArray(this.$store.get('AT')), utf8ToArray(this.$store.get('FP'))));
    const FGDmac = await ECIES.hmacSha256Sign(AES256MAC[1], concatArrays(IV128, this.$store.get('EsClPbKey'), FGDcipher))

    //return FGDpac and AesMacKeys
    return [AES256MAC, concatArrays(IV128, this.$store.get('EsClPbKey'), FGDmac, FGDcipher)];
  }
}

export default new Zero();

