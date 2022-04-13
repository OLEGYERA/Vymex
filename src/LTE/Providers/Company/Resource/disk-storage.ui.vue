<template>
  <div class="resource-disk-storage-ui">
    <title-caption>Дисковое хранилище</title-caption>
    <div class="storage-memory">
      <div class="slider" :style="{width: `${memoryPercentUsed}%`}" :class="{'slider-middle': memoryPercentUsed > 40, 'slider-full': memoryPercentUsed > 80}"></div>
    </div>
    <div class="storage-footer">
      <div class="footer-group">
        <text-base>
          <span class="free-memory" :class="{middle: memoryPercentUsed > 40, full: memoryPercentUsed > 80}">{{storageSpace.used}} GB</span> /
          {{ storageSpace.total }} GB
        </text-base>
        <icon-info @click.native="modalStatus = true" :class="{middle: memoryPercentUsed > 40, full: memoryPercentUsed > 80}"/>
      </div>

      <div class="modal-storage-space" v-if="modalStatus">
        <div class="storage-outside" @click="modalStatus = false"></div>
        <div class="storage-info">
          <div class="modal-title">
            Свободное пространство в хранилище ({{100 - memoryPercentUsed}} %)
          </div>
          <text-base class="modal-text">
            Чтобы без проблем загружать файлы и отправлять/получать сообщения, советуем расширить пространство в хранилище.
          </text-base>
          <div class="modal-buttons">
            <text-base class="button-detailed">Подробнее</text-base>
            <button-base>Расширить</button-base>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import IconInfo from '@Icon/Info'
  import ButtonBase from '@Facade/Button/Base'
  import {mapGetters} from "vuex";

  export default {
    name: 'Providers.Company.Resource.DiskStorage.Ui',

    components: {
      TextBase,
      TitleCaption,
      IconInfo,
      ButtonBase
    },
    data(){
      return{
        modalStatus: false,
      }
    },
    props: {
      storageSpace: {
        type: Object,
        required: true
      }
    },
    computed:{
      ...mapGetters({
        mainInfo: 'Resources/getMainInfo'
      }),
      memoryPercentUsed() {
        return Math.round((this.storageSpace.used * 100) / this.storageSpace.total)
      },
    },
    methods: {
    },

  }
</script>

<style lang="scss" scoped>
  .resource-disk-storage-ui {
    width: 100%;
    max-width: 250px;
    .facade-title-caption {
      margin-bottom: 8px;
    }
    .storage-memory {
      height: 8px;
      border-radius: 4px;
      margin-bottom: 8px;
      background-color: $grey-scale-400;
      .slider {
        height: 100%;
        background-color: $green;
        border-radius: 4px;
        &-middle {
          background-color: $secondary-yellow;
        }
        &-full {
          background-color: $red;
        }
      }
    }
    .storage-footer {
      position: relative;
      .footer-group{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .free-memory {
          color: #fff;
        }
        .icon-info {
          height: 16px;
          color: transparent;
          cursor: pointer;
          &.middle {
            color: $secondary-yellow;
          }
          &.full {
            color: $red;
          }
        }
      }

      .modal-storage-space{
        .storage-info {
          width: 386px;
          top: 42px;
          right: 0;
          position: absolute;
          padding: rem(20) rem(16) rem(16) rem(20);
          background-color: $grey-scale-400;
          border-radius: 12px;
          box-sizing: border-box;
          z-index: 2;
          transform: translateX(45px);
          //.outside-scope{
          //  position: fixed;
          //  width: 100%;
          //  height: 100%;
          //  top: 0;
          //  left: 0;
          //  background-color: red;
          //}

          &::before {
            position: absolute;
            content: "";
            height: 29px;
            width: 29px;
            background-color: inherit;
            transform: rotate(45deg);
            right: 39px;
            top: -5px;
            z-index: -1;
          }

          .modal-title {
            margin-bottom: rem(5);
            font-weight: 600;
            font-size: 17px;
            line-height: 22px;
            color: #fff;
          }
          .modal-text {
            margin-bottom: rem(18);
          }
          .modal-buttons {
            display: flex;
            justify-content: space-between;

            .button-detailed {
              color: $blue;
              padding: rem(12) 0;
              cursor: pointer;
              &:hover{
                color: $blue-scale-300;
              }
            }

            .facade-button-base {
              border-radius: 8px;
              padding: rem(12) rem(24);
              width: max-content;
            }
          }
        }
        .storage-outside{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
      }
    }
  }
</style>