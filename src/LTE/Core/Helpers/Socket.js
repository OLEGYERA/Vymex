import { Manager } from "socket.io-client";
import Binder from "@/LTE/Core/Helpers/Binder";

export default class SocketClient extends Binder{
  client;
  constructor(opts) {
    super();
    this._manager = new Manager(opts.connection || 'ws://localhost:7777/',
      {
        autoConnect: false,
        cookie: opts.additional?.cookie || true,
        allowEIO3: opts.additional?.allowEIO3 || true,
        secure: opts.additional?.secure || false,
        path: opts.additional?.path || '/vsock',
        transports: opts.additional?.transports || ['websocket'],
        perMessageDeflate: opts.additional?.perMessageDeflate || true,
      });
  }
  connect(){
    this.client = this._manager.socket("/");
    this.client.connect()
    this.runConnectHooks();
  }
  disconnect(){
    this.client.disconnect()
  }
  on(listenerName, method){
    this.client.on(listenerName, method)
  }
  emit(emitName, data){
    this.client.emit(emitName, data)
  }
  runConnectHooks(){
    this.on('connect', () => {
      this.$log.success('Connecting to the Vymex server successfully!')
    })
    this.on('disconnect',() => {
      this.$log.error('The connection was broken!')
    })

    this.on('error',() => {
      console.log('error')
    })
    this.on('ping',() => {
      console.log('ping')
    })
    this.on('packet',() => {
      console.log('packet')
    })
    this.on('close',() => {
      console.log('close')
    })
    this.on('reconnect_failed',() => {
      console.log('reconnect_failed')
    })
    this.on('reconnect_attempt',() => {
      console.log('reconnect_attempt')
    })
    this.on('reconnect_error',() => {
      console.log('reconnect_error')
    })
    this.on('reconnect',() => {
      console.log('reconnect')
    })
  }
}