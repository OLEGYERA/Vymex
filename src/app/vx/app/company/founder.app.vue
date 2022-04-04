<template>
  <div>
    <co-founder-app />
  </div>
</template>

<script>
  export default {
    name: 'vx.co.founder.app',
    components: {
      CoFounderApp: async () => (await import('@Singletons')).CoFounderApp,
    }
  }
</script>