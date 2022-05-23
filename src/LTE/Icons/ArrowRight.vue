<template>
  <div class="icon icon-arrow-right">
    <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_335_143453)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.82051 0.248058C4.12534 -0.0717709 4.63173 -0.0839299 4.95155 0.2209L11.9116 6.8545L11.9246 6.8672C12.0736 7.01583 12.1918 7.19239 12.2725 7.38677C12.3531 7.58116 12.3946 7.78955 12.3946 8C12.3946 8.21046 12.3531 8.41884 12.2725 8.61323C12.1918 8.80761 12.0736 8.98418 11.9246 9.1328L11.9116 9.1455L4.95155 15.7791C4.63173 16.0839 4.12534 16.0718 3.82051 15.7519C3.51568 15.4321 3.52784 14.9257 3.84767 14.6209L10.7943 8L3.84767 1.3791C3.52784 1.07427 3.51568 0.567887 3.82051 0.248058Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_335_143453">
          <rect width="16" height="16" fill="currentColor"/>
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'Icons.ArrowRight',
    props: {
      size: {
        type: Number,
        default: 16
      }
    }
  }
</script>