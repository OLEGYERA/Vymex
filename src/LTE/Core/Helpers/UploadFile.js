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



  constructor(store, socket, file, onprogress, onerror, onload) {
    this.$store = store;
    this.$socket = socket;
    this.file = file;
    this.hash = this.generateHash();

    this.onprogress = onprogress;
    this.onerror = onerror;
    this.onload = onload;
  }


  getReader (){
    let reader = new FileReader();
    reader.onprogress = () => this.progressHandler();
    reader.onload = (e, b) => this.loadedHandler(e, b);
    reader.onerror = () => this.errorHandler();

    return reader;
  }

  /**
   * Отправка части файла.
   *
   * @param e
   * @param b
   * @returns {Promise<void>}
   */
  async loadedHandler(e, b) {
    console.log(b)
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
  startHandler(_enc_key){
    let data = serialize(this.hash, this.file.name);
    this.emitCommand('start', data, _enc_key)
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
   * @param enc_key
   * @param addData
   * @returns {Promise<void>}
   */
  async emitCommand(method, data, enc_key, addData = null){
    await encryptFile(enc_key, this.serverComponent, method, data, addData);
  }

  /**
   * Генерация хеша.
   *
   * @returns string
   */
  generateHash() {
    return CryptoJS.SHA1((new Date()).getTime() + this.$store.get('FP')).toString()
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
