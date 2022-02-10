<template>
  <div class="resources-create-resource-view">
    <comeback @click.native="$router.push({name: 'resources.material.resources'})"/>
    <title-base>Создать ресурс</title-base>
    <div class="main-plate">
      <input-base :placeholder="'Название'"/>
      <input-base :placeholder="'Серийный номер'"/>
      <text-area :placeholder="'Описание'" :max-length="1000" :count="true"/>
      <title-caps>Стоимость ресурса</title-caps>
      <input-price/>
      <header-add class="user" @create="showSidebar()">
        <template #header-title>Пользователь</template>
      </header-add>
      <assign-user/>
      <header-add class="owner">
        <template #header-title>Владелец</template>
        <template #header-amount>1</template>
      </header-add>
      <company :company="company"/>
      <header-add class="">
        <template #header-title>изображения</template>
      </header-add>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button">Отмена</button-secondary>
      <button-base class="create-resource-button" :disable="buttonDisable">Создать ресурс</button-base>
    </div>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import TitleBase from "@Facade/Title/Base";
import InputBase from "@Facade/Input/Base"
import TextArea from "@Facade/Input/TextArea"
import TitleCaps from "@Facade/Title/Caps"
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import Company from "@/LTE/Singletons/Resources/facades/Company";
import ButtonSecondary from "@Facade/Button/Secondary"
import ButtonBase from "@Facade/Button/Base"
import InputPrice from "@Facade/Input/Price"
import AssignUser from "@/LTE/Singletons/Resources/views/sidebar/AssignUser";

import {mapMutations} from "vuex";

export default {
  name: 'resources.material.resources',
  components: {
    Comeback,
    TitleBase,
    InputBase,
    TextArea,
    TitleCaps,
    HeaderAdd,
    Company,
    ButtonSecondary,
    ButtonBase,
    InputPrice,
    AssignUser
  },
  data() {
    return{
      company: {
        img: require('@/assets/img/my/process.svg'),
        name: 'Arxel'
      },
      buttonDisable: true,
    }
  },
  methods: {
    ...mapMutations({
      showSidebar: 'Resources/showSidebarAssign',
    }),
  },
}
</script>

<style lang="scss" scoped>
.resources-create-resource-view {
  height: 100%;
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  .facade-navigation-comeback {
    margin-bottom: rem(28);
  }
  .facade-title-base {
    text-align: center;
    margin-bottom: rem(36);
  }
  .main-plate {
    width: 100%;
    margin-bottom: rem(36);
    padding: 48px 164px 52px;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-radius: 16px;
    .facade-input-base {
      border-width: 1px;
      margin-bottom: rem(16);
    }
    .facade-text-area::v-deep {
      margin-bottom: rem(16);
      textarea{
        min-height: 104px;
      }
    }
    .facade-title-caps {
      margin-bottom: rem(16);
    }
    .facade-input-price {
      margin-bottom: rem(24);
    }
    .user {
      margin-bottom: 24px;
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