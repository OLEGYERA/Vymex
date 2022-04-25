<template>
  <div class="router-view-search">
    <button @click="$emit('routerAdd', {name: 'search'})">search-router</button>
    <button @click="$emit('routerBack')">close</button>
  </div>
</template>



<style lang="scss" scoped>
  .router-view-search{
    background-color: blue;
  }
</style>