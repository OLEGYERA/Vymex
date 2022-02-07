import Storage from "@/storage";

export default class StoragePad{
  constructor() {
    this.store = Storage;
    this.moduleName = null
  }

  name(_name){
    this.moduleName = _name
    return this;
  }



  set(mutationName, mutationData){
    if(this.moduleName){
      this.store.commit(`${this.moduleName}/set${mutationName}`, mutationData);
      this.moduleName = null;
    } else{
      this.store.commit(`set${mutationName}`, mutationData)
    }
  }

  get(getterName){
    let responseGetter;
    if(this.moduleName){
      responseGetter = this.store.getters[`${this.moduleName}/get${getterName}`];
      this.moduleName = null;
    } else{
      responseGetter = this.store.getters[`get${getterName}`]
    }

    return responseGetter;
  }
}