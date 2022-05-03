<template>
  <div id="app">
    <notifications position="top right" classes="vymex-notification"/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  background-color: $grey;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .vue-notification-group {
    .vue-notification-wrapper {
      margin: 10px 30px 0 0;

      .vymex-notification {
        padding: 16px 16px 16px 52px;
        border-radius: 12px;
        font-weight: 500;
        line-height: 20px;
        cursor: pointer;
        &.error {
          color: $red;
          background: linear-gradient(90deg, rgba(255, 77, 79, 0.3) 0%, rgba(33, 42, 51, 0.3) 50.15%), #313D49;
          :before{
            background: url('./assets/img/icons/step-error.svg');
          }
        }
        &.success {
          color: $green;
          background: linear-gradient(90deg, $green -70%, rgba(33, 42, 51, 0.3) 50.15%), #313D49;
          :before{
            background: url('./assets/img/icons/step-done.svg');
          }
        }
        :before{
          position: absolute;
          content: '';
          height: 24px;
          width: 24px;
          top: 52%;
          left: 16px;
        }
      }
      &:first-child {
        margin-top: 30px;
      }
    }
  }
}
</style>