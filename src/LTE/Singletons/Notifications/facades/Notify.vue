<template>
  <div class="facade-notify" :class="{read: notification.read}">
    <div class="notify-header">
      <div class="notify-left-part">
        <div class="notify-icon"
             :class="{
                'icon-info-red' : info[notification.type].class === 'red',
                'icon-info-blue' : info[notification.type].class === 'blue',
                'icon-info-green' : info[notification.type].class === 'green'
               }">
          <img :src="info[notification.type].icon"/>
        </div>
        <div class="notify-text-group">
          <title-sub>{{ title }}</title-sub>
          <div class="notify-name">{{ notification.addressedTo }}</div>
        </div>
      </div>

      <div class="notify-right-part" @mouseover="deleteNotify = true" @mouseleave="deleteNotify = false">
        <button-close v-if="deleteNotify" @onClick="deleteNotification"/>
        <title-caption v-else>
          {{ notification.createdAt.slice(-8, -3) }}
        </title-caption>
      </div>
    </div>
    <div class="notify-main">
      <text-base v-html="info[notification.type].text"/>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import TitleSub from '@Facade/Title/Sub'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import ButtonClose from "@Facade/Button/Close";

  export default {
    name: 'Singleton.Facades.Notify',
    components: {
      TitleSub,
      TitleCaption,
      TextBase,
      ButtonClose
    },
    data(){
      return{
        info: {
          loginError: {
            text: `Неудачная попытка входа с [${this.notification.message.deviceTitle}, ${this.notification.message.ip}], если это были не вы - смените пароль`,
            icon:  require('@/assets/img/my/info.svg'),
            class: 'red'
          },
          newLogin: {
            text: `Вы зашли с нового устройства [${this.notification.message.deviceTitle}, ${this.notification.message.ip}], если это были не вы - завершите этот сеанс`,
            icon:  require('@/assets/img/my/info.svg'),
            class: 'blue'
          },
          phoneUpdated: {
            text: 'Номер успешно изменен! Вы можете отменить изменение в течении 7-ми дней',
            icon:  require('@/assets/img/my/info.svg'),
            class: 'green'
          },
          phoneChangingError: {
            text: `Неудачная попытка ввода кода подтверждения [${this.notification.message.deviceTitle}, ${this.notification.message.ip}], если это были не вы - смените пароль`,
            icon:  require('@/assets/img/my/info.svg'),
            class: 'red'
          },
          updatePasswordSuccess: {
            text: `Пароль был изменнен с [${this.notification.message.deviceTitle}, ${this.notification.message.ip}]!`,
            icon:  require('@/assets/img/my/info.svg'),
            class: 'green'
          },
          registrationOpened: {
            text: `Регистрация для компании [<span class="text-name">${this.notification.message.model.name}</span>] открыта! Регистрация компании доступна в течении 7-ми дней с момента получения оповещения. В противном случае вы потеряете свое место в очереди.`,
            icon:  require('@/assets/img/my/info.svg'),
            class: 'green'
          },
          registrationRejected: {
            text: `Вы 7 дней не регистрировали [<span class="text-name">${this.notification.message.model.name}</span>], поэтому ваша компания переместилась в конец очереди. Мы уведомим вас об открытии регистрации.`,
            icon:  require('@/assets/img/my/info.svg'),
            class: 'red'
          },
          resourceAssigned: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] предоставил вам в работу [${this.notification.message.resource.name}].`,
            icon:  require('@/assets/img/my/resource.svg'),
            class: null,
          },
          folderShared: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] предоставил доступ на [${this.notification.message.resource.name}].`,
            icon:  require('@/assets/img/my/resource.svg'),
            class: null,
          },
          fileShared: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] предоставил доступ на [${this.notification.message.resource.name}].`,
            icon:  require('@/assets/img/my/resource.svg'),
            class: null,
          },
          processCreated: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] cоздал для вас новый процесс [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/process.svg'),
            class: null,
          },
          processEdited: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] обновил процесс [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/process.svg'),
            class: null,
          },
          processAdded: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] добавил для вас процесс [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/process.svg'),
            class: null,
          },
          resourceAssignedFromWarehouse: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] предоставил вам в работу [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/storage.svg'),
            class: null,
          },
          resourceRequestApproved: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] принял ваш запрос на использование [${this.notification.message.resource.name}].`,
            icon:  require('@/assets/img/my/storage.svg'),
            class: null,
          },
          resourceRequestDenied: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] отклонил ваш запрос на использование [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/storage.svg'),
            class: null,
          },
          newResourceRequest: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] отправил вам запрос на использование [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/storage.svg'),
            class: null,
          },
          inviteDeclined: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] отклонил оффер на позицию [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/structure.svg'),
            class: null,
          },
          inviteAccepted: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] принял оффер на позицию [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/structure.svg'),
            class: null,
          },
          newInvite: {
            text: `Компания [<span class="text-name">${this.notification.message.model.name}</span>] отправила вам оффер на позицию [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/structure.svg'),
            class: null,
          },
          deleteFromUnit: {
            text: `Компания [<span class="text-name">${this.notification.message.model.name}</span>] уволила вас с позиции [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/structure.svg'),
            class: null,
          },
          taskCreated: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] назначил вас ответственным [${this.notification.message.resource.name}].`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskDone: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] завершил задачу [${this.notification.message.resource.name}], за которую вы ответственны.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskEditedWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] обновил задачу [${this.notification.message.resource.name}], за которой вы следите.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskCommentedWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] оставил комментарий к задаче [${this.notification.message.resource.name}], за которой вы следите.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskEdited: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] обновил задачу [${this.notification.message.resource.name}], за которую вы ответственны.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskRestored: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] восстановил задачу [${this.notification.message.resource.name}], за которую вы ответственны.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskDeletedWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] удалил задачу [${this.notification.message.resource.name}], за которой вы следите.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskDoneWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] завершил задачу [${this.notification.message.resource.name}], за которой вы следите.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskHold: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] отложил задачу [${this.notification.message.resource.name}], за которую вы ответственны.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskDeleted: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] удалил задачу [${this.notification.message.resource.name}], за которую вы ответственны.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskCommented: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] оставил комментарий к задаче [${this.notification.message.resource.name}], за которую вы ответственны.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskHoldWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] отложил задачу [${this.notification.message.resource.name}], за которой вы следите.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskSetWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] назначил вас наблюдателем [${this.notification.message.resource.name}]`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
          taskRestoredWatchers: {
            text: `[<span class="text-name">${this.notification.message.model.name}</span>] восстановил задачу [${this.notification.message.resource.name}], за которой вы следите.`,
            icon: require('@/assets/img/my/task.svg'),
            class: null,
          },
        },
        deleteNotify: false
      }
    },
    props: {
      notification: {
        type: Object,
        required: true
      }
    },
    computed: {
      title(){
        switch (this.notification.type){
          case 'loginError':
          case 'newLogin':
            return 'Авторизация';

          case 'phoneUpdated':
          case 'phoneChangingError':
          case 'updatePasswordSuccess':
          case 'registrationOpened':
          case 'registrationRejected':
            return 'Профиль';

          case 'resourceAssigned':
          case 'folderShared':
          case 'fileShared':
            return 'Ресурсы';

          case 'processCreated':
          case 'processEdited':
          case 'processAdded':
            return 'Процессы';

          // case 'taskCreated':
          // case 'taskDone':
          // case 'taskEditedWatchers':
          // case 'taskEditedWatchers':
          //   return 'Задачи';
          case 'resourceAssignedFromWarehouse':
          case 'resourceRequestApproved':
          case 'resourceRequestDenied':
          case 'newResourceRequest':
            return 'Склад Ресурсов';

          case 'newInvite':
          case 'deleteFromUnit':
          case 'inviteDeclined':
          case 'inviteAccepted':
            return 'Структура';

          // case 'registrationOpened':
          // case 'registrationRejected':
          //   return 'Профиль';

          default:
            return 'Задачи';
        }
      }
    },
    methods: {
      deleteNotification() {
        this.$core.execViaComponent('Notifications', 'deleteNotification', this.notification.id)
      }
    }
  } 
</script>

<style lang="scss" scoped>
  .facade-notify{
    margin-bottom: 12px;
    .notify-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      background-color: rgba($grey-scale-300, .7);
      color: #fff;
      //opacity: .7;
      border-radius: 12px 12px 0 0;
      .notify-left-part {
        display: inherit;
        align-items: inherit;
        .notify-icon {
          margin-right: 8px;
          height: 28px;
          width: 28px;
          display: inherit;
          align-items: inherit;
          justify-content: center;
        }
        .icon-info-green {
          border-radius: 8px;
          background-color: $green;
        }
        .icon-info-red {
          border-radius: 8px;
          background-color: $red;
        }
        .icon-info-blue{
          border-radius: 8px;
          background-color: $blue;
        }
        .notify-text-group{
          .facade-title-sub {
            margin-bottom: 2px;
          }
          .notify-name {
            font-weight: 500;
            font-size: 13px;
            line-height: 13px;
            color: $grey-scale-200;
          }
        }

      }
      .notify-right-part{
        width: 46px;
        display: inherit;
        justify-content: flex-end;
        .facade-title-caption{
          margin-right: 12px;
          color: #fff;
        }
        .facade-button-close {
          height: 24px;
          width: 24px;
          margin-right: 2px;
          margin-top: -8px;
          background-color: $grey-scale-400;
        }
      }

    }
    .notify-main {
      padding: 16px;
      background-color: $grey-scale-400;
      border-radius: 0 0 12px 12px;
      .facade-text-base::v-deep{
        color: #fff;
        .text-name{
          color: $blue;
          font-weight: 600;
        }
      }
    }
  }
  .read{
    .notify-header{
      background-color: $grey-scale-400;
    }
    .notify-main{
      background-color: $grey-scale-500;

      .facade-text-base::v-deep{
        color: $grey-scale-200;
        .text-name{
          color: $grey-scale-200;
        }
      }
    }
  }
</style>