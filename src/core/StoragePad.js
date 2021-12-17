export default class StoragePad{

  constructor(storage) {
    this.storage = storage
  }

  set(mutationName, mutationData){
    this.storage.commit(`set${mutationName}`, mutationData)
  }

  get(getterName){
    return this.storage.getters[`get${getterName}`]
  }
}