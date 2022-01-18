import Binder from "@/LTE/Core/Helpers/Binder";
import UploadFile from "@/LTE/Core/Helpers/UploadFile";
import {deserialize, arrayToNumber, arrayToUtf8} from "@/core/SEKSproto/utilites";

class Uploader extends Binder{
  constructor() {
    super();
  }

  async init(data){
    const file = data[0], onprogress = data[1] ? data[1] : null, onerror = data[2] ? data[2] : null,
      onload = data[3] ? data[3] : null;

    let uploadFile = new UploadFile(this.$store, this.$socket, file, onprogress, onerror, onload);
    this.start(uploadFile);
  }

  start (uploadFile){
    this.$store.set('UploadingFile', uploadFile)
    uploadFile.startHandler();
  }

  async complete (data){
    let deserializeData = deserialize(data);
    let id = arrayToNumber(deserializeData[1]);
    this.$store.get('UploadingFile')[arrayToUtf8(deserializeData[0])].completeHandler(id);
  }

  async next (data){
    let f = this.$store.get('UploadingFile')[arrayToUtf8(data)];
    f.reader.readAsArrayBuffer(f.getChunk())
  }
}

export default new Uploader();