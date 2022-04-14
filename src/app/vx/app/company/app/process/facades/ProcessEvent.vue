<template>
  <div class="container-process-event">
    <div class="panel-date">
      <icon-calendar class="panel-date-icons"/>
      <span>{{ message.repeatDate }}</span>
      <icon-sort class="panel-date-icons" v-if="message.isRegular === 1" :style="{marginRight: 0}"/>
    </div>
  </div>
</template>

<script>
import IconSort from "@Icon/Sort";

export default {
  name: 'vx.process.facade.process.event',
  props: {
    message: Object
  },
  components: {
   IconSort
  },
}
</script>
<style lang="scss" scoped>
.container-process-event {
  display: flex;
  flex-wrap: wrap;
  .panel-date {
    height: rem(16);
    display: inherit;
    align-items: center;
    font-size: rem(11);
    line-height: rem(20);
    border-radius: 14px;
    padding: 0 8px 0 4px;
    color: #FFF;
    background: $grey-scale-300;
    margin-bottom: 15px;

    .panel-date-icons {
      height: 10px;
      width: 10px;
      display: flex;
      margin: 0 6px;
      justify-content: center;
      align-items: center;

      &:last-child {
        transform: rotate(90deg);
        margin: 3px 6px;
      }
    }
  }
}


</style>