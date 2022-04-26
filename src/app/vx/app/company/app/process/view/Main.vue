<template>
  <div class="process-main-view">
    <navigation-close @onClick="$router.push({name: 'vx'})"/>
    <header class="process-main-header">
      <div>
        <div class="header-container">
          <title-base>Процессы</title-base>
          <div class="header-container-icons">
            <icon-eye class="header-container-icon"/>
          </div>
        </div>
        <text-base>Тут храняться все процессы в вашей компании</text-base>
      </div>
    </header>
    <header-add>
      <template #header-title>папки</template>
      <template #header-amount>{{ processFolders.length }}</template>
    </header-add>
    <main>
      <folder v-for="(folder, folderKey) in processFolders" :folder="folder" :key="folderKey" @onClick="changePage"/>
    </main>
  </div>
</template>

<script>
/*eslint-disable*/
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.main',
  components: {
    NavigationClose: () => import('@Facade/Navigation/Close'),
    TitleBase: () => import('@Facade/Title/Base'),
    TextBase: () => import('@Facade/Text/Base'),
    TitleCaption: () => import('@Facade/Title/Caption'),
    Folder: () => import('@/LTE/Providers/Company/Resource/folder.ui'),
    ButtonBase: () => import('@Facade/Button/Base'),
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    IconEye: () => import('@Icon/Eye')
  },
  computed: {
    ...mapGetters({
      processFolders: 'getFolders',
      messages: 'getMessages',
      countProcesses: 'getCountProcesses',
      selectedCompany: 'Company/getSelectedCompany'
    })
  },
  mounted() {
    this.$core.execViaComponent('Processes', 'count',
        {
          creatorId: this.selectedCompany.workerId,
          unitId: this.selectedCompany.unitId,
          levelId: this.selectedCompany.unitLevel,
          companyId: this.selectedCompany.companyId
        });
  },
  methods: {
    ...mapMutations({
      setProcessModel: 'setChangeProcessModel',
      setFolders: 'setUpdateFolders',
    }),
    changePage({id}) {
      id === 2
          ? this.setProcessModel('company-processes')
          : this.setProcessModel('official-processes')
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