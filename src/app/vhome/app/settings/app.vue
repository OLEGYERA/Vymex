<template>
  <div class="settings-view">
    <aside class="settings-aside">
      <div class="profile-settings">
        <text-caps-title>Мой профиль</text-caps-title>
        <plate-navigation @click.native="$router.push({name: 'vhome.settings.personal'})">
          <template #logo><icon-user/></template>
          <template #title>Личные данные</template>
        </plate-navigation>
        <plate-navigation>
          <template #logo><icon-planet/></template>
          <template #title>Язык</template>
          <template #data-title>Русский</template>
        </plate-navigation>
        <plate-navigation>
          <template #logo><icon-setting/></template>
          <template #title>Конфиденциальность</template>
        </plate-navigation>
        <plate-navigation>
          <template #logo><icon-wallet/></template>
          <template #title>Оплата и карта</template>
        </plate-navigation>
      </div>
      <div class="list-outer-links">
        <text-caps-title>Внешние ссылки</text-caps-title>
        <plate-navigation>
          <template #logo><icon-file/></template>
          <template #title>Пользовательское соглашение</template>
        </plate-navigation>
        <plate-navigation>
          <template #logo><icon-key/></template>
          <template #title>Политика конфиденциальности</template>
        </plate-navigation>
        <plate-navigation>
          <template #logo><icon-info/></template>
          <template #title>О приложении</template>
        </plate-navigation>
      </div>
      <div class="exit-box">
        <plate-navigation customization="exit">
          <template #logo><icon-exit/></template>
          <template #title>Выйти</template>
        </plate-navigation>
      </div>
    </aside>

    <div class="settings-router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TextCapsTitle from '@/components/text/caps-title'
import PlateNavigation from '@/components/plate/navigation'
import IconUser from '@/components/icon/user'
import IconPlanet from '@/components/icon/planet'
import IconSetting from '@/components/icon/setting'
import IconWallet from '@/components/icon/wallet'
import IconFile from '@/components/icon/file'
import IconKey from '@/components/icon/key'
import IconInfo from '@/components/icon/info'
import IconExit from '@/components/icon/exit'

// import {mapGetters} from 'vuex'

export default {
  name: 'vhome.settings',
  components: {
    TextCapsTitle,
    PlateNavigation,
    IconUser,
    IconPlanet,
    IconSetting,
    IconWallet,
    IconFile,
    IconKey,
    IconInfo,
    IconExit
  },
  computed: {
    // ...mapGetters({
    //   meID: 'getUserID',
    //   meName: 'getUserName',
    //   meLastname: 'getUserLastname'
    // })
  }
}
</script>

<style lang="scss" scoped>
.settings-view{
  display: flex;
  justify-content: space-between;
  height: calc(100% - 80px);
  box-sizing: border-box;

  .settings-aside{
    width: 35%;
    padding-right: 30px;
    box-sizing: border-box;
    border-right: 2px solid $grey-scale-500;
    .text-caps-title{
      margin-left: 15px;
      margin-bottom: 20px;
    }

    .profile-settings,
    .list-outer-links{
      margin-bottom: 40px;
      .plate-navigation{
        margin-bottom: 8px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }

  }


}
</style>