import Vue from 'vue'
import {arrayToObject} from "@/core/SEKSproto/utilites";
import Router from '@/router'
import SP from "@/core/StoragePad";
import Storage from "@/storage";

export default class Response{


  constructor(data) {
    this.code = null;
    this.body = null;
    this.router = Router;
    this.storage = new SP(Storage)


    this.parsingData(data);
    this.processing();
  }

  /**
   * Парсинг данных
   * @param data
   */
  parsingData(data){
    try {
      let res = arrayToObject(data);
      if(!res.code || !res.body) throw 'Структура response не валидна';
      this.code = res.code;
      this.body = res.body;
    }
    catch (e) {
      alert(e.toString())
      throw e; // создание исключения
    }
  }

  processing(){
    switch (this.code){
      case 200:
        break;
      case 201:
        break;
      case 500:
        this.parsingServerError();
        break;
      default:
        this.parsingBaseError();
        break;
    }
  }

  parsingServerError(){
    // if(this.body.errors.length !== 0)
    //   this.forcedReturn = this.body.errors

    Vue.notify({
      text: this.body.message,
      type: 'error',
      duration: 3000,
      speed: 500,
    })

  }


  parsingBaseError(){
    console.log('key Error', this.body)
    if(this.body.errors){
      this.parsingServerError();
    } else {
      switch (this.body.errorCode) {
        case '1':
          console.log('Проверить систему на данную ошибку!')
          this.storage.set('ClientBlocking', 0)
          setTimeout(() => this.router.push({name: 'auth.login'}), 200)
          break;
        case '2':
          this.storage.set('ClientBlocking', this.body.blockingTime)
          setTimeout(() => this.router.push({name: 'auth.login'}), 200)
          break;
        case '9':
          this.storage.set('UserPassword', null)
          break;
      }

      Vue.notify({
        text: this.body.message,
        type: 'error',
        duration: 3000,
        speed: 500,
      })

      throw this.body.message;
    }
  }
}
