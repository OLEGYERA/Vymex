import HandlerBase from "./HandlerBase";

class GestureHandler extends HandlerBase{
  constructor() {
    super();
  }



  watch(e){
    e.preventDefault();

    this.initialHandler(e);
    this.gestureControlHandler(e);
    this.gonerHandler()
  }

  initialHandler(e){

  }

  gestureControlHandler(e){

  }

  gonerHandler(){

  }


}

export default GestureHandler;