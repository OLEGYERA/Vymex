<template>
  <div class="process-create-process-view">
    <comeback @onClick="$router.push({name: 'vx.process.company.processes'})"/>
    <title-base>Создать процесс</title-base>
    <div class="create-process-view-main">
      <radio-slot :model="processModel"
                  :disable="processDisable" @onClick="changeStatusProcess">
        <template #title>Процессы должностного лица</template>
      </radio-slot>
      <radio-slot :model="!processModel"
                  :disable="!processDisable" @onClick="changeStatusProcess">
        <template #title>Процессы для уровней компании</template>
      </radio-slot>
      <input-base v-if="processModel" :placeholder="'Серийный номер'"/>
      <text-area v-else
                 :max-length="1000"
                 class="view-main-process-title"
                 placeholder="Название процесса"
                 labeled/>
      <text-area :max-length="1000"
                 placeholder="Описание"
                 labeled
                 count/>
      <header-add v-if="regularModel" class="view-main-files">
        <template #header-title>файлы</template>
      </header-add>
      <div v-else class="view-main-files">
        <header-add>
          <template #header-title>файлы</template>
          <template #header-amount>{{files.length}}</template>
        </header-add>
        <file v-for="(file, key) in files" :file="file" :key="key"/>
      </div>
      <radio-slot :model="!regularModel"
                  :disable="!regularDisable" @onClick="changeStatusRegular">
        <template #title>Регулярный</template>
      </radio-slot>
      <start-process v-if="!regularModel"/>
      <radio-slot :model="regularModel"
                  :disable="regularDisable" @onClick="changeStatusRegular">
        <template #title>Не регулярный</template>
      </radio-slot>
      <process-alert/>
      <header-add>
        <template #header-title>исполнители</template>
        <template #header-amount>{{!regularModel && subdivisions[0] ? subdivisions.length : ''}}</template>
      </header-add>
      <process-performer v-if="!regularModel" :performers="subdivisions"/>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button">Отмена</button-secondary>
      <button-base class="create-resource-button">Создать процесс</button-base>
    </div>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import TitleBase from "@Facade/Title/Base";
import InputBase from "@Facade/Input/Base"
import TextArea from "@Facade/Input/TextArea"
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import ButtonSecondary from "@Facade/Button/Secondary"
import ButtonBase from "@Facade/Button/Base"
import StartProcess from "../facades/StartProcess"
import RadioSlot from "../facades/RadioSlot"
import ProcessAlert from "../facades/ProcessAlert"
import {mapGetters} from "vuex";
import File from "@/LTE/Singletons/Resources/facades/File";
import ProcessPerformer from "@/app/vx/app/company/app/process/facades/ProcessPerformer";

export default {
  name: 'vx.process.create.process',
  components: {
    Comeback,
    TitleBase,
    InputBase,
    TextArea,
    HeaderAdd,
    ButtonSecondary,
    ButtonBase,
    RadioSlot,
    File,
    ProcessAlert,
    StartProcess,
    ProcessPerformer

  },
  data() {
    return {
      processModel: true,
      processDisable: true,
      regularModel: true,
      regularDisable: true,
    }
  },
  computed: {
    ...mapGetters({
      files: 'getFiles',
      subdivisions: 'getSubdivisions',
    }),
  },
  methods: {
    changeStatusProcess() {
      this.processModel = !this.processModel
      this.processDisable = !this.processDisable
    },
    changeStatusRegular() {
      this.regularModel = !this.regularModel
      this.regularDisable = !this.regularDisable
    }
  },
}
</script>

<style lang="scss" scoped>
.process-create-process-view {
  width: 100%;

  .facade-title-base {
    text-align: center;
    margin-bottom: rem(36);
  }

  .create-process-view-main {
    width: 100%;
    margin-bottom: rem(36);
    padding: 48px 164px 52px;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-radius: 16px;

    .facade-text-area::v-deep {
      .textarea-text-length {
        color: $grey-scale-300;
      }
    }

    .facade-input-base {
      border-width: 1px;
      margin-top: rem(16);
    }

    .facade-text-area::v-deep {
      margin-bottom: rem(8);

      .textarea-title {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
      }

      .textarea-container {
        min-height: 96px;
      }
    }
    .view-main-process-title.facade-text-area {
      ::v-deep {
        .textarea-container {
          min-height: 66px;
        }
      }
    }
    .facade-title-caps {
      margin-bottom: rem(16);
    }

    .view-main-files {
      margin: rem(24) 0;

      ::v-deep {
        .icon-points-vertical {
          color: #fff;
          margin-right: 8px;
        }
      }
    }

    .owner.facade-header-add::v-deep {
      padding: rem(8) 0;
      margin-bottom: rem(4);

      .icon-add {
        display: none;
      }
    }

    .facade-resource-company {
      margin-bottom: rem(24);
    }
  }

  .create-resource-buttons {
    display: flex;
    justify-content: space-between;

    .create-resource-button {
      width: 222px;
    }

    .facade-button-base::v-deep {
      font-size: 15px;

      &[disable] {
        background-color: $grey-scale-400;
      }
    }
  }
}
</style>