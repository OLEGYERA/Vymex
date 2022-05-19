<template>
  <div class="file-storage-main-view">
    <navigation-close @onClick="$router.push({name: 'vx.co.control-center'})"/>

    <header class="file-storage-header">
      <div class="header-group-text">
        <title-base>Файловое хранилище</title-base>
        <text-base>Тут хранятся все ваши и доступные вам файлы</text-base>
      </div>

      <disk-storage-ui :storage-space="mainInfo.storageSpace"/>
    </header>

    <div class="storage-view-plate">
      <navigation-tabs class="storage-tabs-info"
                       :tabs="[{title: 'хранилище', count: '12.32 GB'}, {title: 'корзина', count: '459 MB'}]" :current-tab="currentNavigationTab" @onTab="currentNavigationTab = $event">
        <template #tab-content-0>
          <div class="storage-space-group">
            <div class="info-note">
              <text-base>Вам доступно 15GB на 32 структурных единиц</text-base>
              <title-caps>Купить больше места</title-caps>
            </div>

            <div class="storage-level-title">
              <title-caps>1 уровень</title-caps>
              <title-caps class="storage-memory-amount">136.2 GB</title-caps>
            </div>

            <div class="storage-levels-plate">
              <div class="position-memory-level level1">
                <title-sub>Должность 1 уровня</title-sub>
                <title-caps class="storage-memory-amount">136.2</title-caps>
              </div>
            </div>

            <div class="storage-level-title">
              <title-caps>2 уровень</title-caps>
              <title-caps class="storage-memory-amount">26.23 GB</title-caps>
            </div>

            <div class="storage-levels-plate">
              <div class="position-memory-level level2">
                <title-sub>Должность 2 уровня</title-sub>
                <title-caps class="storage-memory-amount">16.20</title-caps>
              </div>
              <div class="position-memory-level level2">
                <title-sub>Должность 2 уровня</title-sub>
                <title-caps class="storage-memory-amount">10.2</title-caps>
              </div>
            </div>

            <div class="storage-level-title">
              <title-caps>3 уровень</title-caps>
              <title-caps class="storage-memory-amount">26.23 GB</title-caps>
            </div>

            <div class="storage-levels-plate">
              <div class="position-memory-level level3">
                <title-sub>Должность 3 уровня</title-sub>
                <title-caps class="storage-memory-amount">16.20</title-caps>
              </div>
              <div class="position-memory-level level3">
                <title-sub>Должность 3 уровня</title-sub>
                <title-caps class="storage-memory-amount">10.2</title-caps>
              </div>
            </div>

            <div class="storage-level-title">
              <title-caps>4 уровень</title-caps>
              <title-caps class="storage-memory-amount">832.25 GB</title-caps>
            </div>

            <div class="storage-arrow-header" >
              <div class="title-right-part" @click="onClick('1')">
                <div class="level-title-arrow">
                  <arrow-right :class="{'open-units': open1}"/>
                </div>
                <title-caps>Design <span class="title-amount">2</span></title-caps>
              </div>

              <title-caps class="storage-memory-amount">26.23 GB</title-caps>
            </div>

            <div class="storage-levels-plate" v-if="open1">
              <div class="position-memory-level level4">
                <title-sub>Должность 4 уровня</title-sub>
                <title-caps class="storage-memory-amount">16.20</title-caps>
              </div>
              <div class="position-memory-level level4">
                <title-sub>Должность 4 уровня</title-sub>
                <title-caps class="storage-memory-amount">10.2</title-caps>
              </div>
            </div>

            <div class="storage-arrow-header" >
              <div class="title-right-part" @click="onClick('2')">
                <div class="level-title-arrow">
                  <arrow-right :class="{'open-units': open2}"/>
                </div>
                <title-caps>Manager <span class="title-amount">12</span></title-caps>
              </div>

              <title-caps class="storage-memory-amount">26.23 GB</title-caps>
            </div>

            <div class="storage-arrow-header" >
              <div class="title-right-part" @click="onClick('3')">
                <div class="level-title-arrow">
                  <arrow-right :class="{'open-units': open3}"/>
                </div>
                <title-caps>call centre operator <span class="title-amount">42</span></title-caps>
              </div>

              <title-caps class="storage-memory-amount">26.23 GB</title-caps>
            </div>

          </div>
        </template>
        <template #tab-content-1>
          <div class="trash-space-group">
            <input-search placeholder="Поиск"/>

            <div class="info-note">
              <text-base>Файлы хранятся в корзине 30 дней, а затем автоматически удаляются.</text-base>
              <title-caps class="clean-trash-btn" @click.native="modalStatusDelete=true">Очистить корзину</title-caps>
            </div>

            <modal-base :status="modalStatusDelete" @onClose="modalStatusDelete=false" @onOk="deleteAll">
              <template #title>Удалить навсегда?</template>
              <template #description>Все объекты в корзине будут удалены без возможности их восстановления</template>
              <template #button-accept>Удалить</template>
            </modal-base>

            <div class="trash-main-content" v-if="trash.folders.length || trash.files.length">

              <list-header :add="false" title="папки" :title-count="trash.folders.length"/>

              <div class="trash-folders">
                <folder-ui v-for="(folder, folderKey) in trash.folders"
                           :folder="folder"
                           :key="folderKey"
                           @onClick="$router.push({name: 'vx.resource.new.folder', params: {id: folder.id}})"
                />
              </div>

              <list-header :add="false" :sort="trash.files.length > 1" class="files-header" @onSort="modalStatusSort= true" title="Файлы" :title-count="trash.files.length"/>

              <modal-base :status="modalStatusSort" @onClose="modalStatusSort=false" @onOk="sortFiles">
                <template #title>Сортировка</template>
                <template #content>
                  <button-checkbox
                      v-for="(value, valueKey) in modalSortValues"
                      :key="valueKey"
                      :title="value"
                      :selected="activeButton === valueKey"
                      @onCheckbox="setNewValue(valueKey)"/>
                </template>
                <template #button-accept>Применить</template>
              </modal-base>

              <file-ui
                  v-for="(file, fileKey) in trash.files"
                  :file="file" :key="fileKey"
                  :actions="actions"
                  @getActiveValue="actionListChange"
                  @deleteFile="modalStatusDeleteFile=true"
                  @getChosenFile="activeFile = fileKey">
                <template>Удалить безвозвратно</template>
              </file-ui>

              <modal-base :status="modalStatusRestoreYourself" @onClose="modalStatusRestoreYourself=false" @onOk="modalStatusRestoreYourself=false">
                <template #title>Восстановление файла</template>
                <template #description>Файлы будет востановлен и доступен вам</template>
                <template #content>
                  <file-ui :file="trash.files[activeFile]"/>
                </template>
                <template #button-accept>Востановить</template>
              </modal-base>
              <modal-base :status="modalStatusRestoreOwner" @onClose="modalStatusRestoreOwner=false" @onOk="modalStatusRestoreOwner=false">
                <template #title>Восстановление файла</template>
                <template #description>Файлы будет востановлен и доступен вам и владельцу</template>
                <template #content>
                  <file-ui :file="trash.files[activeFile]"/>
                </template>
                <template #button-accept>Востановить</template>
              </modal-base>
              <modal-base :status="modalStatusDeleteFile" @onClose="modalStatusDeleteFile=false" @onOk="modalStatusDeleteFile=false">
                <template #title>Удаление файла</template>
                <template #description>Файл будет удален, это действие безвозвратно</template>
                <template #content>
                  <file :file="trash.files[activeFile]"/>
                </template>
                <template #button-accept>Удалить</template>
              </modal-base>
            </div>

            <div class="empty-trash" v-else>
              <title-caps class="empty-trash-subtitle">Объекты</title-caps>
              <div class="background-plate">
                <img class="empty-trash-image" src="@/assets/img/my/empty-trash.svg">
                <title-caps>Ваша корзина пуста</title-caps>
              </div>
            </div>


          </div>
        </template>
      </navigation-tabs>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from "@Facade/Navigation/Comeback";
  import NavigationClose from '@Facade/Navigation/Close'
  import {FolderUi, DiskStorageUi, FileUi} from '@Providers'
  import NavigationTabs from '@Facade/Navigation/Tabs'
  import ArrowRight from "@Icon/ArrowRight";
  import InputSearch from "@Facade/Input/Search";
  import ModalBase from "@Facade/Modal/Base"
  import ButtonCheckbox from "@Facade/Button/Checkbox"
  import ListHeader from "@Facade/Navigation/ListHeader";

  import TitleSemi from "@Facade/Title/Semi";
  import TitleCaption from "@Facade/Title/Caption";
  import TextBase from "@Facade/Text/Base";
  import ImageAvatar from "@Facade/Image/Avatar";
  import TitleCaps from "@Facade/Title/Caps";
  import TitleBase from "@Facade/Title/Base";
  import TitleSub from "@Facade/Title/Sub";
  import {mapGetters} from "vuex";

  export default {
    name: 'vx.co.control-center.file-storage.main.view',
    components: {
      NavigationComeback, TitleSemi, TitleCaption, TextBase, NavigationTabs, ArrowRight, ModalBase,
      ImageAvatar, TitleCaps, TitleBase, TitleSub, NavigationClose, DiskStorageUi, FolderUi, InputSearch,
      FileUi, ButtonCheckbox, ListHeader
      // UnitPrivilegeUi
    },
    created() {
      this.$core.execViaComponent('Resources', 'getInfo', 7)
    },
    data: () => ({
      currentNavigationTab: 0,
      modalStatusDelete: false,
      modalStatusSort: false,
      modalStatusRestoreYourself: false,
      modalStatusRestoreOwner: false,
      modalStatusDeleteFile: false,
      modalSortValues: ['По дате (сначала новое)', 'По дате (сначала старое)', 'По размеру файлов'],
      activeButton: 2,
      activeFile: null,
      actions: ['Восстановить (себе)', 'Восстановить (владельцу)'],
      open1: false,
      open2: false,
      open3: false,
      trash: {
        folders: [
          {
            "id": 1,
            "name": "folder_name",
            "isShared": false,
            "childFoldersCount": 85,
            "filesCount": 2,
            "workerId": 1
          },
          {
            "id": 2,
            "name": "folder_name2",
            "isShared": false,
            "childFoldersCount": 97,
            "filesCount": 0,
            "workerId": 1
          }
        ],
        files: [
          {
            "id": 1,
            "fileId": 1,
            "createdAt": "2021-12-15 20:03:08",
            "isShared": false,
            "label": "file_name",
            "extension": "ext",
            "size": 124,
            "workerId": 1
          },
          {
            "id": 2,
            "fileId": 1,
            "createdAt": "2019-01-14 14:59:08",
            "isShared": false,
            "label": "file_name2",
            "extension": "ext",
            "size": 124,
            "workerId": 1
          }
        ],
      }
    }),
    computed: {
      ...mapGetters({
        searchedContacts: 'Messenger/getSearchedContacts',
        mainInfo: 'Resources/getMainInfo',
      }),
    },
    methods: {
      deleteAll(){
        this.modalStatusDelete = false
        this.trash = {folders: [], files: []}
      },
      setNewValue(id) {
        this.activeButton = id
      },
      onClick(key){
        this[`open${key}`] = !this[`open${key}`]
      },
      actionListChange(key) {
        if(key === 0){
          this.modalStatusRestoreYourself = true
        }
        if(key === 1){
          this.modalStatusRestoreOwner = true
        }
      },
      sortFiles(){
        this.modalStatusSort=false;
        // if(this.activeButton===0){
        //   this.trash.files.sort((a, b)=> +b.content.date.split('.').reverse().join('') - +a.content.date.split('.').reverse().join(''))
        // }
        // if(this.activeButton===1){
        //   this.trash.files.sort((a, b)=> +a.content.date.split('.').reverse().join('') - +b.content.date.split('.').reverse().join(''))
        // }
        // if(this.activeButton===2){
        //   this.trash.files.sort((a, b)=> a.content.size.replace(',', '.') - b.content.size.replace(',', '.'))
        // }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .file-storage-main-view{
    .file-storage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .facade-title-base {
        margin: 0 0 12px;
      }
    }

    .storage-view-plate{
      .facade-navigation-tabs::v-deep{
        .navigation-tabs-header{
          justify-content: flex-start;
          padding: 24px 0 12px;

          .navigation-tab-item{
            padding: 0 0 10px;
          }
        }

      }
      .info-note{
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background-color: $grey-scale-500;
        border-radius: 8px;

        .facade-title-caps{
          color: $blue;
          cursor: pointer;
        }

        .clean-trash-btn{
          color: $red;
        }
      }

      .storage-space-group{
        .storage-memory-amount{
          padding: 4px 8px;
          background-color: rgba($grey-scale-700, .2);
          border: 1px solid rgba(#fff, .15);
          border-radius: 8px;
          color: #fff;
        }

        .storage-level-title{
          padding: 4px 0;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;

        }

        .storage-levels-plate{
          margin-bottom: 24px;

          .position-memory-level{
            padding: 14px 8px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 8px;

            &.level1{
              background-color: $su-level-1;
            }
            &.level2{
              background-color: $su-level-2;
            }
            &.level3{
              background-color: $su-level-3;
            }
            &.level4{
              background-color: $su-level-4;
            }

            .facade-title-sub{
              color: $grey-scale-500;
            }

          }
        }

        .storage-arrow-header{
          padding: 4px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 28px;
          //padding-right: rem(8);
          margin-bottom: 4px;
          cursor: pointer;
          .title-right-part{
            display: inherit;
            align-items: inherit;
            .level-title-arrow{
              border-right: 1px solid $grey-scale-200;
              margin-right: 8px;
              .icon-arrow-right{
                display: flex;
                color: $grey-scale-200;
                height: 16px;
                margin-right: 12px;
                transition: transform .2s;
                svg {
                  align-self: center;
                  height: 14px;
                }
              }
              .open-units{
                transform: rotate(90deg);
              }
            }
            .title-amount{
              color: $blue;
            }
          }
        }
      }

      .trash-space-group{
        .facade-input-search{
          margin-bottom: 24px;
        }

        .trash-main-content{
          .facade-navigation-list-header{
            height: 36px;
            margin-bottom: 4px;
          }
          .trash-folders {
            margin-bottom: 20px;
          }
        }

        .empty-trash{
          .empty-trash-subtitle{
            padding: 8px 0;
            margin-bottom: rem(4);
          }
          .background-plate {
            height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: $grey-scale-500;
            border-radius: 12px;
            font-weight: 600;
            font-size: 17px;
            line-height: 22px;
            color: $grey-scale-300;
            .empty-trash-image {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
</style>