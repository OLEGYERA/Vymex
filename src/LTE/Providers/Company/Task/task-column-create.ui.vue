<template>
  <div class="company-task-column-create-ui">
    <div class="task-column-create-button" v-if="!actionStatus" @click="actionStatus = true">
      <icon-add/>
      <text-base>Создать колонку</text-base>
    </div>
    <div class="task-column-create-action" v-if="actionStatus">

    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'

  export default {
    name: 'Providers.Company.Task.TaskColumnCreate.Ui',
    props: {

    },
    components: {
      TextBase
    },
    data: () => ({
      actionStatus: false
    }),
    methods: {
      // activate
    }
  }
</script>

<style lang="scss" scoped>
  .company-task-column-create-ui{
    width: 260px;
    flex-shrink: 0;
    .task-column-create-button{
      width: 100%;
      border-radius: 8px;
      background-color: $grey-scale-500;
      display: flex;
      align-items: center;
      padding: 10px 12px;
      box-sizing: border-box;
      cursor: pointer;
      .icon-add{
        height: 16px;
        color: #fff;
        margin-right: 8px;
      }
      .facade-text-base{
        color: #fff;
      }
    }

  }
</style>