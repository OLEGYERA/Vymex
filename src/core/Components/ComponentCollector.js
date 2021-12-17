import Auth from "@/core/Components/Auth";
import Setting from "@/core/Components/Setting";

export default class ComponentCollector{

  constructor(storagePad, SocketClient) {
    this.auth = new Auth(storagePad, SocketClient)
    this.setting = new Setting(storagePad, SocketClient)
  }
}