import {Crypto} from '@/core/SEKSproto/Crypto'

class Engine{
  constructor(Options) {
    this.crypto = new Crypto({socketClient: Options?.socketClient})
    this.install()
  }

  install(){
    this.crypto.launchScript(predictor => {
      this.Predictor = predictor;
    })
  }
}




export {
  Engine
}