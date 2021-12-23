/*eslint-disable*/
import {deserialize, arrayToNumber, arrayToUtf8} from "@/core/SEKSproto/utilites";
import UploadFile from "@/core/File/UploadFile";

export default class Uploader{

  constructor(storagePad, SocketClient) {
    this.storage = storagePad;
    this.SClient = SocketClient;
  }

  async init(data){
    const file = data[0], onprogress = data[1] ? data[1] : null, onerror = data[2] ? data[2] : null,
      onload = data[3] ? data[3] : null;

    let uploadFile = new UploadFile(this.storage, this.SClient, file, onprogress, onerror, onload);
    this.start(uploadFile);
  }

  start (uploadFile){
    this.storage.set('UploadingFile', uploadFile)
    uploadFile.startHandler();
  }

  async complete (data){
    let deserializeData = deserialize(data);
    let id = arrayToNumber(deserializeData[1]);
    this.storage.get('UploadingFile')[arrayToUtf8(deserializeData[0])].completeHandler(id);
  }

  async next (data){
    let f = this.storage.get('UploadingFile')[arrayToUtf8(data)];
    f.reader.readAsArrayBuffer(f.getChunk())
  }
}