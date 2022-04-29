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
        <img v-if="performer.avatar" :src="performer.avatar" class="context-main-avatar"/>
        <image-avatar v-else-if="performer.numberPeople === 1 && processModel === 'official-processes'"
                       class="context-main-avatar"
                      :logo="$core.traits.ImageLogo(performer.avatar,
                      performer.name ? performer.name : performer.position)"
                      :color-code="$core.traits.ImageColorCode(performer.id)"/>
        <div v-else class="context-main-num">
          {{ performer.numberPeople }}
        </div>
        <span class="context-main-position">{{ performer.name ? performer.name : performer.position }}</span>
      </div>
      <div @click="performer.actionListStatus = !performer.actionListStatus">
        <icon-points-vertical/>
        <transition>
          <action-list
              class="process-alert-context"
              @onList="showSidebar(i)"
              @onDelete="$emit('onDelete', performer.level)"
              :status="performer.actionListStatus"
              :actions="items"
              v-if="performer.actionListStatus"
          />
        </transition>
      </div>
      <div class="action-list-outside" v-if="performer.actionListStatus"
           @click="performer.actionListStatus = false"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'vx.process.facade.process.performer',
  props: {
    performers: {
      type: Array,
      required: true
    }
  },
  data: () => ({
      items: ['Заменить']
  }),
  components: {
    ActionList: () => import('@Facade/Modal/ActionList'),
    ImageAvatar: () => import('@Facade/Image/Avatar')
  },
  computed: {
    ...mapGetters({
      processModel: 'getProcessModel'
    })
  },
  methods: {
    showSidebar(){
      this.$emit('show-sidebar')
      this.performers[0].actionListStatus = !this.performers[0].actionListStatus
    }
  }
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
    position: relative;

    .performer-context-main {
      display: inherit;
      justify-content: center;
      align-items: center;

      .context-main-avatar {
        margin-right: rem(12);
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

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
        margin-right: rem(22);
      }

      .context-main-position {
        font-size: rem(15);
        line-height: rem(20);
      }
    }

    .facade-modal-action-list {
      position: absolute;
      top: -73px;
      z-index: 1;
      right: 106px;
      transform: translateY(100%);
    }
  }

  .icon-points-vertical {
    margin-right: 10px;
  }
}

.icon {
  color: $grey-scale-300;
}
.action-list-outside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
}
</style>