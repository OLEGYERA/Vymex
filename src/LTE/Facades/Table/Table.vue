<template>
  <transition name="slide-down">
    <div class="facade-table-table" v-show="status">
      <table-scrollbar :id="id" :status="status" :cell-size="cellSize || 3" :position="cursor"><slot/></table-scrollbar>
    </div>
  </transition>
</template>


<script>
  import TableScrollbar from '@Facade/Table/Scrollbar'

  export default {
    name: 'Facades.Table.Table',
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      status: {
        type: Boolean,
        required: true
      },
      cellSize: Number,
      cursor: Number,
    },
    components: {TableScrollbar},
  }
</script>

<style lang="scss" scoped>
  .facade-table-table{
    width: 100%;
    height: 100%;
    position: relative;
    .facade-table-containable{
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .slide-down-enter-active{
    transition: all .2s ease-out;
  }
  .slide-down-leave-active {
    transition: all .3s ease-in;
  }
  .slide-down-enter, .slide-down-leave-to {
    transform: scale(.95);
    opacity: 0;
  }
</style>