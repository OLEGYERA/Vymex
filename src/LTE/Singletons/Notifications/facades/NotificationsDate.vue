<template>
  <div class="facade-date-box">
    <title-caps>
      {{date}}
      <span class="notifications-count" v-if="!!length">
        {{length}}
      </span>
    </title-caps>

    <button-close @onClick="$emit('onClick', {key: created})"/>
  </div>
</template>

<script>
  import ButtonClose from "@Facade/Button/Close";
  import TitleCaps from "@Facade/Title/Caps";

  export default {
    name: 'Singleton.Notifications.Notifications',
    components: {
      ButtonClose,
      TitleCaps,
    },
    data() {
      return {
      }
    },
    props: {
      created:{
        type: String,
        required: true
      },
      length: Number
    },
    computed: {
      date() {
        let month = ''
        const dataMonth = this.created.substr(5, 2)
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
        const dataDay = this.created.slice(-2)
        const day = dataDay.slice(0, 1) === '0' ? dataDay.slice(-1) : dataDay

        if (`${new Date().getFullYear()}-${(String(new Date().getMonth() + 1)).length === 1 ? '0' : ''}${new Date().getMonth() + 1}-${new Date().getDate()}` === this.created) {
          return `сегодня, ${day} ${month}`
        }

        return `${day} ${month}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-date-box {
    position: relative;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .notifications-count {
      color: $blue;
    }
    .facade-button-close {
      height: 24px;
      width: 24px;
      margin-right: 4px;
      background-color: $grey-scale-400;
    }
  }
</style>