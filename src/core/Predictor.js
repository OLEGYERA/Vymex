import Response from "@/core/Response";
import ComponentCollector from "@/core/Components/ComponentCollector";
import ConsoleNotifier from "@/core/ConsoleNotifier";

export default class Predictor{

  currentActionData = {
    component: null,
    method: null,
    data: null
  }

  constructor(EraCollector, storagePad, SClient) {
    this.console = new ConsoleNotifier('Predictor');
    this.Era = EraCollector;
    this.Component = new ComponentCollector(storagePad, SClient)
  }

  dataPreparation(parsedData){
    this.console.success('The data will guessed!');
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
      this.console.info(`Component: ${componentInfo.name},  Method: ${this.currentActionData.method}`)
      console.log(this.currentActionData.data)
    console.groupEnd('The data was guessed')
    return this;
  }

  prepareComponentManually(componentName, methodName, data = null){
    console.log(componentName, methodName)
    this.currentActionData.component = this.Component[componentName];
    this.currentActionData.method = methodName;
    if(data !== null)
      this.currentActionData.data = data;

    console.log(this.currentActionData)

    return this;
  }

  prepareEraManually(eraName, methodName, data = null){
    this.currentActionData.component = this.Era[eraName];
    this.currentActionData.method = methodName;
    if(data !== null)
      this.currentActionData.data = data;

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
      componentName = componentFullName.toLowerCase()

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