/*eslint-disable*/
const RU = {
  month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'],
}

// private Interface
const _ = {
  _: null,
  set bind(_){this._ = _},

  // : number
  getMonth(){
    return RU.month[this._.monthPoint.getMonth()];
  },
  setMonth(x){
    this._.monthPoint.setMonth(x);
    this._.Month = this.getMonth()
    this._.isCurrent = this.getIsCurrent()
  },


  getYear(){
    return this._.monthPoint.getFullYear()
  },
  setYear(x){
    this._.monthPoint.setYear(x)
    this._.Year = this.getYear()
    this._.isCurrent = this.getIsCurrent()
  },

  getIsCurrent(){
    return this._.today.getFullYear() === this._.monthPoint.getFullYear()
        && this._.today.getMonth() === this._.monthPoint;
  }


}

class Calendar{
  Year;
  Month;
  isCurrent;
  constructor(specifiedReferencePoint = null) {
    console.log(this)
    this.today = new Date();
    if(specifiedReferencePoint){
      if(typeof specifiedReferencePoint === 'number'){
        console.log('shift')
      } else {
        console.log('specified Date')
        this.monthPoint = new Date(specifiedReferencePoint.getFullYear(), specifiedReferencePoint.getMonth())
      }
    }
    else {
      this.monthPoint = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    }

    this.renderStates()
  }

  renderStates(){
    _.bind = this;
    this.Year = _.getYear();
    this.Month = _.getMonth();
    this.isCurrent = _.getIsCurrent();
  }


  updateMonth(x){
    _.bind = this;
    _.setMonth(x);
  }
  updateYear(x){
    _.bind = this;
    _.setYear(x);
  }
  generateMatrix(){
    _.bind = this;
    const LAST_DAY = Calendar.getLastDay(this.monthPoint);
    let MATRIX_ARR = [], remainderDayWeekPrev = this.monthPoint.getDay() - 1, remainderDayWeekNext = 7 - LAST_DAY.getDay();

    if(remainderDayWeekPrev > 0){
      const LAST_DAY_PREV_MONTH = Calendar.getLastDayPrevMonth(this.monthPoint, true);

      while(remainderDayWeekPrev > 0)
        MATRIX_ARR.push({
          day: LAST_DAY_PREV_MONTH - --remainderDayWeekPrev,
          type: -1
        })
    }

    const lastDayMonth = LAST_DAY.getDate();

    if(this.isCurrent){
      const todayDay = this.today.getDate();
      for (let day = 1; day <= lastDayMonth; day++){
        if(day === todayDay){
          MATRIX_ARR.push({day, type: 0, today: true})
        } else {
          MATRIX_ARR.push({day, type: 0})
        }
      }
    } else {
      for (let day = 1; day <= lastDayMonth; day++){
        MATRIX_ARR.push({day, type: 0})
      }
    }


    for (let day = 1; day <= remainderDayWeekNext; day++){
      MATRIX_ARR.push({day, type: 1})
    }

    let remainderMatrixDay = 42 - MATRIX_ARR.length

    if(remainderMatrixDay > 0){
      let lastMatrixDay = MATRIX_ARR[MATRIX_ARR.length-1].day
      for (let day = 1; day <= remainderMatrixDay; day++){
        MATRIX_ARR.push({day: lastMatrixDay + day, type: 1})
      }
    }
    return MATRIX_ARR;
  }

  createReplica(){
    return new Calendar(this.monthPoint);
  }

  static getLastDay(date, day = false){
    const _y = date.getFullYear(), _m = date.getMonth()
    const _date = new Date(_y, _m + 1, 0)
    return day ? _date.getDate() : _date;


  }
  static getLastDayPrevMonth(date, day = false){
    const _y = date.getFullYear(), _m = date.getMonth()
    const _date = new Date(_y, _m, 0)
    return day ? _date.getDate() : _date;
  }
}

export {Calendar}