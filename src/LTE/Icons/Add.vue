<template>
  <div class="icon icon-add">
    <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.79922 0.8C8.79922 0.358172 8.44105 0 7.99922 0C7.55739 0 7.19922 0.358172 7.19922 0.8V7.2002H0.8C0.358172 7.2002 0 7.55837 0 8.0002C0 8.44202 0.358172 8.8002 0.8 8.8002H7.19922V15.2C7.19922 15.6418 7.55739 16 7.99922 16C8.44105 16 8.79922 15.6418 8.79922 15.2V8.8002H15.2C15.6418 8.8002 16 8.44202 16 8.0002C16 7.55837 15.6418 7.2002 15.2 7.2002H8.79922V0.8Z" fill="currentColor"/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'Icons.Add',
    props: {
      size: {
        type: Number,
        default: 16
      }
    }
  }
</script>