<template>
  <div class="task-info-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})"/>
    <div class="task-navigation-header">

      <div class="header-left-part">
        <div class="header-date-border"></div>
        <icon-calendar/>
        <div class="task-finish-date">{{ finishDate }}</div>
        <div class="task-dropdown-group">
          <div class="task-status-dropdown" @click="statusDropdown = true">
            <div class="status-title">{{statusSelected}}</div>
            <icon-dropdown-arrow/>
          </div>
          <div class="dropdown-action-list" v-if="statusDropdown">
            <div class="action-list-substrate" @click.stop="statusDropdown = false"></div>
            <div class="action-list-body">
              <div v-for="(item, itemKey) in dropdownItems"
                   :key="itemKey"
                   class="action-item"
                   @click.stop="changeStatus(item.status)">
                {{ item.text }}
              </div>
<!--              <div class="action-item action-item-del" @click.stop="handleClickOnDelete">-->
<!--                Удалить-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>

      <div class="header-right-part">
        <div class="nav-button" @click="$router.push({name: 'vx.co.task.edit', params: {taskID: task.id}})">
          <icon-edit/>
        </div>
        <div class="nav-button" @click="statusDelete = true">
          <icon-trash/>
        </div>

        <modal-base :status="statusDelete" @onClose="statusDelete = false" @onOk="deleteTask">
          <template #title>Удалить задачу?</template>
          <template #description>Это действие необратимо</template>
          <template #content>
            <title-caps>Задача</title-caps>
            <div class="task-name-box">
              <title-sub>{{task.title}}</title-sub>
            </div>
          </template>
          <template #button-accept>Удалить</template>
        </modal-base>
      </div>
    </div>

    <title-base class="task-info-title">{{task.title}}</title-base>
    <text-base class="task-description">{{task.description}}</text-base>

    <div class="task-checklist-container">
      <task-checklist v-for="(checklist, checklistKey) in task.checklists" :key="checklistKey" :checklist-key="checklistKey" :check-list="checklist" @editChecklist="editChecklist"/>
    </div>

    <div class="button-add-list">
      <icon-add/>
      <text-base>Добавить список</text-base>
    </div>

    <navigation-list-header title="Файлы" :title-count="task.files.length"/>
    <div class="task-files">
      <file-ui v-for="(file, key) in task.files" :file="file" :key="key"/>
    </div>

    <div class="task-workers-group">
      <div class="task-watchers">
        <navigation-list-header title="Следят" :title-count="task.watchers.length"/>
        <unit-setting-ui v-for="(watcher, watcherKey) in task.watchers"
                         :key="watcherKey"
                         :unit-data="watcher"
                         :unit-level="watcher.unitLevel"
                         :unit-position="watcher.unitName"
        />
      </div>
      <div class="task-executor">
        <navigation-list-header title="исполнители" :title-count="1" :add="false"/>
        <unit-setting-ui :unit-data="task.assignee" :unit-position="task.assignee.unitName" :unit-level="task.assignee.unitLevel"/>
      </div>
    </div>

    <navigation-tabs :tabs="[{title: 'Комментарии', count: task.comments.length}, {title: 'История изменений', count: 5}]" :current-tab="currentNavigationTab" @onTab="currentNavigationTab = $event">
      <template #tab-content-0>
        <div class="input-send-comment">
          <input-message :model="comment" placeholder="Ваш комментарий" @onInput="comment = $event"/>
          <div class="comment-send-button" :disable="!comment" @click="sendComment">
            <icon-send-message/>
          </div>
        </div>
        <div class="task-comments-plate">
          <task-comment v-for="(comment, commentKey) in task.comments" :key="commentKey" :comment="comment"/>
        </div>
      </template>
      <template #tab-content-1>
        <div style="background-color: red">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, culpa cum dolor ea, eligendi expedita fugiat incidunt magni mollitia, nisi nostrum placeat vel? Ad dicta dolore facilis labore magnam ut?
        </div>
      </template>
    </navigation-tabs>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import InputBase from '@Facade/Input/Base'
  import InputTextArea from '@Facade/Input/TextArea'
  import TitleCaps from '@Facade/Title/Caps'
  import InputDate from '@Facade/Input/Date'
  import InputCheckbox from '@Facade/Input/Checkbox'
  import TextBase from '@Facade/Text/Base'
  import {UnitUi, UnitSettingUi, UnitCheckboxUi, SidebarAppointExecutorUi, SidebarAddObserver, FileUi, TaskComment, TaskChecklist} from '@Providers'
  import NavigationListHeader from '@Facade/Navigation/ListHeader'
  import {mapGetters, mapMutations} from "vuex";
  import ModalBase from "@Facade/Modal/Base"
  import ButtonBase from '@Facade/Button/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'
  import ButtonAdd from '@Facade/Button/Add'
  import ModalActionList from "@Facade/Modal/ActionList";
  import NavigationTabs from '@Facade/Navigation/Tabs'
  import InputMessage from "@Facade/Input/Message";
  import TitleSub from '@Facade/Title/Sub'
  import ImageAvatar from '@Facade/Image/Avatar'


  export default {
    name: 'vx.co.task.info.view',
    components: {
      NavigationComeback, TitleBase, InputBase, InputTextArea, TitleCaps, InputDate, InputCheckbox, TextBase,
      UnitUi, UnitSettingUi, UnitCheckboxUi, ButtonBase, ButtonSecondary, FileUi, NavigationTabs, InputMessage,
      NavigationListHeader, SidebarAppointExecutorUi, ModalBase, ButtonAdd, SidebarAddObserver, ModalActionList,
      TitleSub, ImageAvatar, TaskComment, TaskChecklist
    },
    data: () => ({
      statusDropdown: false,
      statusDelete: false,
      comment: '',
      currentNavigationTab: 0,
      dropdownItems: [],
      // task: {
      //   "id": 1,
      //   "title": "Task 2",
      //   "creatorId": 1,
      // "description": "description of task is absolutely dumb",
      // "status": "in_progress",
      // "isTimeless": 0,
      // "start": "1994-11-06 11:22:33",
      // "finish": "2099-09-09 11:22:33",
      // "assignee": {
      //   "id": 2,
      //   "avatar": null,
      //   "name": "Andrew",
      //   "lastname": "Ryan",
      //   "level": 4,
      //   "unitName": "Executor",
      //       "unitLevel": 1
      // },
      // "watchers": [
      //   {
      //     "id": 1,
      //     "avatar": null,
      //     "name": 'oh',
      //     "lastname": 'uh',
      //     "level": 1,
      //     "unitName": "CEO",
      //     "unitLevel": 1
      // }
      // ],
      // "checklists": [
      //     {title: 'bababa', items: [{text: 'gffgfgf', status: false}, {text: 'skjsjsjsj', status: true}]},
      //     {title: 'bababa', items: [{text: 'gffgfgf', status: true}, {text: 'skjsjsjsj', status: false}]}
      //     ],
      // "comments": [
      //   {
      //     "id": 2,
      //     "content": "Test content 2 for comment 1",
      //     "user": {
      //       "id": 1,
      //       "avatar": null,
      //     "name": null,
      //   "lastname": null
      // }
      // },
      // {
      //   "id": 3,
      //     "content": "Test content 2 for comment 1",
      //     "user": {
      //   "id": 1,
      //       "avatar": null,
      //       "name": null,
      //       "lastname": null
      // }
      // }
      // ],
      // "files": [
      //   {
      //     "id": 1,
      //     "label": "doc",
      //     "extension": "xml",
      //     "size": 8543,
      //     'createdAt': '2022-02-10'
      //   }
      // ]
      // }
    }),
    created() {
      this.$core.execViaComponent('Tasks', 'get', this.$route.params.taskID);
    },
    computed: {
      ...mapGetters({
        task: 'Tasks/getTask',
      }),
      finishDate() {
        if (this.task.isTimeless) {
          return 'Без даты'
        }
        let month = ''
        const day = this.task.finish.substr(8, 2)
        const time = this.task.finish.slice(-8, -3)
        const dataMonth = this.task.finish.substr(5, 2)
        switch (dataMonth) {
          case '01':
            month = 'янв.'
            break;
          case '02':
            month = 'февр.'
            break;
          case '03':
            month = 'марта'
            break;
          case '04':
            month = 'апр.'
            break;
          case '05':
            month = 'мая'
            break;
          case '06':
            month = 'июня'
            break;
          case '07':
            month = 'июля'
            break;
          case '08':
            month = 'авг.'
            break;
          case '09':
            month = 'сент.'
            break;
          case '10':
            month = 'окт.'
            break;
          case '11':
            month = 'ноября'
            break;
          case '12':
            month = 'дек.'
            break;

          default:
        }

        return `${day} ${month}, ${time}`
      },
      statusSelected() {
        if(this.task.status === 'in_progress'){
          this.dropdownItems = [{status: 'hold', text: 'В отложенные'}, {status: 'done', text: 'В выполненные'}]
          return 'Текущие'
        }
        if(this.task.status === 'hold'){
          this.dropdownItems = [{status: 'in_progress', text: 'В Текущие'}, {status: 'done', text: 'В выполненные'}]
          return 'Отложено'
        }
        if(this.task.status === 'done'){
          this.dropdownItems = [{status: 'in_progress', text: 'В Текущие'}, {status: 'hold', text: 'В отложенные'}]
          return 'Выполнено'
        }
      },
    },
    methods: {
      ...mapMutations({
        showAppointSidebar: 'Tasks/showAppointSidebar',
        editChecklistStatus: 'Tasks/editChecklistStatus',
        changeTaskStatus: 'Tasks/changeTaskStatus'
      }),
      changeStatus(status) {
        this.statusDropdown = false
        this.changeTaskStatus(status)
        this.$core.execViaComponent('Tasks', 'changeStatus', {id: this.task.id, status: status})
      },
      sendComment(){
        if(this.comment) {
          const comment = {taskId: this.task.id, workerId: 50, userId: 50, content: this.comment}
          this.$core.execViaComponent('Tasks', 'addComment', comment)
          this.comment = ''
        }
      },
      deleteTask(){
        // this.statusDelete = false
        this.$core.execViaComponent('Tasks', 'delete', this.task.id)
        this.$router.push({name: 'vx.co.task'})
      },
      editChecklist(taskKey, itemKey){
        console.log(taskKey, itemKey, 'editChecklist')
        this.editChecklistStatus([taskKey, itemKey])
        this.$core.execViaComponent('Tasks', 'updateChecklist', taskKey)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .task-info-view{
    max-width: 1200px;
    .task-navigation-header{
      //height: 36px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-left-part{
        display: inherit;
        align-items: inherit;
        .header-date-border{
          height: 36px;
          width: 4px;
          margin-right: 8px;
          background-color: $blue;
          border-radius: 4px;
        }
        .icon-calendar{
          color: #fff;
          margin-right: 8px;
        }
        .task-finish-date{
          margin-right: 24px;
          color: #fff;
          font-size: 11px;
          line-height: 20px;
          font-weight: 600;
        }
        .task-dropdown-group{
          position: relative;
          .task-status-dropdown{
            width: 200px;
            margin-bottom: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            border-radius: 8px;
            background-color: $grey-scale-500;
            color: $gray-scale-100;
            box-sizing: border-box;
            cursor: pointer;
            .status-title{
              font-size: 11px;
              font-weight: 600;
              line-height: 20px;
            }
            .icon{
              height: 16px;
              //svg{
              //  width: 4px;
              //  height: 3px;
              //}
            }
          }
          .dropdown-action-list {
            position: absolute;
            .action-list-substrate{
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              position: fixed;
              z-index: 2;
            }
            .action-list-body{
              position: absolute;
              width: 200px;
              border-radius: 8px;
              overflow: hidden;
              box-sizing: border-box;
              background-color: $grey-scale-700;
              box-shadow: 0 0 65px 3px rgba(0, 0, 0, 0.5);
              z-index: 3;
              .action-item {
                color: #fff;
                padding: 12px;
                font-size: rem(15);
                line-height: rem(20);
                cursor: pointer;
                transition: .1s all ease;
                background-color: transparent;
                &.action-item-del{
                  color: $red;
                }
                &:hover {
                  background-color: $grey-scale-400;
                  &.action-item-del{
                    background-color: $grey-scale-500;
                  }
                }
              }
            }
          }
        }
      }
      .facade-modal-base{
        .facade-title-caps{
          padding: 8px 0;
          margin-bottom: 4px;
        }
        .task-name-box{
          padding: 12px 16px;
          background-color: $grey-scale-400;
          border-radius: 8px;

          .facade-title-sub{
            max-width: 288px;
          }
        }
      }
      .header-right-part{
        display: inherit;
        align-items: inherit;
        .nav-button{
          height: 36px;
          width: 36px;
          display: inherit;
          align-items: inherit;
          justify-content: center;
          border-radius: 8px;
          background-color: $grey-scale-500;
          cursor: pointer;

          &:first-child{
            margin-right: 8px;
          }

          .icon::v-deep {
            color: $grey-scale-200;
            svg{
              height: 10px;
              width: 10px;
            }
          }
        }
      }
    }
    .task-info-title{
      margin: 0 0 16px;
    }
    .task-description{
      margin-bottom: 36px;
      color: #fff;
    }
    .task-checklist-container{

    }
    .button-add-list{
      width: 188px;
      margin-bottom: 36px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px 10px 16px;
      //padding: 10px 12px;
      color: #fff;
      background-color: $grey-scale-500;
      border-radius: 8px;
      cursor: pointer;
      .icon{
        height: 16px;
        margin-right: 16px;
      }
      .facade-text-base{
        color: #fff;
      }
    }
    .task-files{
      margin-bottom: 24px;
    }
    .task-workers-group{
      display: flex;
      margin-bottom: 24px;

      .facade-navigation-list-header{
        margin-bottom: 4px;
      }

      .task-watchers{
        margin-right: 24px;
        width: 100%;

        .structure-unit-ui{
          margin-bottom: 8px;
        }
      }
      .task-executor{
        width: 100%;
      }
    }
    .facade-navigation-tabs::v-deep{
      .navigation-tabs-header{
        justify-content: flex-start;
        padding: 24px 0 20px;
      }
      .input-send-comment{
        padding: 24px;
        margin-bottom: 14px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-radius: 12px;
        background-color: $grey-scale-500;

        .facade-input-message{
          margin-right: 10px;
        }

        .comment-send-button{
          height: 36px;
          min-width: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          cursor: pointer;
          color: #fff;
          background-color: $blue;
          .icon{
            height: 18px;
            margin-left: 1px;
          }
          &[disable]{
            color: $grey-scale-300;
            background-color: $grey-scale-400;
          }
        }
      }

      .task-comments-plate{

      }
    }
  }
</style>