<template>
  <div class="container-process-performer">
    <div v-for="(performer, i) in performers"
         :key="i"
         class="process-performer-context"
         :class="{
         level1: performer.level===1,
         level2: performer.level===2,
         level3: performer.level===3,
         level4: performer.level===4
         }">
      <div class="performer-context-main">
        <img :src="performer.avatar"/>
        <span class="context-main-position">{{ performer.position }}</span>
      </div>
      <icon-points-vertical @click.native="actionListStatus=true"/>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'vx.process.facade.process.performer',
  data() {
    return {
      actionListStatus: false,
    }
  },
  computed: {
    ...mapGetters({
      performers: 'getPerformers',
    }),
  },
}
</script>

<style lang="scss" scoped>
.container-process-performer {
  width: 100%;

  .process-performer-context {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    border-radius: 8px;
    margin-top: 8px;
    padding: 8px;

    .performer-context-main {
      display: inherit;

      .context-main-position {
        font-size: rem(15);
        line-height: rem(20);
        color: $grey-scale-500;
        margin: 8px 12px;
      }
    }
  }
}
.icon{
  color: $grey-scale-300;
}
</style>