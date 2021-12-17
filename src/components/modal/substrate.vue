<template>
  <transition name="slide">
    <div class="modal-substrate-component" v-if="status">
      <slot/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'substrate-component',
    props: {
      status: Boolean
    },
    mounted() {
      this.disableScroller();
    },
    methods: {
      enableScroller(){
        document.querySelector('html').style.overflow = 'unset'
      },
      disableScroller(){
        document.querySelector('html').style.overflow = 'hidden'
      }
    },
    watch: {
      status(to){
        to ? this.disableScroller() : this.enableScroller()
      }
    }
  }
</script>


<style lang="scss" scoped>
  .modal-substrate-component{
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $grey;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: .25s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }

  .slideback-leave-active,
  .slideback-enter-active {
    transition: 1s;
  }
  .slideback-enter {
    transform: translate(-100%, 0);
  }
  .slideback-leave-to {
    transform: translate(100%, 0);
  }
</style>