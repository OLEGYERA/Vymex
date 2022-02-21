<template>
  <co-create-app/>
</template>

<script>
  export default {
    name: 'vx.co.create.view',
    components: {
      CoCreateApp: async () => (await import('@Singletons')).CoCreateApp,
    }
  }
</script>