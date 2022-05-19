<template>
  <div class="company-task-checklist-ui">
    <div class="task-checklist-title">
      <title-caps>
        {{checkList.title}}
        <span class="list-title-counter">{{counter}}/{{checkList.items.length}}</span>
      </title-caps>
      <icon-edit/>
    </div>

    <div class="checklist-item" v-for="(item, itemKey) in checkList.items" :key="itemKey">
      <input-checkbox :model="!!item.status" @onClick="editChecklist(itemKey)"/>
      <text-base :class="{'item-done': !!item.status}">{{item.text}}</text-base>
    </div>
  </div>
</template>

<script>
  import TextBase from "@Facade/Text/Base";
  import InputCheckbox from '@Facade/Input/Checkbox'
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Providers.Company.Task.TaskChecklist.Ui',
    components: {TextBase, InputCheckbox, TitleCaps},
    props: {
      checkList: {
        type: Object,
        required: true
      },
      checklistKey: Number,
    },
    computed: {
      counter(){
        return this.checkList.items.filter(item => !!item.status).length
      }
    },
    methods: {
      editChecklist(itemKey){
        this.$emit('editChecklist', this.checklistKey, itemKey)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .company-task-checklist-ui{
    margin-bottom: 24px;

    .task-checklist-title {
      height: 36px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      .list-title-counter {
        margin-right: 8px;
        color: $blue;
      }
      .icon{
        color: $blue;
        height: 16px;
        cursor: pointer;
      }
    }
    .checklist-item{
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .item-done{
        text-decoration: line-through;
      }

      .facade-input-checkbox{
        margin-right: 12px;
      }
      .facade-text-base{
        color: #fff;
      }
    }
  }
</style>