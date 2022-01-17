<template>
  <div class="calendar-cell-atom cell-item">
    <div class="cell-item-body" :class="{current: date.type === 0, weekend: isWeekend, today: date.today, selected: isSelected}" @click="date.type === 0 ? $emit('onClick', date.day) : ''">
      <title-caps>{{date.day}}</title-caps>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import TitleCaps from '@Facade/Title/Caps'

export default {
  name: 'Providers.CalendarCellAtom',
  props: {
    date: {
      type: Object,
      required: true
    },
    isWeekend: {
      type: Boolean,
      required: true
    },
    isSelected: {
      type: Boolean,
    },
  },
  components: {TitleCaps},
  mounted() {
  },
  data: () => ({

  }),
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .calendar-cell-atom{
    .cell-item-body{
      cursor: default;
      transition: .2s all ease;
      &.current{
        cursor: pointer;
        .facade-title-caps{
          color: #fff;
        }
        &.weekend{
          .facade-title-caps{
            opacity: 1;
          }
        }

        &:hover{
          .facade-title-caps{
            color: #fff;
          }
          background-color: $blue;
        }
      }
      &.weekend{
        .facade-title-caps{
          color: $red;
          opacity: .4;
        }
      }
      &.today{
        background-color: $grey-scale-300;
      }
      &.selected{
        background-color: $blue;
        .facade-title-caps{
          color: #fff;
          text-decoration: underline;
        }
      }
    }
  }
</style>