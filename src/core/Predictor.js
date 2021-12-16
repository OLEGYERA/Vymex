import Response from "@/core/Response";

export default class Predictor{

  currentActionData = {
    component: null,
    method: null
  }

  constructor(StoragePad, EraCollector) {
    this.storage = StoragePad;
    this.Era = EraCollector;
  }

  dataPreparation(parsedData){
    let responseData = new Response(parsedData.data);

    const componentInfo = this.getComponentInfo(responseData.body);

    switch (componentInfo.type){
      case "Era":
        this.currentActionData.component = this.Era[componentInfo.name];
        this.currentActionData.method = componentInfo.method;
        break;
    }

    return this;
  }


  getComponentInfo(componentBody){
    const componentFullName = componentBody.component
    let componentName;

    if(componentFullName.indexOf('Era'))
      componentName = componentFullName.replace(/Era/gi, '').toLowerCase()

    return {
      type: 'Era',
      name: componentName,
      method: componentBody.method
    }
  }


  runPredictedData(){
    const shapedAction = this.currentActionData.component[this.currentActionData.method];

    if(shapedAction) shapedAction()
  }




}