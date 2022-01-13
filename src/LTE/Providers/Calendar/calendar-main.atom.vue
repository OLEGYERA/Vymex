<template>
  <div class="calendar-main-atom">
      <div class="calendar-days-matrices" :class="{floatingMatrices: calendarReplica}">
        <div class="calendar-matrix" :style="{transform: gesture.style}">
          <div class="matrix-body">
            <calendar-cell v-for="(matrixItem, matrixKey) in calendar.generateMatrix()" :date="matrixItem" :is-weekend="(matrixKey+1)%7===0" :key="matrixKey"/>
          </div>
        </div>
        <div class="calendar-matrix matrix-replica" v-if="calendarReplica" :style="{transform: gesture.styleReplica}">
          <div class="matrix-body">
            <calendar-cell v-for="(matrixItem, matrixKey) in calendarReplica.generateMatrix()" :date="matrixItem" :is-weekend="(matrixKey+1)%7===0" :key="matrixKey"/>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleSemi from '@Facade/Title/Semi'
  import TitleCaption from '@Facade/Title/Caption'
  import CalendarCell from './calendar-cell.atom'

  export default {
    name: 'Providers.CalendarMainAtom',
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
      gesture: {
        type: Object,
        required: true
      },
    },
    components: {TitleSemi, TitleCaption, CalendarCell},
    mounted() {
    },
    data: () => ({
      mainGesture: null,
    }),
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>