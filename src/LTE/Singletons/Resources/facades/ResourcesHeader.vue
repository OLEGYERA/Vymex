<template>
  <div class="facade-resource-header">
    <div class="top-part">
      <title-base><slot/></title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
  </div>
</template>

<script>
import TitleBase from "@Facade/Title/Base"
import IconPointsVertical from "@Icon/PointsVertical"
import InputSearch from "@Facade/Input/Search";
export default {
  name: 'Facade.Resource.CloseBlock',
  components: {
    TitleBase,
    IconPointsVertical,
    InputSearch
  },
  props: {
    folder: Object,
  }
}
</script>

<style lang="scss" scoped>
.facade-resource-header {
  .top-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .icon-points {
      height: 16px;
      color: #fff;
      padding: 8px 10px;
      cursor: pointer;
    }
  }
}
</style>