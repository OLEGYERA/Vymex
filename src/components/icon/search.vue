<template>
  <icon-substrate icon-name="icon-arrow-left">
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.291811 7.69241L6.32053 13.7119C6.70547 14.096 7.32635 14.096 7.71129 13.7119C8.09624 13.3277 8.09624 12.7081 7.71129 12.3271L2.37485 7.00155L7.71129 1.67294C8.09624 1.28878 8.09624 0.669175 7.71129 0.288117C7.32635 -0.0960389 6.70547 -0.0960389 6.32053 0.288117L0.288707 6.30759C0.0962353 6.49967 0 6.75061 0 7.00155C0.00310421 7.24939 0.099339 7.50033 0.291811 7.69241Z" fill="currentColor"/>
    </svg>
  </icon-substrate>

</template>

<script>
  import IconSubstrate from '@/components/icon/substrate'

  export default {
    name: 'icon.arrow-left',
    props: {
      click: Function
    },
    components: {IconSubstrate},
  }
</script>