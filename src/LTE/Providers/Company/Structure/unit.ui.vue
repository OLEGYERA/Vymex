<template>
  <div class="structure-unit-ui" :class="`su-level-${unitLevel}`" @click="onClick">
    <div class="structure-unit-info">
      <image-avatar :logo="$core.traits.ImageLogo(unitData.avatar, unitData.name, unitData.lastname)" :color-code="$core.traits.ImageColorCode(unitData.id)"/>
      <div class="info-title-group">
        <title-sub>{{unitData.name}} {{unitData.lastname}}</title-sub>
        <title-caption v-if="unitPosition">{{ unitPosition }}</title-caption>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script>
  /*eslint-disable*/
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleSub from '@Facade/Title/Sub'
  import TitleCaption from '@Facade/Title/Caption'
  import Mixin from './mixin'
  import './style.scss'


  export default {
    name: 'Providers.Company.Structure.Unit.Ui',
    components: {
      ImageAvatar,
      TitleSub, TitleCaption
    },
    mixins: [Mixin],
    methods: {
      onClick(){
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .structure-unit-ui{
    margin-bottom: 16px;
    cursor: pointer;
  }
</style>
