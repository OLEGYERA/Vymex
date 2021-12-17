<template>
  <icon-substrate icon-name="icon-file" :icon-touch="touch">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.7002 0.8C1.7002 0.358172 2.05837 0 2.5002 0H8.1002C8.31237 0 8.51585 0.0842855 8.66588 0.234315L14.2659 5.83431C14.4159 5.98434 14.5002 6.18783 14.5002 6.4V15.2C14.5002 15.6418 14.142 16 13.7002 16H2.5002C2.05837 16 1.7002 15.6418 1.7002 15.2V0.8ZM3.3002 1.6V14.4H12.9002V6.73137L7.76883 1.6H3.3002Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.1002 0C8.54202 0 8.9002 0.358172 8.9002 0.8V5.6H13.7002C14.142 5.6 14.5002 5.95817 14.5002 6.4C14.5002 6.84183 14.142 7.2 13.7002 7.2H8.1002C7.65837 7.2 7.3002 6.84183 7.3002 6.4V0.8C7.3002 0.358172 7.65837 0 8.1002 0Z" fill="currentColor"/>
    </svg>
  </icon-substrate>
</template>


<script>
import IconSubstrate from '@/components/icon/substrate'

export default {
  name: 'icon.file',
  props: {
    touch: Boolean
  },
  components: {IconSubstrate},
}
</script>