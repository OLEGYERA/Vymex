<template>
  <div class="support-feedback-view">
    <comeback @onClick="$router.push({name: 'vx.support'})"/>
    <div class="feedback-view-main">
      <title-base class="feedback-view-main-title">{{ticketType === 'bug' ? bugTitle : recommendationTitle}}</title-base>
      <div class="feedback-view-main-body">
        <span class="main-body-description">{{ticketType === 'bug' ? bugDescription : recommendationDescription}}</span>
        <div class="main-body-alert" @click="status = !status">
          <div class="body-alert-text">
            <span :class="selectedModule ? 'alert-text-title-mini' : 'alert-text-title'">{{
                ticketType === 'bug'
                ? bugModule : recommendationModule}}</span>
            <span class="alert-text-selected-module">{{ selectedModule }}</span>
          </div>
          <div class="body-alert-dropdown">
            <down-arrow v-if="!status"/>
            <up-arrow class="body-alert-dropdown-up" v-else/>
          </div>
        </div>
        <transition>
          <modules-context :status="status" @change-status="status = !status" @on-list="selectedModule = $event"/>
        </transition>
        <div class="main-body-border"></div>
        <text-area :max-length="1000"
                   class="main-body-text-area"
                   @onInput="textArea = $event"
                   :model="textArea"
                   :num-rows="4"
                   :placeholder="ticketType === 'bug' ? bugFeedback : recommendationFeedback"
                   count/>
        <div class="main-body-files">
          <header-add @create="modalUpload = true">
            <template #header-title>файлы</template>
            <template #header-amount></template>
          </header-add>
          <file class="main-body-files-margin" v-for="(file, key) in files"
                :file="file"
                :key="key"
                :index="key"
                @deleteFile="onDeleteFile"/>
          <span class="main-body-files-description">JPG, GIF or PNG. Max size of 800KB</span>
        </div>
      </div>
      <modal :disable="true"
             :status="modalUpload"
             @onClose="modalUpload = false">
        <template #title>Загрузить файлы</template>
        <template #description>Выберете вариант загрузки файлов</template>
        <template #content>
          <upload-files @onUpload="modalUpload = false"/>
        </template>
        <template #button-accept>Загрузить</template>
      </modal>
      <div class="view-main-buttons">
        <button-secondary class="view-main-button"
                          @onClick="$router.push({name: 'vx.support'})"
        >Назад
        </button-secondary>
        <button-base :disable="!selectedModule || !textArea"
                     class="view-main-button"
        @onClick="createTicket">Отправить</button-base>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.support.feedback',
  data: () => ({
    textArea: '',
    status: false,
    selectedModule: '',
    recommendationTitle: 'Оставить рекомендацию',
    bugTitle: 'Сообщить об ошибке',
    recommendationDescription: 'Напишите нам свои рекомендации и мы обязательно примем их во внимание, чтобы добавить в ближайшем плановом обновлении.',
    bugDescription: 'Мы не идеальны, и как все люди — можем что-то упустить. Каждый день мы делаем VYMEX лучше, но без вашей помощи это очень сложно. Нашли ошибку — отправьте ее нам',
    recommendationModule: 'Улучшаемый модуль',
    bugModule: 'Модуль с ошибкой',
    recommendationFeedback: 'Ваши рекомендации',
    bugFeedback: 'Опишите проблему',
    modalUpload: false
  }),
  components: {
    TitleBase: () => import('@Facade/Title/Base'),
    DownArrow: () => import('@Icon/DropdownArrow'),
    TextArea: () => import('@Facade/Input/TextArea'),
    File: () => import('@/LTE/Providers/Company/Resource/file.ui'),
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    ButtonSecondary: () => import('@Facade/Button/Secondary'),
    ButtonBase: () => import('@Facade/Button/Base'),
    Comeback: () => import('@Facade/Navigation/Comeback'),
    UpArrow: () => import('@Icon/UpArrow'),
    ModulesContext: () => import('./modules.context'),
    UploadFiles: () => import('@/app/vx/app/company/app/process/facades/UploadFiles'),
    Modal: () => import('@Facade/Modal/Base'),
  },
  created(){
    this.setFiles([])
    this.setFileIds([])
  },
  methods: {
    ...mapMutations({
      setFiles: 'setNewFiles',
      setFileIds: 'setNewFileIds'
    }),
    createTicket(){
      this.$core.execViaComponent('Support', 'createTicket', {
        description: this.textArea,
        userId: this.selectedCompany.workerId,
        ticketType: this.ticketType,
        createJiraIssue: false,
        fileIds: this.fileIds
      })
    },
    onDeleteFile(index){
      let newFiles = this.files.filter((el, i) => i !== index)
      this.setFiles(newFiles)
      let newFileIds = this.fileIds.filter((el, i) => i !== index)
      this.setFileIds(newFileIds)
    }
  },
  computed: {
    ...mapGetters({
      ticketType: 'getTicketType',
      files: 'getFiles',
      selectedCompany: 'Company/getSelectedCompany',
      fileIds: 'getFileIds'
    }),
  }
}
</script>

<style lang="scss" scoped>
.support-feedback-view {

  .feedback-view-main {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: rem(110);

    .feedback-view-main-title {
      margin-top: rem(8);
    }

    .feedback-view-main-body {
      display: inherit;
      align-items: flex-start;
      flex-direction: column;
      height: 100%;
      background: $grey-scale-500;
      margin-top: rem(36);
      border-radius: 16px;
      padding: rem(24) rem(164) rem(28);

      .main-body-description {
        height: rem(60);
        font-weight: 400;
        font-size: rem(15);
        line-height: rem(20);
        text-align: center;
        color: $grey-scale-200;
        margin-bottom: rem(24);
      }

      .main-body-alert {
        display: inherit;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: rem(52);
        .body-alert-text {
          display: inherit;
          flex-direction: column;

          .alert-text-title {
            font-weight: 400;
            font-size: rem(15);
            line-height: rem(20);
            color: $grey-scale-200;
          }

          .alert-text-title-mini {
            font-weight: 400;
            font-size: rem(12);
            line-height: rem(16);
            color: $grey-scale-200;
          }

          .alert-text-selected-module {
            color: #FFF;
            margin: rem(2) 0 rem(5);
            font-weight: 400;
            font-size: rem(15);
            line-height: rem(20);
          }
        }
        .body-alert-dropdown {
          color: #FFF;
        }

        .body-alert-dropdown-up {
          position: relative;
          top: 5px;
          right: -5px;
        }
      }

      .main-body-border {
        width: 100%;
        height: rem(1);
        background: $grey-scale-300;
      }

      .main-body-text-area {
        width: 100%;
        margin-top: rem(16);

        ::v-deep {
          .textarea-container {
            border-bottom: 1px solid $grey-scale-300;
          }
        }
      }

      .main-body-files {
        margin-top: rem(20);
        width: 100%;

        .main-body-files-margin {
          margin-top: rem(8);
        }

        .main-body-files-description {
          font-weight: 400;
          font-size: rem(12);
          line-height: rem(16);
          color: $grey-scale-300;
        }
      }
    }

    .view-main-buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: rem(36);

      .view-main-button {
        width: 222px;
        margin-bottom: rem(80);
      }

      .facade-button-base::v-deep {
        font-size: rem(15);

        &[disable] {
          background-color: $grey-scale-400;
        }
      }
    }
  }
}
</style>