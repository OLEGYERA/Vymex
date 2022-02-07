<template>
  <div class="profile-view">
    <profile-faq/>
    <resources-app/>
  </div>
</template>

<script>
  import ProfileFaq from "@/LTE/Containers/Vx/Main/Faq";

  export default {
    name: 'vx.profile',
    components: {
      ProfileFaq,
      ResourcesApp: async  () => (await import('@Singletons')).ResourcesApp
    }
  }
</script>