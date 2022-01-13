<template>
  <div class="calendar-cell-atom cell-item">
    <div class="cell-item-body" :class="{current: date.type === 0, weekend: isWeekend}">
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
    }
  }
</style>