<template>
  <div class="navigation-sidebar-appoint-executor-ui" v-if="status">
    <sidebar-right class="sidebar-appoint-executor-plate" @onClose="closeAppointSidebar()">
      <template #main-header>
        <sidebar-header-atom>Назначить исполнителя</sidebar-header-atom>
      </template>
      <template #main-content>
        <div class="sidebar-info-group">
          <div class="sidebar-header-group">
            <title-caps class="sidebar-appoint-executor-subtitle">Пользователи</title-caps>
            <input-search :placeholder="'Поиск'"/>
          </div>
          <sidebar-structure-ui :structure="structure" :view-type="2" :chosen-units="chosenUnits" @onClick="chooseUser"/>
          <button-base :disable="!chosenUnits.length" @onClick="apply">Применить</button-base>
        </div>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
  /*eslint-disable*/
  import InputSearch from "@Facade/Input/Search";
  import TitleCaps from "@Facade/Title/Caps";
  import {UnitUi, UnitSettingUi} from '@Providers'
  import SidebarRight from "@Facade/Navigation/SidebarRight";
  import SidebarHeaderAtom from './sidebar-header.atom'
  import ButtonBase from "@Facade/Button/Base";
  import UnitCheckboxUi from "@/LTE/Providers/Company/Structure/unit-checkbox.ui";
  import SidebarStructureUi from "./sidebar-structure.ui";

  import ArrowRight from "@Icon/ArrowRight";
  import {mapMutations} from "vuex";

  export default {
    name: 'Providers.Navigation.Sidebar.AppointExecutor.Ui',
    components:{
      TitleCaps,
      InputSearch,
      UnitCheckboxUi,
      UnitSettingUi,
      UnitUi,
      SidebarRight,
      SidebarHeaderAtom,
      ArrowRight,
      ButtonBase,
      SidebarStructureUi
    },
    data(){
      return{
      }
    },
    props:{
      structure: {
        type: Object,
        required: true
      },
      // disable: {
      //   type: Boolean,
      //   required: true,
      // },
      status: {
        type: Boolean,
        required: true
      },
      chosenUnits: Array,
    },
    methods:{
      ...mapMutations({
        closeAppointSidebar: 'Tasks/closeAppointSidebar',
      }),
      onClick(key){
        this.levels[key].disable = !this.levels[key].disable
      },
      chooseUser(id) {
        this.$emit('chooseUser', id)
      },
      apply() {
        this.$emit('setUser')
        this.closeAppointSidebar()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .navigation-sidebar-appoint-executor-ui{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 4;
    .sidebar-appoint-executor-plate::v-deep{
      display: flex;
      height: 100%;
      background-color: $grey;
      .sidebar-main{
        width: 372px;
        .sidebar-info-group{
          height: 100%;
          overflow: hidden;
          box-sizing: border-box;
          padding: 20px 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .sidebar-header-group{
            margin-bottom: 12px;
            .sidebar-appoint-executor-subtitle{
              padding: rem(8) 0;
              margin-bottom: 8px;
            }
          }
          .sidebar-structure{
            height: 100%;
            overflow-y: scroll;
            padding: 0 0 20px;
            box-sizing: border-box;
            .level-plate{
              margin-bottom: 12px;
              .sidebar-level-header{
                display: flex;
                padding: rem(6) 0;
                margin-bottom: 8px;
                align-items: center;
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
              }
              .header-arrow{
                cursor: pointer;
              }
              .structure-unit-ui{
                margin-bottom: 8px;
              }
            }
          }
          .facade-button-base{
            transform: translateY(-20px);
          }
        }
      }
    }
  }
</style>