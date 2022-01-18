import Vue from 'vue'
import Binder from "@/LTE/Core/Helpers/Binder";
import {arrayToObject} from "@/core/SEKSproto/utilites";

export default class Response extends Binder{
  constructor(data) {
    super();
    this.code = null;
    this.body = null;
    
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
      throw e;
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
