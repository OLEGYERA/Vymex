<template>
  <div class="sign-up-registration-modal">
    <modal :disable="!textAreaName || !textAreaCount"
           :status="isShowModal"
           class="sign-up-registration-modal-view"
           @onClose="$emit('close-modal')"
           @onOk="inQueue">
      <template #title>О компании</template>
      <template #description>Оставьте заявку на очередь регистрации</template>
      <template #content>
        <text-area
            @onInput="textAreaName = $event"
            :model="textAreaName"
            placeholder="Название компании"
            :class="textAreaName ? 'modal-view-area' : ''"
            style="margin-top: 8px"
            labeled/>
        <text-area
            @onInput="textAreaCount = $event"
            :model="textAreaCount"
            placeholder="Количество сотрудников"
            :class="textAreaCount ? 'modal-view-area' : ''"
            style="margin: 11px 0 28px"
            labeled/>
      </template>
      <template #button-accept>Встать в очередь</template>
    </modal>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  name: 'sign.up.registration.modal',
  components: {
    Modal: () => import('@Facade/Modal/Base'),
    TextArea: () => import('@Facade/Input/TextArea')
  },
  props: {
    isShowModal: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    textAreaName: '',
    textAreaCount: null
  }),
  computed: {
    ...mapGetters({
      queueId: 'getQueueId'
    }),
  },
  methods: {
    inQueue(){
      this.$core.execViaComponent('CompanyDraft', 'createDraftCompany', {
        name : this.textAreaName,
        employeesCount: this.textAreaCount,
        queueId: this.queueId
      })
      this.textAreaName = ''
      this.textAreaCount = null
      this.$emit('close-modal')
    }
  },
}
</script>

<style lang="scss" scoped>
.sign-up-registration-modal {
  .sign-up-registration-modal-view {
    &::v-deep {
      .modal-base-body {
        width: 632px;
        height: auto;
        justify-content: space-between;
        padding-bottom: rem(43);
      }
    }
    .modal-view-area {
      ::v-deep.textarea-title {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
::v-deep.facade-input-text-area {
  &[labeled] {
    textarea {
      padding-top: 20px;

      &::placeholder {
        color: transparent;
      }

      &:focus + .textarea-title {
        top: 10px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
    }

    textarea:not(:placeholder-shown) + .textarea-title {
      top: 10px;
    }
  }
}

</style>