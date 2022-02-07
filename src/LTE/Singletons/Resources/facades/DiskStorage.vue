<template>
  <div class="facade-resource-disk-storage">
    <title-caption>Дисковое хранилище</title-caption>
    <div class="storage-memory">
      <div ref="slider" class="slider" :class="{'slider-middle': memoryPercent > 40, 'slider-full': memoryPercent > 80}"></div>
    </div>
    <div class="footer">
      <text-base>
        <span class="free-memory" :class="{middle: memoryPercent > 40, full: memoryPercent > 80}">{{fullMemoryStorage}}</span> / 15 GB
      </text-base>
      <icon-info :class="{middle: memoryPercent > 40, full: memoryPercent > 80}"/>
    </div>
  </div>
</template>

<script>
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
import IconInfo from '@Icon/Info'

export default {
  name: 'Facade.Resource.DiskStorage',
  components: {
    TextBase,
    TitleCaption,
    IconInfo
  },
  props: {
    memoryPercent: Number,
  },
  computed:{
    fullMemoryStorage() {
      return `${Math.round((15 -(this.memoryPercent * 15 / 100))*100) / 100} GB`
    }
  },
  methods: {
    setSliderWidth() {
      this.$refs['slider'].style.width = this.memoryPercent + '%'
    }
  },
  mounted() {
    this.setSliderWidth()
  },
  updated() {
    this.setSliderWidth()
  }
}
</script>

<style lang="scss" scoped>
.facade-resource-disk-storage {
  width: 246px;
  .facade-title-caption {
    margin-bottom: 12px;
    height: 12px;
  }
  .storage-memory {
    height: 8px;
    //width: 222px;
    border-radius: 4px;
    margin-bottom: 8px;
    background-color: $grey-scale-400;
    .slider {
      height: 8px;
      background-color: $green;
      border-radius: 4px;
    }
    .slider-middle {
      background-color: $secondary-yellow;
    }
    .slider-full {
      background-color: $red;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-info {
      height: 16px;
      color: transparent;
    }
    .free-memory {
      color: #fff;
    }
    .middle {
      color: $secondary-yellow;
    }
    .full {
      color: $red;
    }
  }
}
</style>