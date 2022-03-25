<template>
  <div class="company-processes-files">
    <comeback @onClick="$router.push({name: 'vx.process'})"/>
    <div class="header-text-group">
      <title-base>Процессы компании</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add v-if="messages[0]"
                settingSlider
                @create="$router.push({name: 'vx.process.create.process'})"
    >
      <template #header-title>процессы</template>
      <template #header-amount>{{messages.length}}</template>
    </header-add>
    <header-add v-else @create="$router.push({name: 'vx.process.create.process'})">
      <template #header-title>процессы</template>
    </header-add>
    <div v-if="messages[0]">
    <process-message v-for="(message, key) in messages"
                     :message="message"
                     :key="key"
                     :index="key"
    />
    </div>
    <div v-else class="empty-processes">
      <div class="image-circle-big">
      <img src="@/assets/img/my/empty-process.svg">
      </div>
      <div class="image-circle-small"></div>
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
  data(){
    return{
      createProcess: false
    }
  },
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
    .image-circle-big{
      position: relative;
      height: 36px;
      width: 36px;
      border-radius: 18px;
      background: linear-gradient(45deg, $grey-scale-300 40%, #69C0FF 80%);
      z-index: 1;
      margin-bottom: 4px;
    }
    .image-circle-small{
      position: absolute;
      height: 30px;
      width: 30px;
      border-radius: 15px;
      background: #69C0FF;
      margin-bottom: 34px;
      margin-left: 22px;
      z-index: 0;
    }
  }
}

</style>