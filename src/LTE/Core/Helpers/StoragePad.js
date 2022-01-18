import Storage from "@/storage";

export default class StoragePad{
  constructor() {
    this.store = Storage;
  }

  set(mutationName, mutationData){
    this.store.commit(`set${mutationName}`, mutationData)
  }

  get(getterName){
    return this.store.getters[`get${getterName}`]
  }
}