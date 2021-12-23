/*eslint-disable*/
import {encrypt, serialize, utf8ToArray, numberToArray} from '@/core/SEKSproto/utilites'

export default class Api{

  constructor(storagePad, SocketClient) {
    this.storage = storagePad;
    this.SClient = SocketClient;
  }

  async testApi(emittedData){

    let dataArray = [];

    emittedData.data.forEach(data => {
      if(data.input !== null){
        dataArray.push(this.transformData(data.type.title, data.input))
      }
    })
    let fullPack;

    if(dataArray.length === 1){
      fullPack = await encrypt({
        AES256Key: this.storage.get('AesKey'),
        MAC256Key: this.storage.get('MacKey')
      }, emittedData.name, emittedData.method, ...dataArray);
    } else if(dataArray.length > 1){
      fullPack = await encrypt({
        AES256Key: this.storage.get('AesKey'),
        MAC256Key: this.storage.get('MacKey')
      }, emittedData.name, emittedData.method, serialize(...dataArray));
    } else {
      fullPack = await encrypt({
        AES256Key: this.storage.get('AesKey'),
        MAC256Key: this.storage.get('MacKey')
      }, emittedData.name, emittedData.method);
    }

    console.log(dataArray)

    this.SClient.Emit('listener', fullPack)
  }



  transformData(type, data){
    switch (type){
      case 'String':
        return utf8ToArray(String(data))
      case 'Number':
        return numberToArray(Number(data))
    }
  }
}