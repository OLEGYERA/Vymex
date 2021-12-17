import Zero from "@/core/SEKSproto/Era/Zero";
import Second from "@/core/SEKSproto/Era/Second";
import Third from "@/core/SEKSproto/Era/Third";


export default class EraCollector{

  constructor(storage) {
    this.zero = new Zero(storage)
    this.second = new Second(storage)
    this.third = new Third(storage)
  }
}