<template>
  <div class="company-task-ui">
    <header class="company-task-header">
      <div class="task-expiration-space" :class="{expired: termStage === 0, soon: termStage === 1}">
        <icon-calendar-error v-if="termStage === 0"/>
        <icon-calendar v-if="termStage !== 0"/>
         17 янв., 14:30
      </div>
      <div class="task-setting-space">
        <icon-points-horizontal/>
      </div>
    </header>
    <main class="company-task-main">
      <title-caption>{{title}}</title-caption>
    </main>
    <footer class="company-task-footer">
      <div class="task-indicator attached-files"><icon-attach/> <div class="task-indicator-value">3</div></div>
      <div class="task-indicator sub-tasks" ><icon-checkbox/><div class="task-indicator-value">2/5</div></div>
      <div class="task-indicator comments"><icon-comments/><div class="task-indicator-value">1</div></div>
    </footer>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleCaption from '@Facade/Title/Caption'


  export default {
    name: 'Providers.Company.Task.Task.Ui',
    components: {
      TitleCaption
    },
    props: {
      title: {
        type: String,
        required: true
      },
      termStage: {
        type: Number,
      },
    },

  }
</script>

<style lang="scss" scoped>
  .company-task-ui{
    width: 100%;
    border-radius: 8px;
    padding: 12px;
    background-color: $grey-scale-400;
    box-sizing: border-box;
    .company-task-header{
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-bottom: 10px;
      .task-expiration-space{
        display: inline-flex;
        padding: 3px 10px;
        color: #fff;
        font-weight: 600;
        font-size: rem(11);
        line-height: rem(16);
        border-radius: 14px;
        background-color: $grey-scale-200;
        .icon{
          height: 10px;
          margin-right: 8.5px;
          ::v-deep svg{
            width: 10px;
            height: 10px;
          }
        }

        &.expired{
          background-color: $red;
        }
        &.soon{
          background-color: $secondary-yellow;
          color: $grey-scale-400;
        }
      }
      .task-setting-space{
        color: #fff;
      }
    }
    .company-task-main{
      .facade-title-caption{
        color: #fff;
      }
      margin-bottom: 16px;
    }
    .company-task-footer{
      display: flex;
      .task-indicator{
        display: flex;
        align-items: center;
        margin-right: 16px;
        .icon{
          color: $grey-scale-200;
          margin-right: 5px;
          ::v-deep svg{
            width: 10px;
            height: 10px;
          }
        }
        .task-indicator-value{
          font-size: rem(11);
          line-height: rem(16);
          color: $grey-scale-200;
        }
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
</style>
