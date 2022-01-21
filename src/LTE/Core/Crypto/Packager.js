/*eslint-disable*/
import Binder from "@/LTE/Core/Helpers/Binder";
import {
  getPackage,
  checkHMACVerify,
  decrypt,
  deserialize,
  arrayToObject,
  getType,
  encrypt, serialize
} from '@/core/SEKSproto/utilites'
import Response from "@/LTE/Core/Helpers/Response";

let PackagerPrvKey;

export default class Packager extends Binder{
  constructor(Components, priorityComponents = []){
    super();
    this.Components = Components;
    this.priorityComponents = priorityComponents;
  }


  async predictor(responsePackage){
    let Package = getPackage(responsePackage);
    Package.data = Package.data.length ? await this.Decrypt(...Package.data) : null;

    const Response = this._validatePackageResponseData(Package),
      groupText = `PREDICT <-- | Component: ${Response.component}, Method: ${Response.method} | Data: ${!!Response.data}`;

    console.groupCollapsed(groupText);
    console.log(Response.data);
    console.groupEnd(groupText);

    this.wrapUp(Response);
  }

  wrapUp({component, method, data}){
    const instance = this.Components[component], protoFunc = instance?.[method];
    if(instance && !protoFunc) this.$log.warn('Вась, я метод не нашла... Иди-ка ты н**уй =)')
    else if(!protoFunc) throw 'Система: Я к такому дерьму еще не готова!';
    protoFunc.call(instance,  data, [PackagerPrvKey, component, method])
  }

  _validatePackageResponseData(decPac){
    if(this.priorityComponents.indexOf(decPac.component) !== -1) return decPac;
    decPac.data = arrayToObject(decPac.data);
    return this._delegateByResponseCode(decPac) ?? null;
  }
  _delegateByResponseCode(pacRes){
    console.log(pacRes.data.code)
    switch (pacRes.data.code){
      case 200:
      case 201:
        return this.__execPackageAssemblyScene(pacRes);
      case undefined:

      case 500:
        return this.__execErrorScene(pacRes);
      default:
        return this.__execForceErrorScene(pacRes);
    }
  }


  __execPackageAssemblyScene(pacRes){
    const pacResBody = pacRes.data.body;
    let finalResponse = {component: pacRes.component, method: pacRes.method};

    switch (getType(pacResBody)){
      case "object":
        if(pacResBody.component === null && pacResBody.method === null) {
          finalResponse = {component: 'Third', method: 'bypass'}
          break;
        }
        if(pacResBody.component && pacResBody.method){
          finalResponse = {component: pacResBody.component, method: pacResBody.method}
        } else {
          finalResponse.data = pacResBody;
        }
        break;
      case "array":
        finalResponse.data = pacResBody;
        break;
      default:
        console.log('DEFAULT - handleBaseSuccess', pacRes)
        return false;
    }

    if(finalResponse.component.indexOf('Era') !== -1) finalResponse.component = finalResponse.component.replace(/Era/gi, '');
    return finalResponse;
  }
  __execForceErrorScene(pacRes){
    const pacResBody = pacRes.data.body;

    this.$log.error('Key error:');
    console.log(pacResBody)

    if(pacResBody.errors) return this.__execErrorScene(pacRes);

    switch (pacResBody.errorCode) {
      case '1':
        console.log('Проверить систему на данную ошибку!')
        this.$store.set('ClientBlocking', 0)
        setTimeout(() => this.$router.push({name: 'auth.login'}), 200)
        break;
      case '2':
        this.$store.set('ClientBlocking', pacResBody.blockingTime)
        setTimeout(() => this.$router.push({name: 'auth.login'}), 200)
        break;
      case '9':
        this.$store.set('UserPassword', null)
        break;
    }

    return this.__alertError(pacResBody.message)
  }
  __execErrorScene(pacRes){
    const pacResBody = pacRes.data.body;

    if([null, undefined, '{}'].indexOf(pacResBody) !== -1){
      this.$log.error(`Component: ${pacRes.component}, Method: ${pacRes.method} ==> 'No data available!`);
      this.$notify({text: 'Нуу очень странная ошибка =/', type: 'error', duration: 3000, speed: 500})
      return false;
    }

    return this.__execPackageAssemblyScene(pacRes);
    // return this.__alertError(pacResBody.message)
  }
  __alertError(message){
    this.$notify({text: message, type: 'error', duration: 3000, speed: 500})
    console.log(message)
    return false;
  }
  __setPackagerKey(key){
    PackagerPrvKey = {aes: key[0], mac: key[1]}
  }


  async Decrypt(IV128, mac, cipher){
    await this.CheckHMACVerify(IV128, mac, cipher);
    return decrypt(IV128, PackagerPrvKey.aes, cipher);
  }
  async CheckHMACVerify(...data){
    let HMACVerify = await checkHMACVerify(PackagerPrvKey.mac, ...data);

    // Убиваем соединение.
    if(!HMACVerify){
      this.$socket.disconnect();
      throw new Error('HMAC not Verify\n');
    }
  }
}