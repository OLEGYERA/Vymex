<template>
  <div class="process-main-view">
    <navigation-close/>
    <header class="process-main-header">
      <div>
        <div class="header-container">
          <title-base>Процессы</title-base>
          <div class="header-container-icons">
            <icon-eye class="header-container-icon"/>
            <icon-add class="header-container-icon"/>
          </div>
        </div>
        <text-base>Тут храняться все процессы в вашей компании</text-base>
      </div>
    </header>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>{{ folders.length }}</template>
    </header-add>
    <main>
      <folder v-for="(folder, folderKey) in folders" :folder="folder" :key="folderKey" @getId="changePage"/>
    </main>
  </div>
</template>

<script>
/*eslint-disable*/
import NavigationClose from '@Facade/Navigation/Close'
import TitleBase from '@Facade/Title/Base'
import TextBase from '@Facade/Text/Base'
import TitleCaption from '@Facade/Title/Caption'
import Folder from "@/LTE/Singletons/Resources/facades/Folder";
import ButtonBase from '@Facade/Button/Base'
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import IconAdd from "@Icon/Add";
import IconEye from "@Icon/Eye";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.main',
  components: {
    NavigationClose,
    TitleBase,
    TextBase,
    TitleCaption,
    Folder,
    ButtonBase,
    HeaderAdd,
    IconAdd,
    IconEye
  },
  computed: {
    ...mapGetters({
      folders: 'getFolders'
    })
  },
  methods: {
      ...mapMutations({
        setProcessModel: 'setChangeProcessModel',
      }),
    changePage({id}) {
        id === 2 ? this.setProcessModel(false) : this.setProcessModel(true)
        this.$router.push({name: 'vx.process.company.processes'})
    }
  },
}
</script>

<style lang="scss" scoped>
.process-main-view {
  position: relative;
  width: 100%;

  header.process-main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(48);
    width: 100%;

    .header-container {
      display: flex;
      justify-content: space-between;
      width: 227%;
      margin-bottom: rem(12);

      .header-container-icons {
        display: inherit;
        flex-direction: row;

        .header-container-icon {
          height: 24px;
          width: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background-color: $grey-scale-400;
          border-radius: 8px;
          cursor: pointer;

          &:first-child {
            margin-right: rem(16);
            margin-left: 0;
          }
        }
      }
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
</style>