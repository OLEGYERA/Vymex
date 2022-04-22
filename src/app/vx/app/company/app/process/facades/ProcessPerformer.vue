<template>
  <div class="facade-process-performer" @click="$emit('onClick')">
    <div v-for="(performer, i) in performers"
         :key="i"
         class="process-performer-context"
         :class="{
         level1: performer.level === 1,
         level2: performer.level === 2,
         level3: performer.level === 3,
         level4: performer.level === 4
         }">
      <div class="performer-context-main">
        <img v-if="performer.avatar" :src="performer.avatar"/>
        <div v-else class="context-main-num">
          {{ performer.numberPeople }}
        </div>
        <span class="context-main-position">{{ performer.position }}</span>
      </div>
      <icon-points-vertical @click.native="actionListStatus=true"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'vx.process.facade.process.performer',
  props: {
    performers: Array
  },
  data() {
    return {
      actionListStatus: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.facade-process-performer {
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
      justify-content: center;
      align-items: center;

      .context-main-num {
        display: inherit;
        justify-content: center;
        align-items: center;
        color: #FFF;
        width: 22px;
        height: 22px;
        background: rgba($grey-scale-700, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        font-weight: 600;
        font-size: rem(12);
        line-height: rem(16);
        text-align: center;
        text-transform: uppercase;
      }

      .context-main-position {
        font-size: rem(15);
        line-height: rem(20);
      }
    }
  }

  .icon-points-vertical {
    margin-right: 10px;
  }
}

.icon {
  color: $grey-scale-300;
}
</style>