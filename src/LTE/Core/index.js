import ConsoleNotifier from "@/core/ConsoleNotifier";
import StoragePad from "@/LTE/Core/Helpers/StoragePad";
import Socket from "@/LTE/Core/Helpers/Socket";
import SeksProto from "@/LTE/Core/Crypto"


export default class Core{
  constructor(otps) {
    this.log = new ConsoleNotifier('Core');
    this.store = new StoragePad();
    this.socket = new Socket(otps.socket);
    this.crypto = new SeksProto();
  }

  install(){
    this.crypto.launchScript(predictorLink => this.predictor = predictorLink)
  }
}