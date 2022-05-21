<template>
  <div class="profile-view">
    <profile-faq/>

    <navigation-tabs class="profile-career-navigation"
                     :tabs="[{title: 'Карьера', count: companies.length},{title: 'Резюме'}]" :current-tab="currentNavigationTab" @onTab="currentNavigationTab = $event">

      <template v-if="userDraftRes.length" #tab-content-0>
        <draft-list :userDraftRes="userDraftRes"/>
      </template>
      <template v-else #tab-content-0>
        <div class="career-space" v-if="companies.length === 0">
          <stub-triple icon="company-empty.svg" title="Для начала работы <br> создайте компанию" description="Дальше система автоматически <br> настроит вашу новую рабочую зону"/>
          <button-base @onClick="registrationLimits">Создать компанию</button-base>
        </div>
        <div class="career-full-space" v-if="companies.length !== 0">
          <template v-for="(company, companyID) in companies">
            <div class="career-company-plate" v-if="company" :key="companyID" @click="$router.push({name: 'vx.career', params: {companyID: company.id}})">
              <div class="company-plate-logo">
                <image-avatar :logo="$core.traits.ImageLogo(company.avatar, company.name)" :color-code="$core.traits.ImageColorCode(company.id)"/>
                <span class="my-workers-counter">{{company.workers.length + company.cofounder.length}}</span>
              </div>
              <div class="company-plate-info">
                <title-semi class="company-title">{{company.name}}</title-semi>
                <div class="company-group-created">
                  <title-caption>Создано</title-caption>
                  <title-caps>{{company.createDate}}</title-caps>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>

      <template #tab-content-1>
        <stub-triple
          icon="suitcase.png"
          title="Этот раздел в разработке"
          description="В дальнейшем тут можно будет создать резюме и найти работу. Будет доступно в апреле 2022."
        />
      </template>
    </navigation-tabs>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleSemi from "@Facade/Title/Semi";
  import TextBase from "@Facade/Text/Base";
  import ImageAvatar from "@Facade/Image/Avatar"
  import TitleCaps from "@Facade/Title/Caps";
  import TitleCaption from "@Facade/Title/Caption";

  import ProfileFaq from "@/LTE/Containers/Vx/Main/Faq";
  import NavigationTabs from '@Facade/Navigation/Tabs'
  import StubTriple from '@Facade/Stub/Triple'
  import ButtonBase from '@Facade/Button/Base'

  import CompanyMixin from "../app/company/mixin";
  import DraftList from '@/LTE/Singletons/Company/RegistrationLimits/views/draft.list'
  import {mapGetters} from 'vuex'
  //import Dashboard from "@/LTE/Singletons/Dashboard/app";

  export default {
    name: 'vx.home',
    components: {
      TitleSemi, TextBase, ImageAvatar, TitleCaps, TitleCaption,
      ProfileFaq, NavigationTabs,
      StubTriple, ButtonBase, DraftList
      // ResourcesApp: async  () => (await import('@Singletons')).ResourcesApp
    },
    mixins: [CompanyMixin],
    data: () => ({
      currentNavigationTab: 0
    }),
    mounted() {
      this.$core.execViaComponent('CompanyDraft', 'getUserDraftCompanies', this.user.id);
    },
    computed: {
      ...mapGetters({
        companies: 'Company/getAll',
        userDraftRes: 'getUserDraftRes',
        user: 'getUser'
      }),
    }
  }
</script>

<style lang="scss" scoped>
  .profile-career-navigation{
    margin: 12px 0;
    .career-space{
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .facade-button-base{
        margin-top: 24px;
        width: 300px;
      }
    }
    .career-full-space{
      .career-company-plate{
        padding: 20px 16px;
        background-color: $grey-scale-400;
        border-radius: 12px;
        margin-bottom: 16px;
        transition: .2s all linear;
        display: flex;
        cursor: pointer;
        .company-plate-logo{
          width: 40px;
          height: 40px;
          position: relative;
          margin-right: 12px;
          .my-workers-counter{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: $blue;
            color: #fff;
            font-weight: 700;
            width: 16px;
            height: 16px;
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: rem(12);
            line-height: rem(12);
          }
        }
        .company-plate-info{
          display: flex;
          flex-direction: column;
          .company-title{
            font-size: rem(17);
            line-height: rem(22);
            margin-bottom: 2px;
          }
          .company-group-created{
            display: flex;
            .facade-title-caption{
              margin-right: 4px;
            }
            .facade-title-caps{
              color: #fff;
            }
          }
        }

        &:hover{
          background-color: $grey-scale-500;
        }

        &:last-child{
          margin-bottom: 0;
        }
      }
    }

  }
</style>