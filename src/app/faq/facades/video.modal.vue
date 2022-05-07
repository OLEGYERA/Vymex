<template>
  <div class="facade-video-modal">
    <modal :status="modalStatus"
           class="video-modal-main"
           @onClose="$emit('closeModalStatus')">
      <template #content>
        <iframe width="632"
                height="356"
                :src="videoLink"
                frameborder="0"
                allowfullscreen/>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'vx.faq.facade.video.modal',
  props: {
    modalStatus: {
      type: Boolean,
      required: true
    },
    videoLink: {
      type: String
    }
  },
  components: {
    Modal: () => import('@Facade/Modal/Base')
  }
}
</script>

<style lang="scss" scoped>
.facade-video-modal {
  display: flex;

  .video-modal-main {
    display: inherit;

    ::v-deep {
      .modal-base-header{
        display: none;
      }
      .facade-button-close{
        position: absolute;
        top: -40px;
        right: 0;
      }
      .modal-base-body{
        padding: 0;
        background-color: inherit;
      }
      .modal-base-content{
        margin: 0;
      }
      .modal-base-footer{
        display: none;
      }
    }
  }
}
</style>