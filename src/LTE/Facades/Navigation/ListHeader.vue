<template>
  <div class="facade-navigation-list-header">
    <div class="header-left-part">
      <title-caps>
        {{title}}
        <span class="list-title-counter" v-if="titleCount">{{titleCount}}</span>
      </title-caps>
      <div class="setting-slider" :class="{'setting-active': settingCount}" v-if="setting" @click="$emit('onSetting')">
        <icon-setting-slider/>
        <title-caps v-if="settingCount" class="setting-count">{{settingCount}}</title-caps>
      </div>
      <title-caps v-if="settingCount" class="button-reset" @click.native="$emit('onReset')">
        сбросить
      </title-caps>
    </div>

    <div class="header-right-part">
      <icon-sort v-if="sort" @click.native="$emit('onSort')"/>
      <button-add v-if="add" @onClick="$emit('onAction')"/>
    </div>
  </div>
</template>

<script>
  import TitleCaps from '@Facade/Title/Caps'
  import ButtonAdd from '@Facade/Button/Add'
  import IconSettingSlider from "@Icon/SettingSlider"
  import IconSort from "@Icon/Sort"

  export default {
    name: 'Facades.Navigation.ListHeader',
    components: {
      TitleCaps, ButtonAdd, IconSettingSlider, IconSort
    },
    props: {
      title: {
        type: String,
        required: true
      },
      titleCount: Number || String,
      add: {
        type: Boolean,
        default:() => true
      },
      setting: Boolean,
      settingCount: Number,
      sort: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .facade-navigation-list-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(4) 0;

    .header-left-part{
      display: inherit;
      align-items: inherit;
      .list-title-counter{
        color: $blue;
      }
      .setting-slider{
        margin-left: rem(20);
        box-sizing: border-box;
        height: 24px;
        padding: 0 rem(13);
        display: inherit;
        justify-content: center;
        align-items: inherit;
        border-radius: 20px;
        color: #fff;
        background-color: $grey-scale-400;
        cursor: pointer;

        &.setting-active{
          background-color: $blue;
          padding: 0 8px 0 13px;
        }

        .icon-setting-slider{
          display: inherit;
          align-items: inherit;
        }
        .setting-count {
          margin-left: 7px;
          color: #fff;
        }
      }
      .button-reset {
        margin-left: 12px;
        color: $blue;
        cursor: pointer;
      }
    }
    .header-right-part{
      display: inherit;
      align-items: inherit;

      .icon-sort{
        cursor: pointer;
        height: 16px;
      }
      .facade-button-add{
        margin-left: 28px;
      }
    }
  }
</style>