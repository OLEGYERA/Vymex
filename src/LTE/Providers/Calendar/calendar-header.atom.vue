<template>
  <div class="calendar-header-atom">
    <div class="calendar-date-box">
      <div class="date-month">
        <title-semi>{{ month }}</title-semi>
      </div>
      <div class="date-year">
       <input
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
      year: {
        type: Number,
        required: true
      },
      month: {
        type: String,
        required: true
      },
      diapason: {
        type: Array,
        required: true,
        validator: diapasonArr => {
          return typeof diapasonArr[0] === 'number' && typeof diapasonArr[1] === 'number'
        }
      },
    },
    components: {TitleSemi, TitleCaption},
    created() {
      this.yearModel = this.year;
    },
    data: () => ({
      daysWeek: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
      yearModel: null,
    }),
    methods: {
      handleNewYear(){
        if(this.yearModel < this.diapason[0]){
          this.yearModel = this.diapason[0]
        } else if(this.yearModel > this.diapason[1]) {
          this.yearModel = this.diapason[1]
        }
        this.$emit('onNewYear', this.yearModel)
      },
      increaseYear(){
        if(this.yearModel >= this.diapason[1]) {
          this.yearModel = this.diapason[1]
        } else {
          this.yearModel += 1;
        }

        this.$emit('onNewYear', this.yearModel)
      },

      decreaseYear(){
        if(this.yearModel <= this.diapason[0]){
          this.yearModel = this.diapason[0]
        } else {
          this.yearModel -= 1;
        }

        this.$emit('onNewYear', this.yearModel)
      },

    },
    watch: {
      year(to){
        if(to !== this.yearModel) this.yearModel = to;
      }
    }
  }
</script>


<style lang="scss" scoped>
  .transparentYear{
    font-family: 'Iter', sans-serif;
    font-weight: 600;
    width: 50px;
    color: #fff;
    padding: 0;
    text-align: center;
    font-size: rem(16);
    border: unset;
    background-color: transparent;
    outline: none;
  }

  .facade-title-caption{
    font-size: rem(14);
  }
</style>