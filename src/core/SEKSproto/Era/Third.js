import Router from '@/router'
export default class Third{

  constructor(StoragePad) {
    this.storage = StoragePad;
    this.router = Router;
  }

  async phase1(){
    const userIsJumpReg = this.storage.get('UserIsJumpReg');
    if(userIsJumpReg){
      await this.router.push({ name: 'auth.password'});
    } else {
      await this.router.push({ name: 'auth.fill.profile'});
    }
  }

  async cloudPasswordRes(){
    this.storage.set('SwapAT')
    await this.router.push({name: 'vx'})
  }

  async bypass(){
    await this.router.push({name: 'vx'})
  }
}