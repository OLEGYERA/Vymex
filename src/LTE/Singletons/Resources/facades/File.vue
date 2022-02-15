<template>
  <div class="facade-resource-file">
    <div class="file-main">
      <div class="file-image">
        <img v-if="file.type === 'zip'" src="@/assets/img/my/zip.svg">
        <img v-else src="@/assets/img/my/file.svg">
        <icon-group v-if="file.group"/>
      </div>
      <div class="file-text-group">
        <text-base>{{file.title}}</text-base>
        <title-caption>{{content}}</title-caption>
      </div>
    </div>
    <icon-points-vertical @click.native="onClick"/>
    <div class="action-list-outside" v-if="actionListStatus" @click="actionListStatus = false"></div>
    <action-list :action-list-status="actionListStatus" :items="items" @onClick="changePage"/>
    <sidebar-folder-access :status="sidebarStatus"/>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconGroup from '@Icon/Group'
  import IconPointsVertical from "@Icon/PointsVertical"
  import ActionList from "@Facade/Modal/ActionList";
  import SidebarFolderAccess from "@/LTE/Providers/Navigation/sidebar/SidebarFolderAccess";

  import {mapGetters} from "vuex";

  export default {
    name: 'Facade.Resource.File',
    components: {
      TextBase,
      TitleCaption,
      IconGroup,
      IconPointsVertical,
      ActionList,
      SidebarFolderAccess
    },
    data() {
      return{
        actionListStatus: false,
      }
    },
    props: {
      file: Object,
      items: Array,
    },
    computed: {
      content() {
        return `${this.file.content.size} MB ${this.file.content.date}`
      },
      ...mapGetters({
        sidebarStatus: 'Resources/sidebarFolderAccessStatus',
      })
    },
    methods: {
      changePage(key) {
        // console.log(key)
        this.actionListStatus = false;
        this.$emit('getActiveValue', key)
      },
      onClick() {
        this.actionListStatus=true
        this.$emit('getChosenFile')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .facade-resource-file {
    position: relative;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    background-color: $grey-scale-400;
    cursor: pointer;
    .file-main {
      display: inherit;
      align-items: inherit;
      .file-image {
        height: 36px;
        margin-right: 12px;
        position: relative;
        .icon-group {
          position: absolute;
          color: $grey-scale-300;
          height: 16px;
          bottom: 0;
          right: 0;
        }
      }
      .facade-text-base {
        color: #fff;
      }
    }
    .icon-points-vertical {
      padding: 0 10px;
      color: #fff;
      height: 16px;
    }
    //.modal-action-list-space {
    .action-list-outside{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      cursor: auto;
      //background-color: #73D13D;
    }
    .facade-modal-action-list {
      position: absolute;
      right: 14px;
      top: 40px;
    }
    //}
  }
</style>