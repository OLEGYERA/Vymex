<template>
  <div class="facade-navigation-list-header">
    <title-caps>
      {{title}}
      <span class="list-title-counter" v-if="titleCount">{{titleCount}}</span>
    </title-caps>
    <button-add @onClick="$emit('onAction')"/>
  </div>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'
  import ButtonAdd from '@Facade/Button/Add'

  export default {
    name: 'Facades.Navigation.ListHeader',
    components: {
      TitleCaps, ButtonAdd
    },
    props: {
      title: {
        type: String,
        required: true
      },
      titleCount: Number

    }
  }
</script>

<style lang="scss" scoped>
  .facade-navigation-list-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(4) 0;

    .list-title-counter{
      color: $blue;
    }
  }
</style>