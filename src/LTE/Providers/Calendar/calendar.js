/*eslint-disable*/
const RU = {
  month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
}

class CalendarBase{
  diapasonStart = new Date('1900');
  diapasonEnd = new Date();
  getMonth(){
    return RU.month[this.monthPoint.getMonth()];
  }
  setMonth(x){
    if(x < 0){
      this.monthPoint.setMonth(11)
      this.monthPoint.setFullYear( this.Year - 1)
    } else if(x > 11){
      this.monthPoint.setMonth(0)
      this.monthPoint.setFullYear( this.Year + 1)
    } else{
      this.monthPoint.setMonth(x)
    }

    this.renderStates();
    return this.monthPoint < this.diapasonEnd && this.monthPoint > this.diapasonStart;
  }

  getYear(){
    return this.monthPoint.getFullYear()
  }
  setYear(x){
    this.monthPoint.setYear(x);


    if(this.monthPoint < this.diapasonEnd && this.monthPoint > this.diapasonStart){
      this.renderStates();
      return true;
    } else {
      if(this.monthPoint > this.diapasonEnd) {
        this.monthPoint.setFullYear(this.diapasonEnd.getFullYear());
        this.monthPoint.setMonth(this.diapasonEnd.getMonth());
      }
      if(this.monthPoint < this.diapasonStart) {
        this.monthPoint.setFullYear(this.diapasonStart.getFullYear());
        this.monthPoint.setMonth(this.diapasonStart.getMonth());
      }
      this.renderStates();
      return false;
    }
  }

  isCurrent(){
    return this.today.getFullYear() === this.monthPoint.getFullYear()
      && this.today.getMonth() === this.monthPoint.getMonth();
  }

  isSelected(date){
    if(!this.selectedPoint) return false;
    return this.selectedPoint.getFullYear() === this.monthPoint.getFullYear()
      && this.selectedPoint.getMonth() === date.month
      && this.selectedPoint.getDate() === date.day;
  }

  getMatrix(){
    const LAST_DAY = Calendar.getLastDay(this.monthPoint);
    let MATRIX_ARR = [], remainderDayWeekPrev = this.monthPoint.getDay() - 1, remainderDayWeekNext = 7 - LAST_DAY.getDay();

    const prevMonth = this.monthPoint.getMonth() - 1 < 0 ? 11 : this.monthPoint.getMonth() - 1;


    if(remainderDayWeekPrev > 0){
      const LAST_DAY_PREV_MONTH = Calendar.getLastDayPrevMonth(this.monthPoint, true);
      while(remainderDayWeekPrev > 0)
        MATRIX_ARR.push({
          month: prevMonth,
          day: LAST_DAY_PREV_MONTH - --remainderDayWeekPrev,
          type: -1
        })
    }

    const lastDayMonth = LAST_DAY.getDate();

    if(this.isCurrent()){
      const todayDay = this.today.getDate();
      for (let day = 1; day <= lastDayMonth; day++){
        if(day === todayDay){
          MATRIX_ARR.push({month: this.monthPoint.getMonth(), day, type: 0, today: true})
        } else {
          MATRIX_ARR.push({month: this.monthPoint.getMonth(), day, type: 0})
        }
      }
    } else {
      for (let day = 1; day <= lastDayMonth; day++){
        MATRIX_ARR.push({month: this.monthPoint.getMonth(), day, type: 0})
      }
    }

    const nextMonth = this.monthPoint.getMonth() + 1 > 11 ? 0 : this.monthPoint.getMonth() + 1;

    for (let day = 1; day <= remainderDayWeekNext; day++){
      MATRIX_ARR.push({month: nextMonth, day, type: 1})
    }

    let remainderMatrixDay = 42 - MATRIX_ARR.length

    if(remainderMatrixDay > 0){
      let lastMatrixDay = MATRIX_ARR[MATRIX_ARR.length-1].day
      for (let day = 1; day <= remainderMatrixDay; day++){
        MATRIX_ARR.push({month: nextMonth, day: lastMatrixDay + day, type: 1})
      }
    }

    return MATRIX_ARR;
  }

  renderStates(){
    this.Year = this.getYear();
    this.Month = this.getMonth();
    this.Matrix = this.getMatrix();
  }
}


class Calendar extends CalendarBase{
  Year;
  Month;
  Matrix;
  selectedPoint;
  constructor(specifiedReferencePoint = null) {
    super();
    this.today = new Date();
    if(specifiedReferencePoint){
      if(typeof specifiedReferencePoint === 'string'){
        this.monthPoint = new Date(specifiedReferencePoint)
        this.monthPoint.setDate(1)
      } else {
        this.monthPoint = new Date(specifiedReferencePoint.getFullYear(), specifiedReferencePoint.getMonth())
      }
    }
    else {
      this.monthPoint = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    }

    this.renderStates()
  }

  setDiapason(end, start = null){
    this.diapasonEnd = end;
    if(start) this.diapasonStart = start;
  }


  updateMonth(x){
    return this.setMonth(x);
  }
  updateYear(x){
    return this.setYear(x);
  }


  createReplica(newDate){
    return new Calendar(newDate ?? this.monthPoint);
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