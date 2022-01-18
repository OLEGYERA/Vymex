import Binder from "@/LTE/Core/Helpers/Binder";

class Third extends Binder{
  restrictedRoutes = ['preload', 'auth'];
  constructor() {
    super();
  }

  async phase1(){
    const userIsJumpReg = this.$store.get('UserIsJumpReg');
    if(userIsJumpReg){
      await this.$router.push({ name: 'auth.password'});
    } else {
      await this.$router.push({ name: 'auth.fill.profile'});
    }
  }

  async cloudPasswordRes(){
    this.$store.set('SwapAT')
    await this.$router.push({name: 'vx'})
  }

  async bypass(){
    const foundRoute = this.$router.match(this.$router.history._startLocation).name,
          lastPage = this.$store.get('Page');

    if(!foundRoute && !lastPage){
      await this.$router.push({name: 'vx'})
    } else if(foundRoute && !lastPage){
      this.routeMiddleware(foundRoute) ? await this.$router.push({name: foundRoute}) : await this.$router.push({name: 'vx'})
    } else if(!foundRoute && lastPage){
      console.log('go by lastPage')
    } else {
      console.log('XZ')
    }
  }

  routeMiddleware(route){
    return !this.restrictedRoutes.some(restrictedRoute => route.indexOf(restrictedRoute) !== -1)
  }
}

export default new Third();