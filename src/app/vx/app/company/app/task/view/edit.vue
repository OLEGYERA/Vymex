<template>
  <div class="task-edit-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})"/>
    <title-base class="task-edit-title">Редактировать задачу</title-base>

    <div class="task-edit-space">
      <input-base placeholder="Название задачи" labeled :model="task.title" @onInput="setTaskInfo(['title', $event])"/>
      <input-text-area :model="task.description" :max-length="1000" placeholder="Описание" labeled count  @onInput="setTaskInfo(['description', $event])"/>

      <title-caps class="task-title-time">Время выполнения</title-caps>

      <div class="date-range-box">
        <input-date :model="task.start" @onDate="setTaskInfo(['start', $event])" placeholder="Начало" :disable="task.isTimeless"/>
        <input-date :model="task.finish" @onDate="setTaskInfo(['finish', $event])" placeholder="Конец" :disable="task.isTimeless"/>
      </div>
      <div class="perpetual-task">
        <input-checkbox :model="!!task.isTimeless" @click.native="togglePerpetual"/>
        <text-base @click.native="togglePerpetual">Бессрочная задача</text-base>
      </div>

      <div class="task-checklist-container">
        <task-checklist v-for="(checklist, checklistKey) in task.checklists" :key="checklistKey" :checklist-key="checklistKey" :check-list="checklist" @editChecklist="editChecklist"/>
        <task-checklist v-for="(checklist, checklistKey) in checkList" :key="checklistKey" :checklist-key="checklistKey" :check-list="checklist" @editChecklist="editNewChecklist"/>
      </div>

      <navigation-list-header class="task-list-title" title="Список" @onAction="statusTaskList = true"/>

      <modal-base :status="statusTaskList"
                  @onClose="statusTaskList = false"
                  class="modal-task-list"
                  :button-disable="!title || !(listItems.length || newItemText)"
                  @onOk="addTaskList">
        <template #title>
          Список задач
        </template>
        <template #description>
          Создайте список, который будет прикреплен к задаче
        </template>
        <template #content>
          <div class="modal-content-title">
            <title-caps>Список</title-caps>
            <icon-trash @click.native="statusDeleteList = true"/>
          </div>
          <input-base :model="title" @onInput="title = $event" labeled placeholder="Название списка"/>

          <div class="list-container" v-if="listContainerStatus">
            <div class="list-item" v-for="(item, itemKey) in listItems" :key="itemKey">
              <text-base>{{item.text}}</text-base>
              <icon-error @click.native="listItems.splice(itemKey, 1)"/>
            </div>

            <div class="input-add-list">
              <input-base :model="newItemText" @onInput="newItemText = $event"/>
              <icon-error @click.native="newItemText = ''"/>
            </div>
          </div>

          <div class="add-item" @click="addItem">
            <button-add/>
            <text-base>Добавить пункт</text-base>
          </div>
        </template>
        <template #button-accept>
          Сохранить
        </template>
      </modal-base>

      <modal-base :status="statusDeleteList"
                  @onClose="statusDeleteList = false"
                  class="modal-delete-list"
                  @onOk="deleteAllList">
        <template #title>
          Удалить список?
        </template>
        <template #description>
          Это действие необратимо
        </template>
        <template #button-accept>
          Удалить
        </template>
      </modal-base>

      <navigation-list-header title="файлы"/>
      <div class="content-container">
        <file-ui v-for="(file, key) in task.files" :file="file" :key="key"/>
      </div>

      <navigation-list-header title="Исполнители" @onAction="showAppointSidebar()" :add="!task.assigneeId"/>
      <div class="content-container">
        <unit-setting-ui :unit-data="task.assignee" :unit-level="task.assignee.unitLevel" :unit-position="task.assignee.unitName"/>
      </div>

      <navigation-list-header title="Следят" @onAction="showAddSidebar()"/>
      <div class="content-container">
        <unit-setting-ui v-for="(watcher, watcherKey) in task.watchers" :key="watcherKey" :unit-data="watcher" :unit-level="watcher.unitLevel" :unit-position="watcher.unitName"/>
      </div>
    </div>

    <div class="edit-buttons-group">
      <button-secondary @onClick="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})">
        Отмена
      </button-secondary>
      <button-base @onClick="saveEditTask">Сохранить</button-base>
    </div>

    <sidebar-appoint-executor-ui :structure="structure"
                                 :status="sidebarAppointStatus"
                                 :chosen-units="chosenUnitsAppoint"
                                 @chooseUser="chooseUser"
                                 @setUser="setUser"/>

    <sidebar-add-observer :status="sidebarAddStatus"
                          :structure="structure"
                          :chosen-units="task.watchers"
                          @selectAllLevel="selectAllLevel"
                          @deleteAllLevel="deleteLevel"
                          @chooseUser="addWatchers"
                          @setUser="setObservers"/>
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
  import {UnitUi, UnitSettingUi, UnitCheckboxUi, SidebarAppointExecutorUi, SidebarAddObserver, TaskChecklist, FileUi} from '@Providers'
  import NavigationListHeader from '@Facade/Navigation/ListHeader'
  import {mapGetters, mapMutations} from "vuex";
  import ModalBase from "@Facade/Modal/Base"
  import ButtonBase from '@Facade/Button/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'
  import ButtonAdd from '@Facade/Button/Add'

  export default {
    name: 'vx.co.task.edit.view',
    components: {
      NavigationComeback, TitleBase, InputBase, InputTextArea, TitleCaps, InputDate, InputCheckbox, TextBase,
      UnitUi, UnitSettingUi, UnitCheckboxUi, ButtonBase, ButtonSecondary, TaskChecklist, FileUi,
      NavigationListHeader, SidebarAppointExecutorUi, ModalBase, ButtonAdd, SidebarAddObserver
    },
    data: () => ({
      currentNavigationCoTab: 0,
      chosenUnitsAppoint: [],
      chosenUnitsAdd: [],
      unitCheckboxModel: false,
      statusTaskList: false,
      statusDeleteList: false,
      listContainerStatus: false,
      modalDownload: false,
      title: '',
      listItems: [],
      newItemText: '',
    }),
    mounted() {
      this.$core.execViaComponent('Tasks', 'getStructure', this.$route.params.companyID);
    },
    computed: {
      ...mapGetters({
        sidebarAppointStatus: 'Tasks/sidebarAppointStatus',
        sidebarAddStatus: 'Tasks/sidebarAddStatus',
        task: 'Tasks/getTask',
        structure: 'Tasks/getStructure',
        selectedUser: 'Tasks/getSelectedUser',
        checkList: 'Tasks/getChecklist',
        watchers: 'Tasks/selectedWatchers',

      }),
    },
    methods: {
      ...mapMutations({
        showAppointSidebar: 'Tasks/showAppointSidebar',
        setTaskInfo: 'Tasks/setTaskInfo',
        findExecutor: 'Tasks/findExecutor',
        cleanTask: 'Tasks/cleanTask',
        addTaskChecklist: 'Tasks/addTaskChecklist',
        changeStatus: 'Tasks/changeStatus',
        showAddSidebar: 'Tasks/showAddSidebar',
        findWatchers: 'Tasks/findWatchers',
        checkAllLevel: 'Tasks/checkAllLevel',
        deleteAllLevel: 'Tasks/deleteAllLevel',
        addObservers: 'Tasks/addObservers',
        addFile: 'Tasks/addFile',
        editChecklistStatus: 'Tasks/editChecklistStatus',
      }),
      togglePerpetual(){
        if(!!this.task.isTimeless === false) {
          this.setTaskInfo(['isTimeless', true])
          this.setTaskInfo(['start', ''])
          this.setTaskInfo(['finish', ''])
        } else {
          this.setTaskInfo(['isTimeless', false])
        }
      },
      chooseUser(id){
        if (this.chosenUnitsAppoint[0] === id) {
          this.chosenUnitsAppoint = []
        } else {
          this.chosenUnitsAppoint = [id]
        }
      },
      editNewChecklist(taskKey, itemKey) {
        this.changeStatus([taskKey, itemKey])
      },
      editChecklist(taskKey, itemKey){
        console.log(taskKey, itemKey, 'editChecklist')
        this.editChecklistStatus([taskKey, itemKey])
        this.$core.execViaComponent('Tasks', 'updateChecklist', taskKey)
      },
      setUser() {
        this.setTaskInfo(['assigneeId', this.chosenUnitsAppoint[0]])
        this.findExecutor()
      },
      addTaskList(){
        if(this.newItemText) {
          this.listItems.push({text: this.newItemText, status: false})
        }
        this.addTaskChecklist({title: this.title, items: this.listItems})
        console.log(this.checkList, 'this.checkList')
        this.statusTaskList = false
        this.title = ''
        this.newItemText = ''
        this.listItems = []
        // this.$core.execViaComponent('Tasks', 'createChecklist', [this.newTask.taskId, this.title, this.listItems]);

      },
      addItem(){
        if(this.listContainerStatus === false) {
          this.listContainerStatus = true
        } else if (this.newItemText) {
          this.listItems.push({text: this.newItemText, status: false})
          this.newItemText = ''
        }
      },
      deleteAllList(){
        this.statusDeleteList = false
        this.listItems = []
        this.newItemText = ''
      },
      addWatchers(id) {
        this.addObservers(id)
      },
      setObservers(){
        this.findWatchers()
      },
      selectAllLevel(key) {
        this.checkAllLevel(key)
      },
      deleteLevel(key) {
        this.deleteAllLevel(key)
      },
      saveEditTask() {
        this.checkList.map(list => {
          this.$core.execViaComponent('Tasks', 'createChecklist', {list: list, id: this.task.id});

        })
        this.$core.execViaComponent('Tasks', 'edit');
        this.$router.push({name: 'vx.co.task', params: {companyID: this.$route.params.companyID}})
      },
      onChange() {
        this.$core.execViaComponent('Uploader', 'init',[
          this.$refs.uploadedFile4Test.files[0],
          this.handleUploadOnprogress, null,
          this.handleUploaderOnload
        ])
      },
      handleUploadOnprogress(progress){
        console.log(progress, 'handleUploadOnprogress')
      },
      handleUploaderOnload(fileId){
        console.log(fileId, 'handleUploaderOnload')
        this.addFile(fileId)
        // this.setCreator(['logo', fileId])
        // this.avatarReady = true;
      },
    },
    destroyed() {
      this.cleanTask()
    }
  }
</script>

<style lang="scss" scoped>
  .task-edit-view{
    max-width: 1200px;
    .task-edit-title{
      text-align: center;
      margin: 0 0 36px;
    }
    .task-edit-space{
      width: 100%;
      padding: 48px 164px 52px;
      margin-bottom: 36px;
      box-sizing: border-box;
      border-radius: 16px;
      background-color: $grey-scale-500;
      .facade-input-base, .facade-input-text-area::v-deep{
        margin-bottom: 16px;
        border-width: 1px;
        .textarea-container{
          border-width: 1px;
        }
      }
      .task-title-time{
        margin-bottom: 16px;
      }
      .date-range-box{
        display: flex;
        justify-content: space-between;
        margin: 16px 0;
        .facade-input-date::v-deep{
          width: 47%;
          .facade-input-base{
            border-width: 1px;
          }
        }
      }
      .perpetual-task{
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 32px;
        .facade-text-base{
          padding-left: 12px;
          color: #fff;
        }
      }
      .facade-navigation-list-header{
        margin-bottom: 4px;
      }
      .content-container{
        margin-bottom: 24px;
      }

      .task-list-title{
        margin-bottom: 24px;
      }
    }
    .task-checklist-container{
      margin-bottom: 24px;
      .company-task-checklist-ui::v-deep{
        .task-checklist-title{
          justify-content: space-between;
        }
      }
    }

    .structure-unit-ui{
      margin-bottom: 8px;
    }
    .edit-buttons-group{
      display: flex;
      justify-content: space-between;
      .facade-button-secondary{
        width: 222px;
      }
      .facade-button-base{
        width: 222px;
      }
    }
    .modal-task-list{
      .modal-content-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        margin-bottom: 12px;

        .icon-trash{
          cursor: pointer;
        }
      }

      .facade-input-base::v-deep{
        margin-bottom: 12px;
        &:focus-within{
          .input-label{
            color: $blue;
          }
        }
      }

      .facade-text-base{
        color: #fff;
      }

      .list-container{
        margin-top: 46px;

        .icon{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 24px;
          width: 24px;
          border: 2px solid $grey-scale-300;
          border-radius: 8px;
          color: $grey-scale-200;
          box-sizing: border-box;
          cursor: pointer;
        }
        .list-item{
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .input-add-list{
          position: relative;
          .facade-input-base{
            height: 36px;
          }
          .icon-error{
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }

      .add-item{
        display: flex;
        align-items: center;
        cursor: pointer;

        .facade-button-add{
          margin-right: 12px;
        }
      }
    }

    .modal-download ::v-deep{
      .modal-base-content{
        position: relative;
        .facade-title-caps{
          padding: 8px 0;
          margin-bottom: 8px;
        }
        .file{
          box-sizing: border-box;
          height: 52px;
          width: 100%;
          opacity: 0;
          position: absolute;
          cursor: pointer;
        }
        .download-plate{
          display: flex;
          align-items: center;
          padding: rem(8);
          margin-bottom: rem(12);
          border-radius: 8px;
          background-color: $grey-scale-400;
          .facade-text-base {
            color: #fff;
          }
          .button-add{
            display: inherit;
            height: 36px;
            width: 36px;
            border-radius: 50%;
            border: 2px solid $grey-scale-300;
            align-items: inherit;
            justify-content: center;
            box-sizing: border-box;
            margin-right: 12px;
            .icon-add{
              color: #fff;
              svg{
                height: 12px;
                width: 14px;
              }
            }
          }
        }
      }
    }
  }
</style>