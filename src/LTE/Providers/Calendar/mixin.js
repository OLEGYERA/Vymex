export default {
  props: {
    selectedDate: {
      type: String
    },
    diapasonStart: {
      type: Date,
    },
    diapasonEnd: {
      type: Date,
    },
  },
  mounted() {
    if(this.selectedDate) {
      this.calendar = this.calendar.createReplica(this.selectedDate);
      console.log('Render', new Date(this.selectedDate), this.calendar)
      this.calendar.selectedPoint = new Date(this.selectedDate);
    }
  },
  data(){
    return {
      animate: 'acceleration_h',
      gesture: {
        swipe: null,
        axisY: null,
        posDir: null,
        progress: 0,
        style: null,
        styleReplica: null,
        exit: null,
        styleExit: null
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
        if(this.calendarReplica){
          this.gesture.style = (this.gesture.axisY ? 'translateY(' : 'translateX(') + (this.gesture.posDir ? 100 - progress : -100 + progress) + '%)';
          this.gesture.styleReplica = (this.gesture.axisY ? 'translateY(' : 'translateX(') + (this.gesture.posDir ? '-' : '') + progress + '%)';
        }
      } else {
        const scaledProgress = progress / 100;
        if(this.gesture.exit){
          this.gesture.styleExit = 'scale(' + (this.gesture.posDir ? 1 - scaledProgress : scaledProgress) + ')'
        } else {
          this.gesture.style = 'scale(' + (this.gesture.posDir ? 1 - scaledProgress : scaledProgress) + ')'
        }
      }
    },
    gestureEnd(){
      if(this.gesture.exit){
        this.gesture.exit = null;
        this.gesture.styleExit = null;
        this.$emit('onClose')
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
          if(!this.calendar.updateYear(this.calendar.Year + (this.gesture.posDir ? 1 : -1))){
            this.calendar = this.calendarReplica.createReplica();
            this.calendarReplica = null;
          }
        } else {
          this.calendarReplica = this.calendar.createReplica();
          if(!this.calendar.updateMonth(this.calendar.monthPoint.getMonth() + (this.gesture.posDir ? 1 : -1))){
            this.calendar = this.calendarReplica.createReplica();
            this.calendarReplica = null;
          }
        }
      } else {
        if(this.gesture.posDir){
          this.gesture.exit = true;
        }
      }
    }
  },
  watch: {
    selectedDate(to){
      this.calendar = this.calendar.createReplica(to);
      this.calendar.selectedPoint = new Date(to);
    }
  }
}