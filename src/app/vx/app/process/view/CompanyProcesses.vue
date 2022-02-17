<template>
  <div class="company-processes-files">
    <comeback @onClick="$router.push({name: 'vx.process'})"/>
    <div class="header-text-group">
      <title-base>Процессы компании</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add v-if="messages[0]" settingSlider>
      <template #header-title>процессы</template>
      <template #header-amount>{{messages[0] ? 12 : ''}}</template>
    </header-add>
    <header-add v-else>
      <template #header-title>процессы</template>
      <template #header-amount>{{messages[0] ? 12 : ''}}</template>
    </header-add>
    <div v-if="messages[0]">
    <process-message v-for="(message, key) in messages"
                     :message="message"
                     :key="key"
                     :index="key"
    />
    </div>
    <div v-else class="empty-processes">
      <img class="empty-processes-image" src="@/assets/img/my/empty-process.svg">
      Процессов нет
    </div>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import InputSearch from "@Facade/Input/Search";
import TitleBase from "@Facade/Title/Base"
import ProcessMessage from "./ProcessMessage"
import {mapGetters} from "vuex";
export default {
  name: 'vx.process.company.processes',
  components: {
    Comeback,
    HeaderAdd,
    TitleBase,
    InputSearch,
    ProcessMessage
  },
  computed: {
    ...mapGetters({
      messages: 'getMessages',
    })
  },
}
</script>
<style lang="scss" scoped>
.company-processes-files {
  width: 100%;

  .header-text-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .icon{
      color: #fff;
    }
  }

  .facade-input-search {
    margin-bottom: rem(16);
  }

  .facade-header-add {
    padding: rem(8) 0;
    margin-bottom: 8px;
  }
  .empty-processes {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $grey-scale-500;
    border-radius: 12px;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: $grey-scale-300;
    .empty-processes-image {
      margin-bottom: 8px;
    }
  }
}

</style>