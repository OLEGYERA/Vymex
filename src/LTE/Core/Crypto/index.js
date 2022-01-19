import Binder from "@/LTE/Core/Helpers/Binder";
import Era from "./Era";
import Component from "@/LTE/Core/Component";
import Predictor from "@/LTE/Core/Helpers/Predictor";
import Packager from "./Packager"

export default class Crypto extends Binder{
  Predictor;
  Packager;

  constructor() {
    super();
    this.Packager = new Packager();
  }
  launchScript(next){
    this.clearPastConnectionData();
    this.Predictor = new Predictor(Object.assign(Era, Component));

    this.prepareKeyPair(() => {
      this.getPublicKey((FGDFullPack) => {
        this.sendPublicKey(FGDFullPack);
        next(this.Predictor)
        this.$log.info('The predictor is ready to go')
        this.createGlobalListener(resPackage => this.parsingGlobalListenerResponse(resPackage))
      })
    })
  }
  clearPastConnectionData(){
    this.$store.set('TempAT', '') //очистка от блокировщика
    this.$store.set('ClientBlocking', null) //очистка от блокировщика
  }
  prepareKeyPair(next){
    Era.zero.createKeyPair().then(() => next())
  }
  getPublicKey(next){
    this.$socket.connect()
    this.$socket.on('setPublicKey', (serverPubKey) => {
      Era.zero.createFGDfullPack(serverPubKey).then(pack => next(pack)) //FGDFullPack => pack
    })
  }
  sendPublicKey(pack){
    this.$socket.emit('setPublicKey', pack) //FGDFullPack => pack
  }
  createGlobalListener(resPackage){
    this.$socket.on('listener', response => resPackage(response))
  }
  parsingGlobalListenerResponse(resPackage){
    this.Packager.Parse(resPackage, (preparedPackage) => {
      this.Predictor.Process(preparedPackage);
    })
  }
}
