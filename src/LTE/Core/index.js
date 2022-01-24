import ConsoleNotifier from "@/LTE/Core/Helpers/ConsoleNotifier";
import StoragePad from "@/LTE/Core/Helpers/StoragePad";
import Socket from "@/LTE/Core/Helpers/Socket";
import Crypto from "@/LTE/Core/Crypto"

const SEKSproto = new Crypto();

export default class Core{
  constructor(otps) {
    this.log = new ConsoleNotifier('Core');
    this.store = new StoragePad();
    this.socket = new Socket(otps.socket);
  }

  install(){
    SEKSproto._clearPrevConnectionData();
    SEKSproto.cryptoConnect(() => this.log.info('The predictor is ready to go'));
  }

  execViaComponent(component, method, data){
    if(SEKSproto.execViaComponent({component, method, data})) return this;
  }


}