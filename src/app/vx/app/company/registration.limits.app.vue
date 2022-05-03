<template>
  <div>
    <co-registration-limits-app />
  </div>
</template>

<script>
  export default {
    name: 'vx.co.registration.limits.app',
    components: {
      CoRegistrationLimitsApp: async () => (await import('@Singletons')).CoRegistrationLimitsApp,
    }
  }
</script>