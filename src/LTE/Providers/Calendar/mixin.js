export default {
  props: {
    selectedDate: {
      type: Date,
      default: () => new Date()
    },
  },
  data(){
    return {
      gesture: {
        swipe: null,
        axisY: null,
        posDir: null,
        progress: 0,
        style: null,
        styleReplica: null
      }
    }
  },
  methods: {
    gestureStart({type, axisY, posDir}){
      this.gesture.swipe = type === 'swipe';
      this.gesture.axisY = axisY;
      this.gesture.posDir = posDir;
      this.manageCalendar();
    },
    gestureProcess(progress){
      this.gesture.progress = progress
      if(this.gesture.swipe){
        this.gesture.style = (this.gesture.axisY ? 'translateY(' : 'translateX(') + (this.gesture.posDir ? 100-progress : -100+progress)  + '%)';
        this.gesture.styleReplica = (this.gesture.axisY ? 'translateY(' : 'translateX(') + (this.gesture.posDir ? '-' : '') + progress + '%)';
      } else {
        const scaledProgress = progress / 100;
        this.gestureStyle = 'scale(' + (this.gesture.posDir ? 1 - scaledProgress : scaledProgress) + ')'
      }
    },
    gestureEnd(){
      if(this.gesture.progress !== 100){
        // this.calendarReplica
        // this.calendar = this.calendarReplica;
        console.log(this.calendarReplica.Year, this.calendar.Year)
        this.calendar = this.calendarReplica;
        console.log(456, this.calendarReplica.Year, this.calendar.Year)

      }
      this.gesture.style = null
      this.calendarReplica = null;
      this.gesture.swipe = null
      this.gesture.axisY = null
      this.gesture.posDir = null
      this.gesture.progress = 0;
    },

    manageCalendar(){
      if(this.gesture.swipe){
        if(!this.gesture.axisY){
          this.calendarReplica = this.calendar.createReplica();
          console.log('0', this.calendarReplica.Year, this.calendar.Year)
          this.calendar.updateYear(this.calendar.Year + (this.gesture.posDir ? 1 : -1))
          console.log('123', this.calendarReplica.Year, this.calendar.Year)
        }
      }
    }
  }
}