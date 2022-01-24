<template>
  <div class="container-dashboard-structure">
    <div class="structure-header">
      <span>Структура компании</span>
    </div>
    <div class="structure-body">
      <div v-for="men of mens"
           :key="men.level"
           class="body-part"
           :style="{ backgroundColor: men.color }">
        <span class="part-level">{{ men.level }} УР.</span>
        <div class="part-mens">
          <span class="part-num">{{ men.numMens }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Structure",
  data() {
    return {
      mens: [
        {level: 1, color: "#D5F1C5", numMens: 1},
        {level: 2, color: "#FEF0BD", numMens: 1},
        {level: 4, color: "#F2CBF8", numMens: 1},
      ]
    }
  }

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

  .structure-header {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: #FFF;
    margin-bottom: 9%;
  }

  .structure-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12%;

    .body-part {
      display: flex;
      justify-content: space-between;
      border-radius: 4px;
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
        }
      }
    }
  }
}
</style>