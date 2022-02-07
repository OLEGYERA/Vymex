<template>
  <div class="facade-header-add">
    <title-caps>
      <slot name="header-title"/>
      <span class="contacts-amount"><slot name="header-amount"/></span>
    </title-caps>
    <div class="add-item">
      <icon-add/>
    </div>
  </div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps";
import IconAdd from "@Icon/Add";

export default {
  name: 'Singleton.Facades.HeaderAdd',
  components: {TitleCaps, IconAdd},
}
</script>

<style lang="scss" scoped>
  .facade-header-add{
    width: 100%;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey;
    .contacts-amount{
      padding: 0 rem(3);
      color: $blue;
    }
    .add-item {
      position: relative;
      .icon-add{
        height: 24px;
        width: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: $grey-scale-400;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
</style>