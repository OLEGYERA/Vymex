<template>
  <div class="calendar-header-atom">
    <div class="calendar-date-box">
      <div class="date-month" :class="{floatingMonth: (calendarReplica && calendar.Month !== calendarReplica.Month) }">
        <title-semi
          :style="{transform:  calendarReplica && calendar.Month !== calendarReplica.Month ? gesture.style : '' }"
        >{{ calendar.Month }}</title-semi>
      </div>
      <div class="date-year" :class="{floatingYear: (calendarReplica && calendar.Year !== calendarReplica.Year) }">
       <input
         :style="{transform:  calendarReplica && calendar.Year !== calendarReplica.Year ? gesture.style : '' }"
         type="text"
         class="transparentYear"
         ref="transparentYear"
         v-mask="'XXXX'"
         v-model="yearModel"
         @blur="handleNewYear"
         @keydown.38="increaseYear"
         @keydown.40="decreaseYear"
         @keydown.enter="$refs['transparentYear'].blur()"
         @keydown.tab.prevent="$refs['transparentYear'].blur()"
       />
        <input
          v-if="calendarReplica && calendar.Year !== calendarReplica.Year"
          :style="{transform: gesture.styleReplica}"
          type="text"
          class="transparentYear yearReplica"
          :value="calendarReplica.Year">
      </div>
    </div>
    <div class="calendar-days-week-box">
      <div class="day-week cell-item" v-for="(dayWeek, keyWeek) in daysWeek" :key="keyWeek">
        <div class="cell-item-body">
          <title-caption>{{dayWeek}}</title-caption>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleSemi from '@Facade/Title/Semi'
  import TitleCaption from '@Facade/Title/Caption'

  export default {
    name: 'Providers.CalendarHeaderAtom',
    props: {
      calendar: {
        type: Object,
        required: true
      },
      calendarReplica: {
        validator: mR => {
          return mR === null || typeof mR === 'object'
        }
      },
      // year: {
      //   type: Number,
      //   required: true
      // },
      // yearReplica: {
      //   validator: yR => {
      //     return yR === null || typeof yR === 'number'
      //   }
      // },
      // diapason: {
      //   type: Array,
      //   required: true,
      //   validator: diapasonArr => {
      //     return typeof diapasonArr[0] === 'number' && typeof diapasonArr[1] === 'number'
      //   }
      // },
      gesture: {
        type: Object,
        required: true
      },
    },
    components: {TitleSemi, TitleCaption},
    created() {
      this.setYearModel();
    },
    data: () => ({
      daysWeek: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
      yearModel: null,
    }),
    methods: {
      setYearModel(){
        this.yearModel = this.calendar.Year;
      },
      handleNewYear(){
        if(!this.calendar.updateYear(this.yearModel)) this.setYearModel();
      },
      increaseYear(){
        if(!this.calendar.updateYear(this.yearModel + 1)) this.setYearModel();
      },
      decreaseYear(){
        if(!this.calendar.updateYear(this.yearModel - 1)) this.setYearModel();
      },
    },
    watch: {
      'calendar.Year'(to){
        console.log(to)
        if(to !== this.yearModel) this.yearModel = to;
      }
    }
  }
</script>


<style lang="scss" scoped>
  .facade-title-caption{
    font-size: rem(14);
  }
</style>