<template>
  <div class="facade-header-add">
    <div class="left-part">
      <title-caps>
        <slot name="header-title"/>
        <span class="contacts-amount"><slot name="header-amount"/></span>
      </title-caps>
      <div class="slider" v-if="settingSlider" @click="$emit('onClick')">
        <icon-setting-slider/>
        <slot name="numb" class="numb"/>
      </div>
      <slot name="text" class="text"/>
    </div>
    <div class="right-part">
      <icon-sort v-if="sort" @click.native="$emit('sortFiles')"/>
      <icon-add @click.native="$emit('create')"/>
    </div>
  </div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps";
import IconAdd from "@Icon/Add";
import IconSort from "@Icon/Sort"
import IconSettingSlider from "@Icon/SettingSlider"

export default {
  name: 'Singleton.Facades.HeaderAdd',
  components: {TitleCaps, IconAdd, IconSort, IconSettingSlider},
  props: {
    sort: Boolean,
    settingSlider: Boolean,
  }
}
</script>

<style lang="scss" scoped>
  .facade-header-add{
    width: 100%;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    .left-part {
      display: inherit;
      align-items: inherit;
      .facade-title-caps {
        margin-right: rem(22);
        .contacts-amount{
          padding: 0 rem(3);
          color: $blue;
        }
      }
      .slider{
        margin-right: rem(12);
        box-sizing: border-box;
        height: 24px;
        padding: 0 rem(12);
        display: inherit;
        justify-content: center;
        align-items: inherit;
        border-radius: 20px;
        color: #fff;
        background-color: $grey-scale-400;
        cursor: pointer;
        .icon-setting-slider {
          //height: 10px;
        }
        .numb {
          margin-right: 7px;
        }
        .text {
          color: $blue;
        }
      }
    }
    .right-part {
      display: inherit;
      align-items: inherit;
      .icon-sort {
        height: 16px;
        margin-right: rem(28);
        cursor: pointer;
      }
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