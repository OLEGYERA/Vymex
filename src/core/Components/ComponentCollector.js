import Auth from "@/core/Components/Auth";
import Setting from "@/core/Components/Setting";
import Uploader from "@/core/Components/Uploader";
import Faq from '@/core/Components/Faq';
import Tasks from "@/core/Components/Tasks";
import Company from "@/core/Components/Company";

import Api from "@/core/Components/Api";

export default class ComponentCollector{

  constructor(storagePad, SocketClient) {
    this.auth = new Auth(storagePad, SocketClient)
    this.setting = new Setting(storagePad, SocketClient)
    this.uploader = new Uploader(storagePad, SocketClient)
    this.faq = new Faq(storagePad, SocketClient)
    this.tasks = new Tasks(storagePad, SocketClient)
    this.company = new Company(storagePad, SocketClient)

    this.api = new Api(storagePad, SocketClient)

  }
}