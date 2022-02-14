<template>
  <div>
    <div @click="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})">Задачи</div>
  </div>
</template>