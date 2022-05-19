<template>
  <div class="resource-sidebar-folder-access-ui" v-if="status" @click.stop>
    <sidebar-right
        class="sidebar-folder-access-container" @onClose="closeSidebar()">
      <template #main-header>
        <sidebar-header-atom>Доступ к папке</sidebar-header-atom>
      </template>
      <template #main-content>
        <div class="sidebar-main-plate">
          <div class="header-text-group">
            <title-caps>Расположение</title-caps>
            <div class="buttons">
              <div
                  class="button-location"
                  :class="{active: activeButton === buttonKey}"
                  v-for="(button, buttonKey) in buttons"
                  @click="activeButton = buttonKey"
                  :key="buttonKey">
                {{button}}
                <span :class="{'active-numb': activeButton !== buttonKey}" v-if="buttonKey === 0">{{folderParticipants.length || ''}}</span>
              </div>
            </div>
          </div>
            <div class="access-tab" v-show="activeButton === 0">

              <div class="folder-participants" v-if="folderParticipants.length">
                <div class="participants-search">
                  <search :placeholder="'Поиск'"/>
                </div>

                <div class="participant-units">
                  <unit-checkbox-ui :model="participantsIds.includes(participant.id)" v-for="(participant, participantKey) in folderParticipants"
                                    :key="participantKey"
                                    :unit-position="participant.unitName"
                                    :unit-data="participant"
                                    :unit-level="participant.unitLevel"
                                    @onClick="choosePerson(participant.id)"
                  />
                </div>

                <button-base @onClick="editParticipants" :disable="folderParticipants.length === participantsIds.length">
                  Сохранить
                </button-base>
              </div>

              <div class="no-access-plate" v-else>
                <img class="no-access-img" src="@/assets/img/my/access.svg">
                <div class="no-access-title">
                  Файл пока доступен только вам
                </div>
                <text-base>
                  Что бы предоставить доступ к файлу, перейдите в структуру
                </text-base>
              </div>
            </div>

            <div class="structure-tab" v-show="activeButton === 1">
              <div>
                <title-caps class="sidebar-view-header-title">
                  пользователь
                </title-caps>
                <search :placeholder="'Поиск'"/>
              </div>

              <sidebar-structure-ui multiply :structure="structure" :chosen-units="chosenUnits" :view-type="1">
                1 уровень
              </sidebar-structure-ui>
              <button-base @onClick="saveParticipants"
                           :disable="!chosenUnits.length">
                Сохранить
              </button-base>
            </div>

        </div>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  import SidebarRight from "@Facade/Navigation/SidebarRight";
  import Search from "@Facade/Input/Search";
  import ButtonBase from "@Facade/Button/Base";
  import SidebarStructureUi from "./sidebar-structure.ui";
  import TitleCaps from "@Facade/Title/Caps";
  import SidebarHeaderAtom from "./sidebar-header.atom";
  import TextBase from "@Facade/Text/Base"
  import UnitCheckboxUi from "@/LTE/Providers/Company/Structure/unit-checkbox.ui";

  import {mapGetters, mapMutations} from "vuex";


  export default {
    name: 'Providers.Navigation.sidebar.FolderAccess',
    components: {
      SidebarRight, TitleCaps, Search, ButtonBase, SidebarStructureUi, SidebarHeaderAtom,
      TextBase, UnitCheckboxUi
    },
    data() {
      return{
        buttons: ['Доступно', 'Структура'],
        activeButton: 0,
        chosenUnits: [],
        participantsIds: [],
      }
    },
    props: {
      status: {
        type: Boolean,
        required: true
      },
      folderId: {
        type: Number,
        required: true,
      },
    },
    computed: {
      ...mapGetters({
        folderParticipants: 'Resources/getFolderParticipants',
        structure: 'Resources/getStructure',
      }),
    },
    methods: {
      ...mapMutations({
        closeSidebar: 'Resources/closeSidebarFolderAccess',
      }),
      choosePerson(id){
        if (!this.participantsIds.includes(id)) {
          this.participantsIds.push(id)
        } else {
          this.participantsIds.splice(this.participantsIds.indexOf(id), 1)
        }
      },
      editParticipants(){
        this.$core.execViaComponent('Resources', 'shareFolder', [this.participantsIds, 7, this.folderId])
        this.closeSidebar()
      },
      saveParticipants(){
        console.log(this.chosenUnits, 'this.chosenUnits')
        this.$core.execViaComponent('Resources', 'shareFolder', [this.chosenUnits, 7, this.folderId])
        this.closeSidebar()
      }
    },
    beforeMount() {
      this.folderParticipants.map(person => this.participantsIds.push(person.id))
    },

  }
</script>

<style lang="scss" scoped>
  .resource-sidebar-folder-access-ui {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .6);
    z-index: 3;

    .sidebar-folder-access-container ::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
      .sidebar-main{
        width: 372px;
      }
    }
    .sidebar-main-plate {
      display: flex;
      flex-direction: column;
      //justify-content: space-between;
      padding: 20px 20px 4px;
      height: 100%;
      box-sizing: border-box;
      //.header-text-group{
      //  height: 100%;
      //  padding: 0 0 30px;
      //  overflow-y: scroll;
      //}
      .facade-title-caps {
        margin-bottom: 4px;
        padding: 8px 0;
      }
      .facade-input-search{
        margin-bottom: 12px;
      }
      .facade-button-base {
        transform: translateY(-20px);
      }
      .buttons {
        display: flex;
        margin-bottom: rem(12);
        .button-location {
          height: 36px;
          box-sizing: border-box;
          padding: rem(8) rem(16);
          margin-right: rem(8);
          background-color: $grey-scale-400;
          border-radius: 20px;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background-color: $blue;
        }
        .active-numb{
          color: $blue
        }
      }

      .access-tab{
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        //justify-content: space-between;
        //overflow: hidden;
        .folder-participants{
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          //justify-content: space-between;
          .participant-units{
            height: 100%;
            overflow: hidden;
            .su-checkbox{
              margin-bottom: 8px;
            }
          }

        }
        .no-access-plate{
          padding: rem(62) 0;
          text-align: center;

          .no-access-img{
            margin-bottom: rem(14);
          }

          .no-access-title{
            font-weight: 600;
            font-size: 17px;
            line-height: 22px;
            color: $grey-scale-300;
            width: 174px;
            //margin-bottom: ;
            margin: 0 auto rem(12);
          }

          .facade-text-base{
            color: $grey-scale-300;
          }
        }
      }

      .structure-tab{
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .navigation-sidebar-structure-ui{
          height: 100%;
          overflow-y: scroll;
        }
      }
    }


  }
</style>