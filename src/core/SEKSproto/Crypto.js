import Storage from "@/storage";
import SP from "@/core/StoragePad"
import EraCollector from "@/core/SEKSproto/Era/EraCollector";
import Predictor from "@/core/Predictor";
import {SocketClient} from "@/core/SocketClient";
import PH from "@/core/SEKSproto/PackageHelper"
import ConsoleNotifier from "@/core/ConsoleNotifier";



class Crypto{
  constructor(Options) {
    this.console = new ConsoleNotifier('Сrypto');
    this.storagePad = new SP(Storage)
    this.Era = new EraCollector(this.storagePad)
    const FilteredSocketOptions = Options ? Options?.socketClient : {}
    this.SClient = new SocketClient(FilteredSocketOptions)
    this.packageHelper = new PH(this.storagePad, this.SClient)
  }

  launchScript(next){
    this.clearPastConnectionData();
    this.Predictor = new Predictor(this.Era, this.storagePad, this.SClient);

    this.prepareKeyPair(() => {
      this.getPublicKey((FGDFullPack) => {
        this.sendPublicKey(FGDFullPack)
        next(this.Predictor)
        this.console.info('The predictor is ready to go')
        this.createGlobalListener(responsePackage => {
          this.parsingGlobalListenerResponse(responsePackage)
        })
      })
    })
  }

  /*
  * Zero Stage
  **/
  clearPastConnectionData(){
    this.storagePad.set('TempAT', '') //очистка от блокировщика
    this.storagePad.set('ClientBlocking', null) //очистка от блокировщика
  }


  /*
  * First Stage
  **/
  prepareKeyPair(next){
    this.Era.zero.createKeyPair().then(() => next())
  }

  /*
  * Second Stage
  **/
  getPublicKey(next){
    this.SClient.Connect()

    this.SClient.On('setPublicKey', (ServerPublicKey) => {
      this.Era.zero.createFGDfullPack(ServerPublicKey).then(FGDFullPack => next(FGDFullPack))
    })
  }

  /*
  * Third Stage
  **/
  sendPublicKey(FGDFullPack){
    this.SClient.Emit('setPublicKey', FGDFullPack)
  }

  /*
  * Fourth Stage
  **/
  createGlobalListener(responsePackage){
    this.SClient.On('listener', response => responsePackage(response))
  }

  /*
  * Fiveth Stage
  **/
  parsingGlobalListenerResponse(responsePackage){
    this.packageHelper.parser(responsePackage, (parsedData) => {
      this.Predictor.dataPreparation(parsedData).runPredictedData()
    })
  }
}

export {
  Crypto
}