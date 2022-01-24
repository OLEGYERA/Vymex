<template>
  <div class="container-vx-messages">
    <div class="day-block">
      <div class="date-box">
        <title-caps>
          сегодня, 16 янв.
          <span class="messages-count">4</span>
        </title-caps>
        <button-close/>
      </div>
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
      <div class="date-box">
        <title-caps>
          15 янв.
          <span class="messages-count">4</span>
        </title-caps>
        <button-close/>
      </div>
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
  import ButtonClose from '@Facade/Button/Close'
  import Notify from '@Container/Vx/Notify'
  import TitleCaps from '@Facade/Title/Caps'

  export default {
    name: 'Container.Vx.Notifications',
    components: {
      ButtonClose,
      Notify,
      TitleCaps
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
            time: "05:45"
          },
          auth: {
            title: "Авторизация",
            time: "05:45"
          },
          entrance: {
            title: "Вход после таймаута",
            time: "05:45"
          },
          number: {
            title: "Изменение тел. номера",
            time: "05:45"
          },
          password: {
            title: "Изменение пароля",
            time: "05:45"
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
  .container-vx-messages {
    .day-block {
      margin-bottom: 24px;
      .date-box {
        padding: 4px 0;
        margin-bottom: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .messages-count {
          color: $blue;
        }
        .facade-button-close {
          height: 24px;
          width: 24px;
          margin-right: 4px;
          background-color: $grey-scale-400;
        }
      }
    }
  }
</style>