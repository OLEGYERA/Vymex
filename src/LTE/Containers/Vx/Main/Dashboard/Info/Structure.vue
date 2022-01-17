<template>
  <div class="dashboard-structure">
      <span class="dashboard-structure-header">
        <span>Структура компании</span>
      </span>
    <div class="dashboard-structure-body">
      <div v-for="men of mens"
           :key="men.level"
           class="dashboard-structure-body-part"
           :style="{ backgroundColor: men.color }">
        <span class="dashboard-structure-body-part-level">{{ men.level }} УР.</span>
        <div class="dashboard-structure-body-part-num-mens">
          <span class="dashboard-structure-body-part-num">{{ men.numMens }}</span>
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
.dashboard-structure {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: $grey-scale-500;
  margin-top: 20px;
  padding: 16px;

  .dashboard-structure-header {
    position: static;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .dashboard-structure-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: static;
    width: 354px;
    height: 168px;
    align-self: stretch;
    flex-grow: 0;
    margin-top: 29px;

    .dashboard-structure-body-part {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 4px;
      position: static;
      width: 100%;
      height: 36px;
      margin: 4px;

      .dashboard-structure-body-part-level {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        color: #010203;
        height: 16px;
        margin: 10px;
      }

      .dashboard-structure-body-part-num-mens {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 8px;
        height: 16px;
        top: 10px;
        background: rgba(1, 2, 3, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        margin: 10px;

        .dashboard-structure-body-part-num {
          color: #FFFFFF;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>