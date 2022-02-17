<template>
  <div class="container-selected-process">
    <comeback @onClick="$router.push({name: 'vx.process.company.processes'})"/>
    <div class="selected-process-header">
      <div class="header-events-panel">
        <process-event v-if="messages[indexProcess].panel"
                       :message="messages[indexProcess]"/>
        <div v-if="messages[indexProcess].date" class="panel-day">
          <span>Каждый день</span>
        </div>
      </div>
      <icon-points-vertical/>
    </div>
    <div class="selected-process-text">{{ messages[indexProcess].text }}</div>
    <div class="selected-process-description">Простой для понимания документ - документ, не требующий усилий для чтения
      и понимания,
      т.е. при изложении материала не используя сложные предложения
    </div>
    <div class="selected-process-body">
      <div class="body-performers">
        <header-add>
          <template #header-title>исполнители</template>
          <template #header-amount>{{13}}</template>
        </header-add>
        <process-performer/>
      </div>
      <div class="body-files">
        <header-add>
          <template #header-title>файлы</template>
          <template #header-amount>{{1}}</template>
        </header-add>
        <file v-for="(file, key) in files" :file="file" :key="key"/>
      </div>
    </div>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import {mapGetters} from "vuex";
import ProcessEvent from "../facades/ProcessEvent"
import ProcessPerformer from "../facades/ProcessPerformer"
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import File from "@/LTE/Singletons/Resources/facades/File";

export default {
  name: 'vx.resource.selected.process',
  components: {
    Comeback,
    ProcessEvent,
    HeaderAdd,
    File,
    ProcessPerformer
  },
  computed: {
    ...mapGetters({
      messages: 'getMessages',
      indexProcess: 'getProcessIndex',
      files: 'getFiles'
    }),
  },
}
</script>
<style lang="scss" scoped>
.container-selected-process {
  width: 100%;

  .selected-process-header {
    display: flex;
    justify-content: space-between;

    .header-events-panel {
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .panel-day {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: rem(91);
        height: rem(16);
        font-size: rem(11);
        color: #FFF;
        margin: 0 8px;
        background: $blue;
        border-radius: 14px;
      }
    }
  }

  .selected-process-text {
    width: 84.4%;
    font-size: rem(28);
    line-height: rem(34);
    color: #FFF;
    margin: 8px 0;
  }

  .selected-process-description {
    width: 76%;
    height: 60px;
    font-size: rem(15);
    line-height: rem(20);
    color: #FFF;
    margin: 24px 0;
  }

  .icon {
    color: #fff;
  }

  .selected-process-body {
    display: flex;
    justify-content: space-between;
    .body-performers {
     width: 50%;
      margin-top: rem(26);
    }

    .body-files {
      width: 50%;
      margin-left: rem(24);
      margin-top: rem(26);
    }
  }
}
.facade-header-add {
  &::v-deep {
    .right-part {
      display: none;
    }
  }
}
.facade-resource-file{
  margin-top: 8px;
  &::v-deep {
    .icon-points-vertical{
      color: #fff;
    }
  }
}
.icon{
  color: #fff;
}
</style>