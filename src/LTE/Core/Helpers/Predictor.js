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
    if(this.__execute(true, component, method, data)) return this
  }

  processEra(_package){
    const responseData = new Response(_package).getData();
    if(!responseData) return this.cryptoBypass();
    this.__execute(false, responseData.component.replace(/Era/gi, ''), responseData.method, responseData.data)
  }
  processImmediatelyComponent(_package){
    this.__execute(false, _package.component, _package.method, _package.data)
  }
  processBaseComponent(_package){
    const responseData = new Response(_package).getData();
    if(responseData) this.__execute(false, responseData.component, responseData.method, responseData.data)
  }

  cryptoBypass(){
    return this.__execute(true, 'Third', 'bypass');
  }
  __execute(fromPredictor, component, method, data = null){
    const componentFunc = this.Components[component]
    if(componentFunc === undefined) this.$log.warn('Система: Я к такому дерьму еще не готова!')
    else {
      const groupText = `Predictor ${fromPredictor ? '->' : '<-'} Component: ${component}, Method: ${method} ${data ? 'обнаружил данные' : 'не обнаружил данные'}`;
      console.groupCollapsed(groupText);
        this.$log.info(`Component: ${component},  Method: ${method}`);
        console.log(data);
      console.groupEnd(groupText);
    }

    const shapedAction = componentFunc[method];
    if(!shapedAction) return false;
    shapedAction.apply(componentFunc, [data]);
    return true;
  }
}