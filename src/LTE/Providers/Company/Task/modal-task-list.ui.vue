<template>
  <div class="company-modal-task-list-ui">
    <modal-base :status="modalTaskListStatus" @onClose="modalTaskListStatus=false" @onOk="modalTaskListStatus=true">
      <template #title>Список задач</template>
      <template #description>Создайте список который будет прикреплен к задаче</template>
      <template #content>
        <div class="task-list-box">
          <title-caps>Список</title-caps>
          <input-base model="" placeholder="Название списка" labeled/>
        </div>
        <div class="sub-task-list-box" v-if="subTasks.length !== 0">
          <template v-for="(subTask, subTaskKey) in subTasks">
            <sub-task-input :key="subTaskKey" :ref="`sub-task-input-ref-${subTaskKey}`"
                            :model="subTask.model" @onInput="subTask.model = $event"/>
          </template>

        </div>
        <div class="add-sub-task-row">
          <div class="add-sub-task-input" @click="addNewSubTask" :disable="!canAddNewTask">
            <button-add/>
            <text-base>Добавить пункт</text-base>
          </div>
        </div>
      </template>
    </modal-base>
  </div>
</template>

<script>
  /*eslint-disable*/
  import ModalBase from '@Facade/Modal/Base'
  import TitleCaps from '@Facade/Title/Caps'
  import InputBase from '@Facade/Input/Base'
  import ButtonAdd from '@Facade/Button/Add'
  import TextBase from '@Facade/Text/Base'
  import SubTaskInput from './sub-task-input.facade'


  export default {
    name: 'Providers.Company.Task.ModalTaskList.Ui',
    components: {
      ModalBase, TitleCaps, InputBase, ButtonAdd, TextBase,
      SubTaskInput
    },
    props: {
      // model: {
      //   validator: function (value) {
      //     return value === null || typeof value === "string" || typeof value === "number";
      //   }
      // },
    },
    data: () => ({
      modalTaskListStatus: true,
      subTasks: []
    }),
    computed: {
      canAddNewTask(){
        return this.subTasks.length === 0 || this.subTasks[this.subTasks.length - 1].model.length !== 0
      }
    },
    methods: {

      addNewSubTask(){
        if(this.canAddNewTask) {
          this.subTasks.push({model: ''});
          setTimeout(() =>
              this.$refs[`sub-task-input-ref-${this.subTasks.length - 1}`][0].$refs['sub-task-input-ref'].$refs['facade-input-base-ref'].focus(),
            100)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .company-modal-task-list-ui{
    .task-list-box{
      .facade-title-caps{
        margin: 8px 0 12px;
      }
    }
    .sub-task-list-box{


    }
    .add-sub-task-row{
      margin: 14px 0 10px;
      .add-sub-task-input{
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        .facade-button-add{
          margin-right: 12px;
        }
        &:hover{
          .facade-button-add{
            ::v-deep{
              .icon{
                transition: .1s all ease;
                color: $blue;
              }
            }
          }
          .facade-text-base{
            transition: .1s all ease;
            color: $blue;
          }
        }
        &[disable]{
          cursor: default;
          .facade-button-add{
            cursor: default;
            ::v-deep{
              .icon{
                color: $grey-scale-200;
              }
            }
          }
          .facade-text-base{
            color: $grey-scale-200;
          }
        }
      }

    }

  }
</style>
