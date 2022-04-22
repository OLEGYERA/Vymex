<template>
  <div class="process-main-view">
    <navigation-close/>
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
      <folder v-for="(folder, folderKey) in processFolders" :folder="folder" :key="folderKey" @getId="changePage"/>
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
      processFolders: 'getFolders',
      messages: 'getMessages',
      countProcesses: 'getCountProcesses',
      currentCompany: 'Company/getCurrentCompany',
      allCompanies: 'Company/getAll',
    })
  },
  mounted() {
    const companyId = this.currentCompany.base.id
    const currentCompanyAllData = this.allCompanies.find(el => el.id === companyId)
    const currentWorker = currentCompanyAllData.workers[0]
    const currentUnitId = currentWorker
        ? currentWorker.unitId
        : currentCompanyAllData.cofounder[0].id
    const currentUserId = currentWorker
        ? currentWorker.userId
        : currentCompanyAllData.cofounder[0].userId
    const currentLevelId = currentWorker
        ? currentWorker.unitLevel
        : 1
    this.setCurrentWorkerId({
      userId: currentUserId,
      unitId: currentUnitId,
      levelId: currentLevelId
    })
    this.$core.execViaComponent('Processes', 'count',
        {
          creatorId: currentUserId,
          unitId: currentUnitId,
          levelId: currentWorker ? currentWorker.unitLevel : 1,
          companyId
        });
  },
  methods: {
    ...mapMutations({
      setProcessModel: 'setChangeProcessModel',
      setFolders: 'setUpdateFolders',
      setCurrentWorkerId: 'setNumCurrentWorkerId'
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