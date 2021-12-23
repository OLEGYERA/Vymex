import Auth from "@/core/Components/Auth";
import Setting from "@/core/Components/Setting";
import Uploader from "@/core/Components/Uploader";


import Api from "@/core/Components/Api";

export default class ComponentCollector{

  constructor(storagePad, SocketClient) {
    this.auth = new Auth(storagePad, SocketClient)
    this.setting = new Setting(storagePad, SocketClient)
    this.uploader = new Uploader(storagePad, SocketClient)


    this.api = new Api(storagePad, SocketClient)

  }
}