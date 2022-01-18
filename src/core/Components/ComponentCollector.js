import Auth from "@/core/Components/Auth";
import Setting from "@/core/Components/Setting";
import Uploader from "@/core/Components/Uploader";
import Faq from '@/core/Components/Faq';



import Api from "@/core/Components/Api";
import MsgContact from "@/core/Components/MsgContact";
import MsgDlg from "@/core/Components/MsgDlg";

export default class ComponentCollector{

  constructor(storagePad, SocketClient) {
    this.auth = new Auth(storagePad, SocketClient)
    this.setting = new Setting(storagePad, SocketClient)
    this.uploader = new Uploader(storagePad, SocketClient)
    this.faq = new Faq(storagePad, SocketClient)
    this.api = new Api(storagePad, SocketClient)
    this.msgContact = new MsgContact(storagePad, SocketClient)
    this.msgDlg = new MsgDlg(storagePad, SocketClient)
  }
}