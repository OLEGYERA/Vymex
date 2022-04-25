import Binder from "@/LTE/Core/Helpers/Binder";

export default class Controller extends Binder{
  _timeForGlobalReload=86400;
  _timeForBasicSync=6; //600

  constructor() {
    super();
    this.$systemBoot()
  }

  $systemBoot(){
    const loadPageTime = new Date().getTime(),
          prevLoadPageTime = this.$store.name('SynchronizerStore').get('LastPageReload');

    if(prevLoadPageTime === null){
      this.$globalManualSync();
    } else{
      const diffLoadPageTime = Math.abs((loadPageTime - prevLoadPageTime) / 1000);

      if(this._timeForGlobalReload < diffLoadPageTime){
        this.$globalManualSync();
      }

      if(this._timeForBasicSync < Math.abs((loadPageTime - this.$store.name('SynchronizerStore').get('BasicSync')) / 1000)){
        this.$basicManualSync();
      }

      console.log(this.$store.name('SynchronizerStore').get('BasicSync'));

    }

    this.$store.name('SynchronizerStore').set('LastPageReload', loadPageTime);
  }

  //обновляет все мосты структуры и подструктуры в случае отсутсвия в системе больше суток
  $globalManualSync(){
    console.log('This should be the GlobalSync');
    this.$mainManualSync();
  }

  //система ручного запуска обновления с основными мостами структуры при перагрзки страницы


  //система автоматического запуска обновления с основными мостами структуры при выдержки тайминга

  //система ручного запуска обновления с проверкой системы

  //обновляет основные мосты структуры раз в час
  $mainManualSync(){
    // EXEC --> | Component: FAQ, Method: getCategories
    this.$basicManualSync();
  }

  //обновляет основные мосты структуры раз в 5 минут

  $basicManualSync(){
    this.$core.execViaComponent('Auth', 'user');
    this.$core.execViaComponent('Company', 'getUserCompanies');

    console.log('Time for basic sync')
    this.$store.name('SynchronizerStore').set('BasicSync', new Date().getTime());
  }
}