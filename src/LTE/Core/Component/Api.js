import Binder from "@/LTE/Core/Helpers/Binder";
import {encrypt, serialize, utf8ToArray, numberToArray} from '@/core/SEKSproto/utilites'

class Api extends Binder{
  constructor() {
    super()
  }

  async testApi(emittedData){
    console.log(emittedData)
    let dataArray = [];
    emittedData.data.forEach(data => {
      if(data.input !== null) dataArray.push(this.transformData(data.type.title, data.input))
    })
    let fullPack;

    if(dataArray.length === 1){
      fullPack = await encrypt({
        AES256Key: this.$store.get('AesKey'),
        MAC256Key: this.$store.get('MacKey')
      }, emittedData.name, emittedData.method, ...dataArray);
    } else if(dataArray.length > 1){
      fullPack = await encrypt({
        AES256Key: this.$store.get('AesKey'),
        MAC256Key: this.$store.get('MacKey')
      }, emittedData.name, emittedData.method, serialize(...dataArray));
    } else {
      fullPack = await encrypt({
        AES256Key: this.$store.get('AesKey'),
        MAC256Key: this.$store.get('MacKey')
      }, emittedData.name, emittedData.method);
    }

    this.$socket.emit('listener', fullPack)
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

export default new Api();