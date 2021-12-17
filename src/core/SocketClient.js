import { Manager } from "socket.io-client";
import ConsoleNotifier from "@/core/ConsoleNotifier";

class SocketClient{
  SocketManager
  Client

  constructor(Options) {
    this.console = new ConsoleNotifier('SocketClient');
    this.SocketManager = new Manager(
      Options.connection || 'ws://localhost:7777/',
      {
        autoConnect: false,
        cookie: Options.additional?.cookie || true,
        allowEIO3: Options.additional?.allowEIO3 || true,
        secure: Options.additional?.secure || false,
        path: Options.additional?.path || '/vsock',
        transports: Options.additional?.transports || ['websocket'],
        perMessageDeflate: Options.additional?.perMessageDeflate || true,
    });
  }

  Connect(){
    this.Client = this.SocketManager.socket("/");
    this.Client.connect()

    this.connect();
  }
  Disconnect(){
    this.Client.disconnect()
  }

  On(listenerName, method){
    this.Client.on(listenerName, method)
  }

  Emit(emitName, data){
    this.Client.emit(emitName, data)
  }


  connect(){
    this.On('connect', () => {
      this.console.success('Connecting to the Vymex server successfully!')

    })
    this.On('disconnect',() => {
      this.console.error('The connection was broken!')

    })

    this.On('error',() => {
      console.log('error')
    })
    this.On('ping',() => {
      console.log('ping')
    })
    this.On('packet',() => {
      console.log('packet')
    })
    this.On('close',() => {
      console.log('close')
    })
    this.On('reconnect_failed',() => {
      console.log('reconnect_failed')
    })
    this.On('reconnect_attempt',() => {
      console.log('reconnect_attempt')
    })
    this.On('reconnect_error',() => {
      console.log('reconnect_error')
    })
    this.On('reconnect',() => {
      console.log('reconnect')
    })
  }
}

export {
  SocketClient
}