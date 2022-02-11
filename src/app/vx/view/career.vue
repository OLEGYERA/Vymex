<template>
  <div class="career-view">
    <navigation-comeback @onClick="$router.push({name: 'vx'})"/>
    <div class="company-head-info" v-if="company">
      <div class="head-main-info">
        <image-avatar class="company-logo" :logo="$core.traits.ImageLogo(company.avatar, company.name)" :color-code="$core.traits.ImageColorCode(company.id)"/>
        <div class="info-box">
          <title-base class="company-title">{{company.name}}</title-base>
          <ul class="company-activities">
            <li class="company-activity" v-for="activity in company.activities" :key="activity.id">{{ activity.title }}</li>
          </ul>
        </div>
      </div>
      <div class="head-main-id">
        <title-caps>Идентификатор</title-caps>
        <title-caps class="ID-container">#{{company.id}}</title-caps>
      </div>
    </div>

    <navigation-tabs class="company-tabs-info"
                     :tabs="[{title: 'Ваши с.е.', count: 1}, {title: 'Информация'}]" :current-tab="currentNavigationTab" @onTab="currentNavigationTab = $event">
      <template #tab-content-0>
        <div class="structure-units-space">
          <div class="structure-unit-plate">
            <image-avatar class="unit-logo" :logo="$core.traits.ImageLogo(company.avatar, company.name)" :color-code="$core.traits.ImageColorCode(company.id)"/>
          </div>
        </div>
      </template>
      <template #tab-content-1>
        <div style="width: 100%; background-color: #000;">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusantium amet et eveniet facilis fugit obcaecati, odit rerum saepe sit temporibus veniam veritatis. A cupiditate dolor explicabo nemo numquam ullam?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusantium amet et eveniet facilis fugit obcaecati, odit rerum saepe sit temporibus veniam veritatis. A cupiditate dolor explicabo nemo numquam ullam?
        </div>
      </template>
    </navigation-tabs>

    {{company}}
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from "@Facade/Navigation/Comeback";
  import TitleSemi from "@Facade/Title/Semi";
  import TitleBase from "@Facade/Title/Base";
  import TextBase from "@Facade/Text/Base";
  import ImageAvatar from "@Facade/Image/Avatar"
  import TitleCaps from "@Facade/Title/Caps";
  import TitleCaption from "@Facade/Title/Caption";

  import ProfileFaq from "@/LTE/Containers/Vx/Main/Faq";
  import NavigationTabs from '@Facade/Navigation/Tabs'
  import StubTriple from '@Facade/Stub/Triple'
  import ButtonBase from '@Facade/Button/Base'

  import {mapGetters} from 'vuex'

  export default {
    name: 'vx.career',
    beforeCreate() {
      this.$core.execViaComponent('Company', 'get', this.$route.params.companyID);
    },
    components: {
      NavigationComeback,
      TitleSemi, TitleBase, TextBase, ImageAvatar, TitleCaps, TitleCaption,
      ProfileFaq, NavigationTabs,
      StubTriple, ButtonBase
    },
    data: () => ({
      currentNavigationTab: 0
    }),
    computed: {
      ...mapGetters({
        company: 'Company/getCurrentCompanyInfo'
      }),
    }
  }
</script>

<style lang="scss" scoped>
  .company-head-info{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    .head-main-info{
      display: flex;
      .company-logo{
        width: 88px;
        height: 88px;
        margin-right: 26px;
        ::v-deep .avatar-body{
          font-size: rem(28);
          line-height: rem(28);
        }
      }
      .info-box{
        .company-title{
          margin: 0;
        }
        .company-activities{
          margin: 12px 0 0;
          padding-left: 18px;
          .company-activity{
            color: #fff;
            margin-bottom: 4px;
            font-size: rem(17);
            line-height: rem(24);
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .head-main-id{
      .ID-container{
        color: #fff;
        margin-top: 4px;
      }
    }

  }
  .company-tabs-info{
    background-color: $grey-scale-500;
    border-radius: 16px;
    overflow: hidden;
    ::v-deep .navigation-tabs-content{
      padding-left: 20px;
      padding-right: 20px;
    }

    .structure-units-space{
      display: flex;
      flex-direction: column;
      .structure-unit-plate{
        padding: 20px 12px;
        background-color: $grey-scale-400;
        border-radius: 12px;
        .unit-logo{
          width: 40px;
          height: 40px;
        }
      }
    }
  }
</style>