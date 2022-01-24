<template>
  <div class="side-button side-button-special">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  .side-button {
    width: 72px;
    height: 65px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $grey-scale-200;
    cursor: pointer;
  }
</style>