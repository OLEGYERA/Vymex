import {
  CryptoJS,
  serialize,
  utf8ToArray,
  encryptFile
} from "@/core/SEKSproto/utilites";


export default class UploadFile{
  offset = 0;
  chunkSize = 940048;
  success = false;
  uploadComplete = false;
  reader = this.getReader();
  serverComponent = 'Uploader'

  constructor(storagePad, SocketClient, file, onprogress, onerror, onload) {
    this.storage = storagePad;
    this.SClient = SocketClient;

    this.file = file;
    this.hash = this.generateHash();

    this.onprogress = onprogress;
    this.onerror = onerror;
    this.onload = onload;
  }


  getReader (){
    let reader = new FileReader();
    console.log('reader')
    reader.onprogress = () => this.progressHandler();
    reader.onload = (e) => this.loadedHandler(e);
    reader.onerror = () => this.errorHandler();

    return reader;
  }

  /**
   * Отправка части файла.
   *
   * @param e
   * @returns {Promise<void>}
   */
  async loadedHandler(e) {
    if(this.uploadComplete) return;
    await this.emitCommand('chunk', serialize(this.hash, new Uint8Array(e.target.result)))
    this.checkRemainder();
  }

  /**
   * Проверка окончания загрузки файла.
   */
  checkRemainder() {
    this.offset += this.chunkSize;
    if (this.offset >= this.file.size) {
      this.transmitDone();
    }
  }

  /**
   * Отправка первого пакета, старт загрузки
   */
  startHandler(){
    let data = serialize(this.hash, this.file.name);
    this.emitCommand('start', data)
  }

  /**
   * Вызов функции callback для возврата ошибки.
   */
  errorHandler(){
    this.uploadComplete = true;
    this.success = false;
    this.onerror();
  }

  /**
   * Вызов функции callback для возврата id файла.
   */
  completeHandler(id){
    this.uploadComplete = true;
    this.success = true;
    this.onload(id);
  }

  /**
   * Вызов функции callback для возврата прогресса загрузки файла.
   */
  progressHandler() {
    if(this.onprogress){
      let offset = this.offset > this.file.size ? this.file.size : this.offset;
      this.onprogress(100/ this.file.size  * offset);
    }
  }

  /**
   * Отправка финального пакета для завершения загрузки.
   *
   * @returns {Promise<void>}
   */
  transmitDone(){
    this.uploadComplete = true;
    this.success = true;


    this.emitCommand('done', utf8ToArray(this.hash))
  }

  /**
   * Отправка пакетов.
   * Подразумевается обычное шифроание данных.
   *
   * @param method
   * @param data
   * @param addData
   * @returns {Promise<void>}
   */
  async emitCommand(method, data, addData = null){

    const fullPack = await encryptFile({
      AES256Key: this.storage.get('AesKey'),
      MAC256Key: this.storage.get('MacKey')
    }, this.serverComponent, method, data, addData);

    this.SClient.Emit('listener', fullPack);
  }

  /**
   * Генерация хеша.
   *
   * @returns string
   */
  generateHash() {
    return CryptoJS.SHA1((new Date()).getTime() + this.storage.get('FP')).toString()
  }

  /**
   * Получение чанка.
   *
   * @returns {*}
   */
  getChunk() {
    return  this.file.slice(this.offset, Math.min(this.offset + this.chunkSize, this.file.size));
  }
}
