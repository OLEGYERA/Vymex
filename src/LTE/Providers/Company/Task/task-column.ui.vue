<template>
  <div class="company-task-column-ui">
    <header class="task-column-header">
      <text-base class="column-title">{{title}}</text-base>
      <div class="task-column-setting-space">
        <icon-points-vertical/>
      </div>
    </header>
    <section class="task-column-section">
      <slot>
        <div class="task-column-stub">
          <stub-double icon="company-task-empty.png" title="Задач нет"/>
        </div>
      </slot>
    </section>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import StubDouble from '@Facade/Stub/Double'

  export default {
    name: 'Providers.Company.Task.TaskColumn.Ui',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    components: {
      TextBase,
      StubDouble
    }
  }
</script>

<style lang="scss" scoped>
  .company-task-column-ui{
    width: 260px;
    margin-right: 8px;
    flex-shrink: 0;

    .task-column-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding: 10px 12px;
      background-color: $grey-scale-500;
      border-radius: 8px;
      .column-title{
        color: #fff;
      }

      .task-column-setting-space{
        .icon-points-vertical{
          height: 16px;
          color: #fff;
        }
      }
    }
    .task-column-section{
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      background-color: $grey-scale-500;
      padding: 8px;
      .task-column-stub{
        height: 164px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        .facade-stub-double{
          ::v-deep .facade-title-semi{
            color: $grey-scale-300;
            font-size: rem(17);
            line-height: rem(22);
          }
        }
      }
    }
  }
</style>