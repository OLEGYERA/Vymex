<template>
  <div class="resource-main-view">
    <navigation-close @onClick="closeResources"/>

    <header class="resource-main-header">
      <div class="header-group-text">
        <title-base>Ресурсы</title-base>
        <text-base>Тут храняться все ваши и доступные вам файлы</text-base>
      </div>
      <div class="disk-storage-space">
        <title-caption>Дисковое хранилище</title-caption>
        <div class="storage-memory">
          <div ref="slider" class="slider" :class="{'slider-middle': memoryPercent > 40, 'slider-full': memoryPercent > 80}"></div>
        </div>
        <div class="storage-footer">
          <div class="footer-group">
            <text-base>
              <span class="free-memory" :class="{middle: memoryPercent > 40, full: memoryPercent > 80}">{{fullMemoryStorage}}</span> / 15 GB
            </text-base>
            <icon-info @click.native="modalStatus = true" :class="{middle: memoryPercent > 40, full: memoryPercent > 80}"/>
          </div>

          <div class="modal-storage-space" v-if="modalStatus">
            <div class="storage-outside" @click="modalStatus = false"></div>
            <div class="storage-info">
              <div class="modal-title">
                Свободное пространство в хранилище ({{100 - memoryPercent}} %)
              </div>
              <text-base class="modal-text">
                Вскоре вы не сможете загружать файлы на Диск, а также получать и отправлять письма
              </text-base>
              <div class="modal-buttons">
                <text-base class="button-detailed">Подробнее</text-base>
                <button-base>Купить место</button-base>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="resource-folders">
      <folder-ui v-for="(folder, folderKey) in folders" :folder="folder" :key="folderKey" @onClick="changePage"/>
    </main>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import ButtonBase from '@Facade/Button/Base'
  import {FolderUi} from '@Providers'
  import {mapMutations} from "vuex";

  export default {
    name: 'vx.resource.main',
    components: {
      NavigationClose,
      TitleBase,
      TextBase,
      TitleCaption,
      FolderUi,
      ButtonBase
    },
    data() {
      return{
        memoryPercent: 70,
        modalStatus: false,
        folders: [
          {
            id: 1,
            title: 'Ресурсы C.Е.',
            content: {
              folders: 2,
              files: null
            },
            group: null,
            trash: null
          },
          {
            id: 2,
            title: 'Рабочие файлы',
            content: {
              folders: 2,
              files: 12,
            },
            group: null,
            trash: null
          },
          {
            id: 3,
            title: 'Доступные мне',
            content: {
              folders: 12,
              files: 21
            },
            group: true,
            trash: null,
          },
          {
            id: 4,
            title: 'Корзина',
            content: {
              folders: null,
              files: null
            },
            group: null,
            trash: true
          }
        ]
      }
    },
    computed:{
      fullMemoryStorage() {
        return `${Math.round((15 -(this.memoryPercent * 15 / 100))*100) / 100} GB`
      }
    },
    methods: {
      ...mapMutations({
        changeStatus: 'Company/changeStatus'
      }),
      setSliderWidth() {
        this.$refs['slider'].style.width = this.memoryPercent + '%'
      },
      changePage({id}) {
        if(id === 1) {
          this.$router.push({name: 'vx.resource.structural.units'})
        }
        if(id === 2){
          this.$router.push({name: 'vx.resource.worker.files'})
        }
        if(id === 4){
          this.$router.push({name: 'vx.resource.trash.folder'})
        }
      },
      closeResources(){
        this.$router.push({name: 'vx.co'})
        this.changeStatus(0)
      }
    },
    mounted() {
      this.setSliderWidth()
    },

  }
</script>

<style lang="scss" scoped>
  .resource-main-view {
    position: relative;
    width: 100%;

    header.resource-main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48px;

      .facade-title-base {
        margin: 0 0 12px;
      }
      .disk-storage-space {
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
              width: 400px;
              top: 42px;
              right: 0;
              position: absolute;
              padding: rem(20) rem(16) rem(16) rem(20);
              background-color: $grey-scale-400;
              border-radius: 12px;
              box-sizing: border-box;
              z-index: 0;
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
    }
  }
</style>