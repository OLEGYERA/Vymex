<template>
  <div class="container-dashboard-structure">
    <div class="structure-header">
      <img :src="icon"/>
      <span class="structure-header-title">Структура компании</span>
      <img :src="context"/>
    </div>
    <div class="structure-body">
      <div v-for="(men, i) of mens"
           :key="i"
           class="body-part"
           :style="{ backgroundColor: men.color }">
        <span class="part-level">{{ men.level }} УР.</span>
        <div class="part-mens">
          <span class="part-num">{{ men.numMens }}</span>
          <img :src="human"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StructureChild",
  data() {
    return {
      icon: require('@/assets/img/my/structure.svg'),
      context: require('@/assets/img/icons/context.svg'),
      human: require('@/assets/img/icons/human.svg'),
    }
  },
  props: ['mens']
}
</script>

<style lang="scss" scoped>
.container-dashboard-structure {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .structure-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;
    .structure-header-title{
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 32% 0% 2%;
    }
  }

  .structure-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2%;

    .body-part {
      display: flex;
      justify-content: space-between;
      border-radius: 12px;
      width: 100%;
      margin: 4px;

      .part-level {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        color: $grey-scale-700;
        height: 16px;
        margin: 10px;
      }

      .part-mens {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 8px;
        height: 16px;
        top: 10px;
        background: rgba($grey-scale-700, 0.2);
        border-radius: 10px;
        margin: 10px;

        .part-num {
          color: #FFFFFF;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          margin-right: 15%;
        }
      }
    }
  }
}
</style>