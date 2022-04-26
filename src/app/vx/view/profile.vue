<template>
  <div class="profile-view">
    <profile-faq/>
<!--    <dashboard />-->
  </div>
</template>

<script>
  import ProfileFaq from "@/LTE/Containers/Vx/Main/Faq";
  // import Dashboard from "@/LTE/Containers/Vx/Main/Dashboard/Dashboard";

  export default {
    name: 'vx.profile',
    components: {
      ProfileFaq,
      // Dashboard
    }
  }
</script>