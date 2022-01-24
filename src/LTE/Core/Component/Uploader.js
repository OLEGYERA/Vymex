import Binder from "@/LTE/Core/Helpers/Binder";
import UploadFile from "@/LTE/Core/Helpers/UploadFile";
import {deserialize, arrayToNumber, arrayToUtf8} from "@/LTE/Core/Helpers/utilites";

class Uploader extends Binder{
  constructor() {
    super();
  }

  async init(data){
    const file = data[0], onprogress = data[1] ? data[1] : null, onerror = data[2] ? data[2] : null,
      onload = data[3] ? data[3] : null;
    let uploadFile = new UploadFile(this.$store, this.$socket, file, onprogress, onerror, onload);

    this.start(uploadFile, arguments[1][0]);
  }

  start(uploadFile, key){
    this.$store.set('UploadingFile', uploadFile);
    uploadFile.startHandler(key);
  }

  async complete(data){
    let deserializeData = deserialize(data);
    let id = arrayToNumber(deserializeData[1]);
    this.$store.get('UploadingFile')[arrayToUtf8(deserializeData[0])].completeHandler(id);
  }

  async next(data){
    console.time('Function Load')
    let file = this.$store.get('UploadingFile')[arrayToUtf8(data)];
    file.getReader(arguments[1][0]).readAsArrayBuffer(file.getChunk());
    console.timeEnd('Function Load')
  }

  async error(d){
    console.log(d);
  }
}

export default new Uploader();