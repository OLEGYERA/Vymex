<template>
  <div class="facade-resource-close-block">
    <title-caption>Закрыть</title-caption>
    <icon-error-small/>
  </div>
</template>

<script>
import TitleCaption from '@Facade/Title/Caption'
import IconErrorSmall from '@Icon/ErrorSmall'
export default {
  name: 'Facade.Resource.CloseBlock',
  components: {
    TitleCaption,
    IconErrorSmall
  },
  props: {
    folder: Object,
  }
}
</script>

<style lang="scss" scoped>
.facade-resource-close-block {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  .facade-title-caption {
    margin-right: 14px;
  }
  .icon-error-small {
    color: $grey-scale-200;
  }
}
</style>