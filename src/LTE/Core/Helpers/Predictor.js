import Response from "./Response";
import Binder from "@/LTE/Core/Helpers/Binder";

const ImmediatelyRun = ['uploader']

export default class Predictor extends Binder{
  constructor(Components) {
    super();
    this.Components = Components;
  }

  Process(_package){
    if(_package.component.indexOf('Era') !== -1) return this.processEra(_package);

    const newComponentName = this._getComponentName(_package.component)
    if(ImmediatelyRun.some(x => newComponentName === x)) return this.processImmediatelyComponent(_package, newComponentName);

    return this.processBaseComponent(_package, newComponentName);
  }
  
  ManualProcess(component, method, data = null){
    this.__execute(component, method, data);
    return this;
  }

  cryptoBypass(){
    return this.__execute('third', 'bypass');
  }

  processEra(_package){
    const responseData = new Response(_package).getData();
    if(!responseData) return this.cryptoBypass();
    this.__execute(this._getEraName(responseData.component), responseData.method, responseData.data)
  }

  processImmediatelyComponent(_package, componentName){
    const responseData = new Response({..._package, component: componentName}).getData();
    this.__execute(responseData.component, responseData.method, responseData.data)
  }

  processBaseComponent(_package, componentName){
    const responseData = new Response({..._package, component: componentName}).getData();
    this.__execute(responseData.component, responseData.method, responseData.data)
  }

  _getEraName(_component){
    return _component.replace(/Era/gi, '').toLowerCase()
  }

  _getComponentName(_component){
    //Поправить логику для FAQ => fAQ(так сейчас работает)
    return _component.charAt(0).toLowerCase() + _component.slice(1)
  }

  __execute(component, method, data = null){
    const predictorBuffer = {component: this.Components[component], method: method, data};
    console.log(predictorBuffer)
    if(predictorBuffer.component === undefined) this.$log.warn('Система: Я к такому дерьму еще не готова!')
    else {
      console.groupCollapsed('_Predictor_ -> обнаружил данные')
        this.$log.info(`Component: ${component},  Method: ${predictorBuffer.method}`)
        if(data !== null){
          this.$log.variable('Смотреть ниже', 'PredictorData', true);
          console.log(data)
        }
      console.groupEnd('_Predictor_ -> обнаружил данные')
    }

    const shapedAction = predictorBuffer.component[predictorBuffer.method];
    if(!shapedAction) return false;
    shapedAction.apply(predictorBuffer.component, [predictorBuffer.data]);
    this.$log.success(`_Predictor_ -> Функция Выполненна`)
    return true;
  }
}