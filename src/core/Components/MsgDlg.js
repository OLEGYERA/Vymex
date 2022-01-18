/*
eslint-disable
*/
import {encrypt, hexToArray, numberToArray, serialize, utf8ToArray, ecies25519} from "@/core/SEKSproto/utilites";
import SKey from '@/core/SEKSproto/SKey'
export default class MsgDlg{
  name='MsgDlg'

  constructor(storagePad, SocketClient) {
    this.storage = storagePad;
    this.SClient = SocketClient;
    this.SKey = new SKey();
    console.log(this.constructor.name)
  }


  async create(dialog){
    const dlg_access_hash = this.SKey.initKey().toArray(),
          dlg_partner_enc_hash = ecies25519.encryptSync(dlg_access_hash, hexToArray(dialog.pk)),
          dlg_personal_enc_hash = ecies25519.encryptSync(dlg_access_hash, hexToArray(this.storage.get('UserPK')));

    console.log(dlg_partner_enc_hash, dlg_personal_enc_hash)

    const SGDFinalPack = serialize(
      numberToArray(dialog.id),
      dlg_partner_enc_hash,
      dlg_personal_enc_hash
    );

    const fullPack = await encrypt({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, this.name, 'create', SGDFinalPack);

    this.SClient.Emit('listener', fullPack)
  }


  //chat model
  // {
  //   "id": 3,
  //   "avatar": null,
  //   "type": "dialog",
  //   "title": "Валерия Пермякова",
  //   "alias": "user_2",
  //   "unread": 0,
  //   "key": "57f288f1394975e47b58165ebf8a2788ee60eb9d26f425f6d5a588f9134c2e5c",
  //   "lastMessage": null,
  //   "status": null
  // }
  createRes(newDialog){
    console.log(newDialog)
    // this.storage.set('MsgSearchContacts', contacts)
  }


}