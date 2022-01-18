import Response from "./Response";
import Binder from "@/LTE/Core/Helpers/Binder";

export default class Predictor extends Binder{
  constructor(Era, Component) {
    super();
    this.Era = Era;
    this.Component = Component;
  }
  currentActionData = {
    component: null,
    method: null,
    data: null
  }

  dataPreparation(parsedData){
    this.$log.success('The data will guessed!');
    let componentInfo;
    if(parsedData.component === 'Uploader'){
      componentInfo = {
        component: 'uploader',
        method: parsedData.method,
        data: parsedData.data
      }
    } else {
      let responseData = new Response(parsedData.data);

      if(responseData.body.component === null) return this.cryptoBypass()

      if(!responseData.body.component){
        componentInfo = this.getComponentInfo(parsedData);
        componentInfo.data = responseData.body
      } else {
        componentInfo = this.getComponentInfo(responseData.body);
      }
    }



    switch (componentInfo.type){
      case "Era":
        this.currentActionData.component = this.Era[componentInfo.name];
        break;
      case "Component":
        this.currentActionData.component = this.Component[componentInfo.name];
        break;
    }
    this.currentActionData.method = componentInfo.method;
    this.currentActionData.data = componentInfo.data;

    console.groupCollapsed('The data was guessed')
      this.$log.info(`Component: ${componentInfo.name},  Method: ${this.currentActionData.method}`)
    console.groupEnd('The data was guessed')
    return this;
  }

  prepareComponentManually(componentName, methodName, data = null){
    console.log(componentName, methodName)
    this.currentActionData.component = this.Component[componentName];
    this.currentActionData.method = methodName;
    if(data !== null)
      this.currentActionData.data = data;
    return this;
  }

  prepareEraManually(eraName, methodName, data = null){
    this.currentActionData.component = this.Era[eraName];
    this.currentActionData.method = methodName;
    if(data !== null) this.currentActionData.data = data;
    return this;
  }

  getComponentInfo(componentBody){
    const componentFullName = componentBody.component
    let componentName;

    if(componentFullName.indexOf('Era') !== -1) {
      componentName = componentFullName.replace(/Era/gi, '').toLowerCase()

      return {
        type: 'Era',
        name: componentName,
        method: componentBody.method
      }
    } else {
      componentName = componentFullName.charAt(0).toLowerCase() + componentFullName.slice(1);

      return {
        type: 'Component',
        name: componentName,
        method: componentBody.method
      }
    }
  }


  runPredictedData(){
    if(this.currentActionData.component === undefined){
      throw 'Система: я к такому дерьму не готова!'
    }
    const shapedAction = this.currentActionData.component[this.currentActionData.method];

    if(shapedAction) shapedAction.apply(this.currentActionData.component, [this.currentActionData.data])
    return this;
  }

  cryptoBypass(){
    return this.prepareEraManually('third', 'bypass')
  }

}