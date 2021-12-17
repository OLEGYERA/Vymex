<template>
  <icon-substrate icon-name="icon-arrow-close-down" :icon-touch="touch">
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.25878 8.25703L7.41712 10.4154C7.74212 10.7404 8.26712 10.7404 8.59212 10.4154L10.7505 8.25703C11.2755 7.73203 10.9005 6.83203 10.1588 6.83203L5.84212 6.83203C5.10045 6.83203 4.73378 7.73203 5.25878 8.25703Z" fill="currentColor"/>
    </svg>
  </icon-substrate>
</template>


<script>
import IconSubstrate from '@/components/icon/substrate'

export default {
  name: 'icon.arrow-left',
  props: {
    touch: Boolean
  },
  components: {IconSubstrate},
}
</script>