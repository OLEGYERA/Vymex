<template>
  <div class="resource-file-ui">
    <div class="file-main-section">
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
    <modal-action-list
        :status="actionListStatus"
        :actions="actions"
        @onList="changePage"
        @onDelete="$emit('deleteFile')"
        @onClose="actionListStatus=false"
    >
      <template #del-title><slot/></template>
    </modal-action-list>
    <sidebar-folder-access :status="sidebarStatus"/>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconGroup from '@Icon/Group'
  import IconPointsVertical from "@Icon/PointsVertical"
  import ModalActionList from "@Facade/Modal/ActionList";
  import SidebarFolderAccess from "@/LTE/Providers/Navigation/sidebar/sidebar-folder-access.ui";

  import {mapGetters} from "vuex";

  export default {
    name: 'Providers.Company.Resource.File.Ui',
    components: {
      TextBase,
      TitleCaption,
      IconGroup,
      IconPointsVertical,
      ModalActionList,
      SidebarFolderAccess
    },
    data() {
      return{
        actionListStatus: false,
      }
    },
    props: {
      file: Object,
      actions: Array,
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
        this.actionListStatus = false;
        this.$emit('getActiveValue', key)
      },
      onClick() {
        this.actionListStatus=true
        this.$emit('getChosenFile')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .resource-file-ui {
    position: relative;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    background-color: $grey-scale-400;
    cursor: pointer;
    .file-main-section {
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
    .facade-modal-action-list::v-deep {
      right: 15px;
      .action-list-body{
        transform: translateX(-100%);
        top: 6px;
      }
    }
  }
</style>