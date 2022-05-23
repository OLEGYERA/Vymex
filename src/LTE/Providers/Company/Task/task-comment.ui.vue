<template>
  <div class="company-task-comment-ui">
    <div class="comment-header">
      <div class="user-avatar">
        <image-avatar :logo="$core.traits.ImageLogo(comment.user.avatar, 'bla', 'bla')" :color-code="$core.traits.ImageColorCode(comment.user.id)"/>
      </div>
      <div class="comment-info">
        <text-base class="user-name">{{comment.user.name || 'Lera'}} {{comment.user.lastname || 'P'}}</text-base>
        <div class="bottom-part">
          <div class="comment-create-date">{{commentDate}}</div>
          <div class="button-reply" @click="replyVisible = !replyVisible">
            {{replyVisible ? 'Отменить' : 'Ответить' }}
          </div>
        </div>
      </div>

    </div>
    <text-base class="comment-content">{{comment.content}}</text-base>

    <div class="input-send-reply" v-if="replyVisible">
      <input-message :model="reply" placeholder="Ваш комментарий" @onInput="reply = $event"/>
      <div class="comment-send-button" :disable="!reply" @click="sendComment">
        <icon-send-message/>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageAvatar from '@Facade/Image/Avatar'
  import TextBase from '@Facade/Text/Base'
  import InputMessage from "@Facade/Input/Message";

  export default {
    name: 'Providers.Company.Task.TaskComment.Ui',
    components: {ImageAvatar, TextBase, InputMessage},
    data(){
      return{
        reply: '',
        replyVisible: false,
      }
    },
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    computed: {
      commentDate() {
        const date = new Date().toLocaleString('ru', { timeZone: 'UTC' });
        let month = ''
        const day = this.comment.date.substr(8, 2)
        const time = this.comment.date.slice(-8, -3)
        const year = this.comment.date.substr(0, 4)
        const dataMonth = this.comment.date.substr(5, 2)
        switch (dataMonth) {
          case '01':
            month = 'января'
            break;
          case '02':
            month = 'февраля'
            break;
          case '03':
            month = 'марта'
            break;
          case '04':
            month = 'апреля'
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
            month = 'августа'
            break;
          case '09':
            month = 'сентября'
            break;
          case '10':
            month = 'октября'
            break;
          case '11':
            month = 'ноября'
            break;
          case '12':
            month = 'декабря'
            break;

          default:
        }
        if(this.comment.date.substr(0, 10).split('-').join('') === date.substr(0, 10).split('.').reverse().join('')){
          return `Сегодня ${time}`
        }
        if(date.substr(0, 10).split('.').reverse().join('') - this.comment.date.substr(0, 10).split('-').join('') === 1){
          return `Вчера ${time}`
        }
        return `${day} ${month} ${year}, ${time}`
      },
    },
    methods: {
      sendComment(){

      },
    }
  }

</script>

<style lang="scss" scoped>
  .company-task-comment-ui{
    height: 100%;
    margin-bottom: 12px;
    padding: 20px 28px 24px 24px;
    background-color: $grey-scale-500;
    border-radius: 12px;
    border-top-left-radius: 2px;

    .comment-header{
      margin-bottom: 12px;
      display: flex;
      .user-avatar{
        height: 40px;
        width: 40px;
        margin-right: 12px;
      }
      .comment-info{
        .user-name{
          margin-bottom: 2px;
        }
        .bottom-part{
          display: flex;
          align-items: center;

          .comment-create-date{
            margin-right: 24px;
            font-size: 11px;
            line-height: 20px;
            color: $grey-scale-300;
          }

          .button-reply{
            color: $blue;
            font-size: 11px;
            line-height: 12px;
            cursor: pointer;
          }
        }
      }
    }

    .comment-content{
      color: #fff;
      //margin-bottom: 24px;
    }
    .input-send-reply{
      height: 100%;
      padding: 24px 0 0;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-radius: 12px;
      background-color: $grey-scale-500;

      .facade-input-message{
        margin-right: 10px;
      }

      .comment-send-button{
        height: 36px;
        min-width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        color: #fff;
        background-color: $blue;
        .icon{
          height: 18px;
          margin-left: 1px;
        }
        &[disable]{
          color: $grey-scale-300;
          background-color: $grey-scale-400;
        }
      }
    }
  }
</style>