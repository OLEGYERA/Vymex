<template>
  <div v-if="userDraftRes.length" class="container-draft-list">
    <div class="draft-list-header">
      <title-caps>Ожидают регистрацию</title-caps>
      <div @click="$root.pushOverlapRoute({name: 'vx.co.registration.limits'})">
        <icon-question/>
      </div>
    </div>
    <div class="draft-list-body" v-for="(draft, key) in userDraftRes" :key="key" @click="toDraft(draft)">
      <icon-clock/>
      <div class="draft-list-body-main">
        <span class="body-main-title">{{ draft.name }}</span>
        <div v-if="draft.status === 'waiting'" class="body-main-finish-date">В очереди до <span
            class="main-finish-date-waiting">{{ finishDate(draft) }}</span>
        </div>
        <span class="body-main-opened" v-else>Доступно для регистрации</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'registration.limits.draft.list',
  components: {
    IconQuestion: () => import('@Icon/Question'),
    IconClock: () => import('@Icon/Clock'),
    TitleCaps: () => import('@Facade/Title/Caps')
  },
  props: {
    userDraftRes: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      month: 'getMonth'
    })
  },
  methods: {
    finishDate(data) {
      let month = data.queueAt.split('-')[1] < 10
          ? data.queueAt.split('-')[1].split('')[1]
          : data.queueAt.split('-')[1]
      let year = month < 12 ? data.queueAt.split('-')[0] : +data.queueAt.split('-')[0] + 1
      return `${month < 12 ? this.month[month] : this.month[0]}` + ', ' + `${year}`
    },
    toDraft(data) {
      if (data.status === 'waiting') {
        this.$notify({
          text: 'К сожалению, регистрация еще недоступна. Мы уведомим вас, как только освободится место',
          type: 'error',
          duration: 3000,
          speed: 500
        })
      }
      if (data.status === 'opened') {
        this.$root.pushOverlapRoute({name: 'vx.co.create'})
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.container-draft-list {
  margin-top: rem(16);
  padding-bottom: rem(76);

  .draft-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(16);
  }

  .draft-list-body {
    display: flex;
    height: rem(40);
    padding: rem(20) rem(16);
    background-color: $grey-scale-400;
    border-radius: rem(12);
    margin-bottom: rem(12);

    .draft-list-body-main {
      display: inherit;
      flex-direction: column;
      margin-left: rem(12);

      .body-main-title {
        font-weight: 600;
        font-size: rem(17);
        line-height: rem(22);
        color: #FFF;
      }

      .body-main-finish-date {
        font-weight: 400;
        font-size: rem(12);
        line-height: rem(16);
        color: $grey-scale-200;

        .main-finish-date-waiting {
          font-weight: 600;
          font-size: rem(12);
          line-height: rem(16);
          letter-spacing: 0.05em;
          text-transform: capitalize;
          color: #FFF;
        }
      }

      .body-main-opened {
        font-weight: 600;
        font-size: rem(12);
        line-height: rem(12);
        letter-spacing: 0.05em;
        color: $secondary-yellow;
      }
    }
  }
}
</style>