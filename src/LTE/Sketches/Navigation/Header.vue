<template>
  <div class="sketch-navigation-header">
    <transition name="vx-center-right" @after-enter="isAnimationEnded = true">
      <div class="navigation-header-body" v-if="tiny">
        <div class="header-base header-base-tiny"
             @click="handleHeaderToggle(true)">
          <icon-burger/>
        </div>
      </div>
    </transition>
    <transition name="vx-center-left" @after-enter="isAnimationEnded = true">
      <div class="navigation-header-body" v-if="!tiny">
        <div class="header-base">
          <title-caps>Навигация</title-caps>
          <button-close @onClick="handleHeaderToggle(false)"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import IconBurger from '@Icon/Burger'
  import TitleCaps from '@Facade/Title/Caps'
  import ButtonClose from "@/LTE/Facades/Button/Close";

  export default {
    name: 'Sketch.Navigation.Header',
    props: {
      tiny: {
        type: Boolean,
        required: true
      }
    },
    components: {
      IconBurger,
      TitleCaps,
      ButtonClose
    },
    data(){
      return {
        isAnimationEnded: true,
      }
    },
    methods: {
      handleHeaderToggle(status){
        if(this.isAnimationEnded === true){
          this.isAnimationEnded = false;
          console.log(status)
          this.$emit('onToggle', status);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sketch-navigation-header{
    display: flex;
    align-items: center;
    .navigation-header-body{
      flex-shrink: 0;
      min-width: 100%;
      .header-base{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        box-sizing: border-box;
        &.header-base-tiny{
          cursor: pointer;
          color: #fff;
          padding: 22px 20px;
          justify-content: center;
          background-color: $blue;
        }
      }
    }
  }
</style>