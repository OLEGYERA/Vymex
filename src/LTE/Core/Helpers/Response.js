/*eslint-disable*/
import Vue from 'vue'
import Binder from "@/LTE/Core/Helpers/Binder";
import {arrayToObject, getType} from "@/core/SEKSproto/utilites";
import {arrayToNumber} from "enc-utils";

export default class Response extends Binder{
  constructor(_package) {
    super();
    this.package = _package;
    this.responseObj = arrayToObject(_package.data);
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
  }
  handleBaseSuccess(){
    const responseData = this.responseObj.body;
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
    this.$notify({text: this.responseObj.body.message, type: 'error', duration: 3000, speed: 500})
    return false;
  }
  handleBaseError(){
    const responseData = this.responseObj.body;

    if (responseData === undefined) {
      this.$log.error(`Component: ${this.package.component}, Method: ${this.package.method} ==> 'No data available!`);
    } else {
      this.$log.error('Key error:');
      console.log(responseData)

      if(responseData.errors){
        this.parsingServerError();
      } else {
        switch (responseData.errorCode) {
          case '1':
            console.log('Проверить систему на данную ошибку!')
            this.$store.set('ClientBlocking', 0)
            setTimeout(() => this.$router.push({name: 'auth.login'}), 200)
            break;
          case '2':
            this.$store.set('ClientBlocking', responseData.blockingTime)
            setTimeout(() => this.$router.push({name: 'auth.login'}), 200)
            break;
          case '9':
            this.$store.set('UserPassword', null)
            break;
        }

        this.$notify({text: responseData.message, type: 'error', duration: 3000, speed: 500})
        throw responseData.message;
      }
    }

    return false;
  }
}
