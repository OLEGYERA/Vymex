import { Manager } from "socket.io-client";


class Client{
  SocketManager
  SocketClient

  constructor(Options) {
    this.SocketManager = new Manager(
      Options.connection || 'ws://localhost:7777/',
      {
        autoConnect: false,
        cookie: Options.additional?.cookie || true,
        allowEIO3: Options.additional?.allowEIO3 || true,
        secure: Options.additional?.secure || false,
        path: Options.additional?.path || '/vsock',
        transports: Options.additional?.transports || ['websocket'],
        perMessageDeflate: Options.additional?.perMessageDeflate || false,
    })

  }

  Connect(){
    this.SocketClient = this.SocketManager.socket("/");
    this.SocketClient.connect()

    this.connect();
  }

  Disconnect(){
    this.SocketClient.disconnect()
  }

  connect(){
    this.On('connect', () => {
      console.log('Connected')
    })
  }

  On(listenerName, method){
    this.SocketClient.on(listenerName, method)
  }


  Emit(emitName, data){
    this.SocketClient.emit(emitName, data)
  }



}

export {
  Client
}