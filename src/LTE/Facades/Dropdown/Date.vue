<template>
  <div class="facade-dropdown-date">
    <div class="dropdown-input">
      <input-base
        placeholder="Тест"
        labeled
      />
      <icon-date/>
    </div>
    <calendar-modal-ui/>
<!--    <div class="dropdown-box">-->
<!--      <div class="dropdown-header">-->
<!--        <div class="month-title">-->
<!--          <title-caps>Ноябрь</title-caps>-->
<!--        </div>-->
<!--        <div class="year-picker">-->
<!--          1998-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="dropdown-content">-->
<!--        <div class="calendar-days-name">-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Пн</title-caps>-->
<!--          </div>-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Вт</title-caps>-->
<!--          </div>-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Ср</title-caps>-->
<!--          </div>-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Чт</title-caps>-->
<!--          </div>-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Пт</title-caps>-->
<!--          </div>-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Сб</title-caps>-->
<!--          </div>-->
<!--          <div class="calendar-cell">-->
<!--            <title-caps>Вс</title-caps>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="calendar-days-matrix" @mousedown="startDrag" @mousemove="doDrag" :class="{draggable: startPosition !== null}">-->
<!--          <div class="month-days-field" :style="moveAxios.style">-->
<!--            <div class="calendar-cell" v-for="(day, key) in currentCalendarGrid" :key="key">-->
<!--              <div class="cell-body">-->
<!--                <title-caps>{{ day }}</title-caps>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
  /* eslint-disable */

  import InputBase from '@/LTE/Facades/Input/Base'
  import IconDate from '@Icon/Date'
  import TitleCaps from '@Facade/Title/Caps'
  import TitleCaption from '@Facade/Title/Caption'


  import {merge} from 'lodash'
  import {CalendarModalUi} from '@Providers'

  // eslint-disable-next-line no-unused-vars

  export default {
    name: 'Facades.Dropdown.Date',
    props: {

    },
    components: {
      InputBase,
      IconDate,
      TitleCaps,
      TitleCaption,
      CalendarModalUi
    },
    created() {
      this.id = this._uid;
      this.dropdownOpts = merge(this.dropdownOpts , this.opts);
    },
    data(){
      return{
        currentPeriod: new Date,
        moveAxios: {
          position: null,
          axios: null,
          style: {}
        },
        startPosition: null
      }
    },
    computed: {
      currentCalendarGrid(){
        let calendarGrid = [];
        let _dateNow = new Date(this.currentPeriod.getFullYear(), this.currentPeriod.getMonth()),
          _lastDayOfMonth = new Date(this.currentPeriod.getFullYear(), this.currentPeriod.getMonth() + 1, 0),
          _lastDayOfPreviousMonth = new Date(this.currentPeriod.getFullYear(), this.currentPeriod.getMonth(), 0);
        let weekDayOfDateNow = _dateNow.getUTCDay() - 1
        if(weekDayOfDateNow > 0){
          while (weekDayOfDateNow >= 0){
            calendarGrid.push(_lastDayOfPreviousMonth.getDate() - weekDayOfDateNow--)
          }
          let t = _lastDayOfMonth.getDate()
          for (let day = 1; day <= t; day++){
            calendarGrid.push(day)
          }
          for (let day = 1; day <= 6 - _lastDayOfMonth.getUTCDay(); day++){
            calendarGrid.push(day)
          }
        }
        console.log(_lastDayOfMonth.getUTCDay())
        return calendarGrid
      },
      getShiftPosition(){

      }
    },
    methods: {
      startDrag(e) {
        console.log(e)
        this.dragging = true;
        this.startPosition = {x: e.clientX, y: e.clientY}
      },
      stopDrag() {
        this.dragging = false;
        this.startPosition = null
        this.moveAxios = {position: null, axios:null, style: {}}
      },
      doDrag(e) {
        if (this.dragging) {
          let _x = e.clientX - this.startPosition?.x, _y = e.clientY - this.startPosition?.y;

          if(!this.moveAxios.axios){
            if(Math.abs(Math.abs(_x) - Math.abs(_y)) > 10){
              this.moveAxios.axios = Math.abs(_x) > Math.abs(_y) ? 'X' : 'Y';
            }
          } else {
            if(this.moveAxios.axios === 'X'){
              this.moveAxios.position = _x > 0 ? 'left' : 'right'
              this.moveAxios.style = {transform: `translateX(${_x}px)`}

            } else {
              this.moveAxios.position = _y > 0 ? 'top' : 'bottom'
              this.moveAxios.style = {transform: `translateY(${_y}px)`}

            }

            console.log(this.moveAxios.position)
          }
          console.log(_x, _y)
          // if(!(_x === 0 && _y === 0)){
          //   if(this.moveAxios.position === null){
          //     if(Math.abs(_x) > Math.abs(_y)){
          //       this.moveAxios.position = _x > 0 ? 'left' : 'right'
          //     } else {
          //       this.moveAxios.position = _y > 0 ? 'top' : 'bottom'
          //     }
          //
          //     switch (this.moveAxios.position){
          //       case 'left':
          //       case 'right':
          //         this.moveAxios.style = {transform: `translateX(${_x}px)`}
          //         break
          //       case 'top':
          //       case 'bottom':
          //         this.moveAxios.style = {transform: `translateY(${_y}px)`}
          //         break
          //     }
          //
          //   } else {
          //     switch (this.moveAxios.position){
          //       case 'left':
          //       case 'right':
          //         this.moveAxios.style = {transform: `translateX(${_x}px)`}
          //         break
          //       case 'top':
          //       case 'bottom':
          //         this.moveAxios.style = {transform: `translateY(${_y}px)`}
          //         break
          //     }
          //   }
          // } else {
          //   this.moveAxios.position = null;
          // }
        }
      }
    },
    mounted() {
      window.addEventListener('mouseup', this.stopDrag);
    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped>
  .facade-dropdown-date{
    width: 100%;
    position: relative;
    .dropdown-input{
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      z-index: 0;
      .icon-date{
        height: min-content;
        position: absolute;
        right: 4px;
        color: #fff;
        z-index: -1;
      }
      .facade-input-base{
        padding-right: 22px;
      }
    }
    .dropdown-box{
      //right: 0;
      z-index: 2;
      //width: 100%;
      //position: absolute;
      top: 31%;
      left: 40%;
      position: fixed;
      width: 468px;
      height: 400px;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 16px;
      background-color: $grey-scale-700;
      .dropdown-header{
        display: flex;
        padding: 24px 24px 12px;
      }
      .dropdown-content{
        padding: 12px 12px 24px;
        .calendar-days-name{
          display: flex;
          justify-content: space-between;
        }
        .calendar-days-matrix{
          display: flex;
          overflow: hidden;
          .month-days-field{
            display: inherit;
            flex-wrap: wrap;
          }
          &.draggable{
            &:after{
              z-index: 0;
            }
          }
          &:after{
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: -1;
          }
        }

        .calendar-cell{
          width: 100%;
          height: 40px;
          max-width: calc(100% / 7);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2px 0;
          .cell-body{
            display: flex;
            justify-content: inherit;
            align-items: inherit;
            width: 45px;
            height: 100%;
            border-radius: 8px;
            cursor: pointer;
            .facade-title-caps{
              color: #fff;
            }
            &:hover{
              background-color: $blue;
            }
          }
        }
      }
    }
  }

</style>