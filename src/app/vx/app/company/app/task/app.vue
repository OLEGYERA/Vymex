<template>
  <router-view/>
</template>


<script>
  // import ProfileFaq from '@Container/Vx/Profile/Faq'
  export default {
    name: 'app.vx.co.task',
    beforeCreate() {
      console.log(this.$route.params);
    }
  }
</script>
