<template>
  <co-create-app/>
</template>

<script>
  export default {
    name: 'vx.co.create.app',
    components: {
      CoCreateApp: async () => (await import('@Singletons')).CoCreateApp,
    }
  }
</script>