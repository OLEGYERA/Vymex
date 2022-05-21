<template>
  <div class="onboarding-modules-context-view" v-if="status">
    <div class="modules-context-view-body" :style="{
        borderTopRightRadius: status ? 0 : '',
        borderTopLeftRadius: status ? 0 : ''
      }">
      <div v-for="(section, sectionKey) in sections" :key="sectionKey" class="context-view-body-items"
           @click="handleClickOnItem(sectionKey)">
        <div class="context-view-body-item">
          <div class="body-item-background">
          <img class="item-background-icon" :src="section.icon"/>
          </div>
          <span class="body-item-title">{{ section.title }}</span>
        </div>
      </div>
    </div>
    <div class="action-list-outside" v-if="status"
         @click="changeStatus"></div>
  </div>
</template>
<script>

import {mapGetters} from 'vuex';

export default {
  name: 'onboarding.modules.context',
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({sections: 'Company/getSections'})
  },
  methods: {
    handleClickOnItem(id) {
      this.$emit('on-list', this.sections[id]);
      this.changeStatus()
    },
    changeStatus() {
      this.$emit('change-status');
    }
  }
}
</script>

<style lang="scss" scoped>
.onboarding-modules-context-view {
  position: relative;

  .modules-context-view-body {
    color: #fff;
    background: $grey-scale-500;
    border-radius: rem(12);
    position: absolute;
    z-index: 2;
    width: rem(308);
    height: rem(278);
    overflow-y: scroll;
    padding: 0 rem(12) rem(12);

    .context-view-body-items {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: rem(4) rem(8);
      margin-bottom: rem(10);
        .context-view-body-item {
          display: inherit;
          align-items: center;
          justify-content: flex-start;
          padding: rem(4) rem(8);
          .body-item-background{
            display: inherit;
            align-items: inherit;
            width: rem(18);
            height: rem(18);
            background: $grey-scale-300;
            border-radius: 45%;
            padding: rem(7);
            margin-right: rem(10);
            .item-background-icon {
              width: rem(18);
              height: rem(18);
            }
          }

          .body-item-title {
            font-weight: 600;
            font-size: rem(12);
            line-height: rem(16);
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #FFF;
          }
        }

        &:hover {
          background: $grey-scale-400;
          border: rem(4) solid $blue;
          border-radius: rem(4);
          padding: 0 rem(4);
        }
      }
    }
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