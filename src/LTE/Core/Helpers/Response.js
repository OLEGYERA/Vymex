/*eslint-disable*/
import Vue from 'vue'
import Binder from "@/LTE/Core/Helpers/Binder";
import {arrayToObject, getType} from "@/core/SEKSproto/utilites";

export default class Response extends Binder{
  constructor(_package) {
    super();
    this.package = _package;
    this.responseObj = arrayToObject(_package.data);
    console.log('this.responseObj', this.responseObj)
  }

  getData(){
    switch (this.responseObj.code){
      case 200:
      case 201:
        return this.handleBaseSuccess();
      case 500:
        return this.handleServerError();
      default:
        return this.handleBaseError();
    }

    // try {
    //   let res = arrayToObject(data);
    //   console.log(res, 1212)
    //   if(!res.code || !res.body) throw 'Структура response не валидна';
    //   this.code = res.code;
    //   this.body = res.body;
    // }
    // catch (e) {
    //   alert(e.toString())
    //   throw e;
    // }
  }

  handleBaseSuccess(){
    const responseData = this.responseObj.body;
    console.log(responseData, this.package, 111)
    switch (getType(responseData)){
      case "object":
        if(responseData.component === null && responseData.method === null){
          return null;
        } else if(responseData.component && responseData.method){
          return {component: responseData.component, method: responseData.method}
        } else {
          return {component: this.package.component, method: this.package.method, data: responseData}
        }
      case "array":
        return {component: this.package.component, method: this.package.method, data: responseData}
      default:
        console.log('DEFAULT - handleBaseSuccess', responseData)
        break;
    }
  }

  handleServerError(){
    // if(this.body.errors.length !== 0)
    //   this.forcedReturn = this.body.errors
    this.$notify({text: this.body.message, type: 'error', duration: 3000, speed: 500})
  }


  handleBaseError(){
    console.log('key Error', this.body)
    if(this.body.errors){
      this.parsingServerError();
    } else {
      switch (this.body.errorCode) {
        case '1':
          console.log('Проверить систему на данную ошибку!')
          this.$store.set('ClientBlocking', 0)
          setTimeout(() => this.$router.push({name: 'auth.login'}), 200)
          break;
        case '2':
          this.$store.set('ClientBlocking', this.body.blockingTime)
          setTimeout(() => this.$router.push({name: 'auth.login'}), 200)
          break;
        case '9':
          this.$store.set('UserPassword', null)
          break;
      }

      this.$notify({text: this.body.message, type: 'error', duration: 3000, speed: 500})
      throw this.body.message;
    }
  }
}
