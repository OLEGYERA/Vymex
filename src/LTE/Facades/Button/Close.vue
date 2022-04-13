<template>
  <div class="facade-button-close" @click.stop="$emit('onClick')">
    <icon-error/>
  </div>
</template>

<script>
  import IconError from '@Icon/Error'

  export default {
    name: 'Facades.Button.Close',
    components: {
      IconError
    }
  }
</script>

  <style lang="scss" scoped>
    .facade-button-close{
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: $grey;
      cursor: pointer;
      .icon-error{
        color: $grey-scale-200;
      }
    }
  </style>