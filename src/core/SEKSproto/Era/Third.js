import Router from '@/router'

export default class Third{

  restrictedRoutes = ['preload', 'auth']

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
    const foundRoute = this.router.match(this.router.history._startLocation).name,
          lastPage = this.storage.get('Page');
    console.log(foundRoute, this.router)
    if(!foundRoute && !lastPage){
      await this.router.push({name: 'vx'})
    } else if(foundRoute && !lastPage){
      console.log(foundRoute, 'found')
      this.routeMiddleware(foundRoute) ? await this.router.push({name: foundRoute}) : await this.router.push({name: 'vx'})
    } else if(!foundRoute && lastPage){
      console.log('go by lastPage')
    } else {
      console.log('XZ')
    }

    // const lastPage = this.storage.get('Page');
    // if(!lastPage){
    //   console.log(this.router.match(this.router.history._startLocation).name);
    //   console.log(this.router.match(this.router.history._startLocation))
    //   // this.router.(this.router.history._startLocation)
    //   // this.router.pathMatch
    //   // console.log(this.router.history._startLocation, this.router)
    //   // await this.router.push({name: 'vx'})
    // } else {
    //   console.log(lastPage, 'HI-Hi')
    // }
  }


  routeMiddleware(route){
    return !this.restrictedRoutes.some(restrictedRoute => route.indexOf(restrictedRoute) !== -1)
  }
}