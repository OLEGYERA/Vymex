<template>
  <div class="notifications-main-view">
    <div class="day-block">
      <notifications-date></notifications-date>
      <notify :info="cats.entrance" :link="link" :reject="reject">
        <template v-slot:text>
          Неудачная попытка возобновления сеанса с [имя устройста, модель устройства, ОС, IP], если это были не вы — завершите этот сеанс
        </template>
      </notify>
      <notify :info="cats.task">
        <template v-slot:text>
          [Имя_пользователя] назначил вас ответственным [название_задачи]
        </template>
      </notify>
      <notify :info="cats.process">
        <template v-slot:text>
          [Имя_пользователя] обновил процесс [название_процесса]
        </template>
      </notify>
      <notify :info="cats.auth" :link="link">
        <template v-slot:text>
          Код подтверждения ХХХХХХ. Никому не давайте код, даже если этого требуют от имени Vymex. Этот код используется для входа в ваш аккаунт, он никогда не нужен для чего-то еще.
            <br>
          Если вы не запрашивали код для входа, проигнорируйте это сообщение.
        </template>
      </notify>
    </div>
    <div class="day-block">
      <notifications-date></notifications-date>
        <notify :info="cats.structure" :response="response">
          <template #text>
            Компания [Название_компании] отправила вам оффер на позицию [название_се]
          </template>
        </notify>
        <notify :info="cats.storage">
          <template #text>
            Пароль был изменнен с [имя устройста, модель устройства, ОС, IP]!
          </template>
        </notify>
        <notify :info="cats.password" :success="success">
          <template #text>
            Пароль был изменнен с [имя устройста, модель устройства, ОС, IP]!
          </template>
        </notify>
        <notify :info="cats.structure">
          <template #text>
            Компания [Название_компании] отправила вам оффер на позицию [название_се]
          </template>
        </notify>
        <notify :info="cats.number" :reject="reject" link="link">
          <template #text>
            Неудачная попытка ввода кода подтверждения [имя устройста, модель устройства, ОС, IP], если это были не вы - смените пароль
          </template>
        </notify>
    </div>
  </div>
</template>

<script>
  import Notify from '@/LTE/Singletons/Notifications/facades/Notify'
  import NotificationsDate from "@/LTE/Singletons/Notifications/facades/NotificationsDate";

  export default {
    name: 'Singleton.Notifications.Notifications',
    components: {
      Notify,
      NotificationsDate
    },
    data() {
      return {
        cats: {
          resource: {
            title: "Ресурсы",
            icon: require('@/assets/img/my/resource.svg'),
            time: "05:45",
            manage: true
          },
          process: {
            title: "Процессы",
            icon: require('@/assets/img/my/process.svg'),
            time: "05:45",
            manage: true
          },
          task: {
            title: "Задачи",
            icon: require('@/assets/img/my/task.svg'),
            time: "05:45",
            manage: true
          },
          storage: {
            title: "Склад Ресурсов",
            icon: require('@/assets/img/my/storage.svg'),
            time: "05:45",
            manage: true
          },
          structure: {
            title: "Структура",
            icon: require('@/assets/img/my/structure.svg'),
            time: "05:45",
            manage: false
          },
          auth: {
            title: "Авторизация",
            time: "05:45",
            manage: false
          },
          entrance: {
            title: "Вход после таймаута",
            time: "05:45",
            manage: false
          },
          number: {
            title: "Изменение тел. номера",
            time: "05:45",
            manage: false
          },
          password: {
            title: "Изменение пароля",
            time: "05:45",
            manage: false
          }
        },
        response: true,
        link: "./",
        success: true,
        reject: true
      };
    }
  } 
</script>

<style lang="scss" scoped>
  .notifications-main-view {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: rem(24) rem(20);
    .day-block {
      margin-bottom: 24px;
      .facade-date-box {
        margin-bottom: 4px;
      }
    }
  }
</style>