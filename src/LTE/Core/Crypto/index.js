import Binder from "@/LTE/Core/Helpers/Binder";
import Era from "./Era";
import Component from "@/LTE/Core/Component";
import Packager from "./Packager"

export default class Crypto extends Binder{
  constructor() {
    super();
    this.packager = new Packager(Object.assign(Era, Component), ['Uploader'])
  }
  cryptoConnect(callback){
    const handshake = Era.Zero;
    handshake.createKeyPair().then(() => {
      this.$socket.connect();
      this.$socket.on('setPublicKey', (serverPubKey) => {
        handshake.createFGDPack(serverPubKey).then(pack => {
          this.packager.__setPackagerKey(pack[1])
          this.$socket.emit('setPublicKey', pack[0]);
          callback();
          this._runGlobalListeners(pac => this.packager.predictor(pac));
        })
      })
    })
  }
  execViaComponent(packageWrapper){
    const groupText = `EXEC --> | Component: ${packageWrapper.component}, Method: ${packageWrapper.method} | Data: ${!!packageWrapper.data}`;
    console.groupCollapsed(groupText);
    console.log(packageWrapper.data);
    console.groupEnd(groupText);

    return this.packager.wrapUp(packageWrapper);
  }
  _runGlobalListeners(resPackage){
    this.$socket.on('listener', response => resPackage(response))
  }
  _clearPrevConnectionData(){
    this.$store.set('TempAT', '') //очистка от блокировщика
    this.$store.set('ClientBlocking', null) //очистка от блокировщика
  }

}
