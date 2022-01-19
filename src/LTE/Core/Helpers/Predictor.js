import Response from "./Response";
import Binder from "@/LTE/Core/Helpers/Binder";

const ImmediatelyRun = ['Uploader']

export default class Predictor extends Binder{
  constructor(Components) {
    super();
    this.Components = Components;
  }

  systemProcess(_package){
    if(_package.component.indexOf('Era') !== -1) return this.processEra(_package);
    if(ImmediatelyRun.some(x => _package.component === x)) return this.processImmediatelyComponent(_package);
    return this.processBaseComponent(_package);
  }
  manualProcess(component, method, data = null){
    this.__execute(component, method, data);
    return this;
  }

  processEra(_package){
    const responseData = new Response(_package).getData();
    if(!responseData) return this.cryptoBypass();
    this.__execute(responseData.component.replace(/Era/gi, ''), responseData.method, responseData.data)
  }
  processImmediatelyComponent(_package){
    this.__execute(_package.component, _package.method, _package.data)
  }
  processBaseComponent(_package){
    const responseData = new Response(_package).getData();
    this.__execute(responseData.component, responseData.method, responseData.data)
  }

  cryptoBypass(){
    return this.__execute('Third', 'bypass');
  }
  __execute(component, method, data = null){
    const predictorBuffer = {component: this.Components[component], method: method, data};
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