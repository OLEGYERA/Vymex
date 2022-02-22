<template>
  <div class="navigation-sidebar-assign-user-ui">
    <sidebar-right class="sidebar-assign-user-plate">
      <template #main-header>
        <sidebar-header-atom>Назначить исполнителя</sidebar-header-atom>
      </template>
      <template #main-content>
        <div class="sidebar-info-group">
          <div class="sidebar-header-group">
            <title-caps class="sidebar-assign-user-subtitle">Пользователи</title-caps>
            <input-search :placeholder="'Поиск'"/>
          </div>
          <sidebar-structure-ui :levels="levels" :view-type="2"/>
          <button-base>Применить</button-base>
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
  // import {SidebarHeaderAtom} from '@Providers'
  import ButtonBase from "@Facade/Button/Base";
  import SidebarHeaderAtom from "@/LTE/Providers/Navigation/sidebar/sidebar-header.atom";
  import UnitCheckboxUi from "@/LTE/Providers/Company/Structure/unit-checkbox.ui";
  import SidebarStructureUi from "./sidebar-structure.ui";

  import ArrowRight from "@Icon/ArrowRight";

  export default {
    name: 'Providers.Navigation.Sidebar.AssignUser.Ui',
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
      levels: {
        type: Array,
        required: true
      },
      disable: {
        type: Boolean,
        required: true,
      }
    },
    methods:{
      onClick(key){
        this.levels[key].disable = !this.levels[key].disable
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation-sidebar-assign-user-ui{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 4;
    .sidebar-assign-user-plate::v-deep{
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
            .sidebar-assign-user-subtitle{
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