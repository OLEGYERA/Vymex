<template>
  <icon-substrate icon-name="icon-message" :icon-touch="touch">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.878436 0.87868C1.44104 0.316071 2.20411 0 2.99976 0H16.9998C17.7954 0 18.5585 0.316071 19.1211 0.87868C19.6837 1.44129 19.9998 2.20435 19.9998 3V13C19.9998 13.7956 19.6837 14.5587 19.1211 15.1213C18.5585 15.6839 17.7954 16 16.9998 16H10.3505L5.62445 19.7809C5.32428 20.021 4.91303 20.0678 4.56657 19.9013C4.2201 19.7348 3.99976 19.3844 3.99976 19V16H2.99976C2.20411 16 1.44104 15.6839 0.878436 15.1213C0.315826 14.5587 -0.000244141 13.7956 -0.000244141 13V3C-0.000244141 2.20435 0.315827 1.44129 0.878436 0.87868Z" fill="currentColor"/>
    </svg>
  </icon-substrate>
</template>


<script>
import IconSubstrate from '@/components/icon/substrate'

export default {
  name: 'icon.message',
  props: {
    touch: Boolean
  },
  components: {IconSubstrate},
}
</script>