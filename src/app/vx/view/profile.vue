<template>
  <div class="profile-view">
    <profile-faq/>
<<<<<<< HEAD
    <resources-app/>
=======
    <dashboard />
>>>>>>> origin/IY
  </div>
</template>

<script>
  import ProfileFaq from "@/LTE/Containers/Vx/Main/Faq";
  import Dashboard from "@/LTE/Containers/Vx/Main/Dashboard/Dashboard";

  export default {
    name: 'vx.profile',
    components: {
      ProfileFaq,
<<<<<<< HEAD
      ResourcesApp: async  () => (await import('@Singletons')).ResourcesApp
=======
      Dashboard
>>>>>>> origin/IY
    }
  }
</script>