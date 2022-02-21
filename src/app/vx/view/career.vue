<template>
  <div class="career-view">
    <navigation-comeback @onClick="$router.push({name: 'vx'})"/>

    <div class="sync-page" v-if="!syncPage">
      <img src="@/assets/img/preloader.gif" alt="">
    </div>
    <transition name="fade-out">
      <div class="career-view-space" v-if="syncPage">
        <div class="company-head-info">
          <div class="head-main-info">
            <image-avatar class="company-logo" :logo="$core.traits.ImageLogo(companyDetails.base.avatar, companyDetails.base.name)" :color-code="$core.traits.ImageColorCode(companyDetails.base.id)"/>
            <div class="info-box">
              <title-base class="company-title">{{companyDetails.base.name}}</title-base>
              <ul class="company-activities">
                <li class="company-activity" v-for="activity in companyDetails.base.activities" :key="activity.id">{{ activity.title }}</li>
              </ul>
            </div>
          </div>
          <div class="head-main-id">
            <title-caps>Идентификатор</title-caps>
            <title-caps class="ID-container">#{{companyDetails.base.id}}</title-caps>
          </div>
        </div>
        <navigation-tabs class="company-tabs-info"
                         :tabs="[{title: 'Ваши с.е.', count: structureUnitLength}, {title: 'Информация'}]" :current-tab="currentNavigationTab" @onTab="currentNavigationTab = $event">
          <template #tab-content-0>
            <div class="structure-units-space">
              <div class="structure-unit-plate" v-for="(cofounder, cofounderKey) in company.cofounder" :key="cofounderKey">
                <image-avatar class="unit-logo" :logo="$core.traits.ImageLogo(user.avatar, user.name, user.lastname)" :color-code="$core.traits.ImageColorCode(user.id)"/>
                <div class="unit-info">
                  <div class="unit-info-title">Соучредитель</div>
                </div>
              </div>

              <div class="structure-unit-plate su-level" :class="`su-level-${worker.unitLevel}`" v-for="(worker, workerKey) in company.workers" :key="'su-level' + workerKey">
                <image-avatar class="unit-logo" :logo="$core.traits.ImageLogo(user.avatar, user.name, user.lastname)" :color-code="$core.traits.ImageColorCode(user.id)"/>
                <div class="unit-info">
                  <div class="unit-info-title">{{worker.unitName}}</div>
                  <title-caption class="unit-info-level">{{worker.unitLevel}} уровень</title-caption>
                </div>
              </div>
            </div>
          </template>
          <template #tab-content-1>
            <div class="company-about-space">
              <div class="company-about-plate" v-if="companyDetails.base.siteUrl">
                <div class="about-info-icon">
                  <icon-notebook/>
                </div>
                <div class="about-info-group">
                  <title-caption>Сайт или страница в соц.сетях</title-caption>
                  <text-base>{{ companyDetails.base.siteUrl }}</text-base>
                </div>
              </div>

              <div class="company-about-plate" v-if="companyDetails.base.country">
                <div class="about-info-icon">
                  <icon-language/>
                </div>
                <div class="about-info-group">
                  <title-caption>Страна</title-caption>
                  <text-base>{{ companyDetails.base.country }}</text-base>
                </div>
              </div>

              <div class="company-about-plate" v-if="companyDetails.base.city">
                <div class="about-info-icon">
                  <icon-location/>
                </div>
                <div class="about-info-group">
                  <title-caption>Город</title-caption>
                  <text-base>{{ companyDetails.base.city }}</text-base>
                </div>
              </div>

              <div class="company-about-plate" v-if="companyDetails.base.street">
                <div class="about-info-icon">
                  <icon-home/>
                </div>
                <div class="about-info-group">
                  <title-caption>Юридический адрес</title-caption>
                  <text-base>
                    <span v-if="companyDetails.base.street">ул. {{ companyDetails.base.street }}</span>
                    <span v-if="companyDetails.base.house"> д. {{ companyDetails.base.house }}</span>
                    <span v-if="companyDetails.base.apartment"> кв. {{ companyDetails.base.apartment }}</span>
                    <span v-if="companyDetails.base.office"> офф. {{ companyDetails.base.office }}</span>
                  </text-base>
                </div>
              </div>

              <div class="company-about-plate" v-if="companyDetails.base.tel">
                <div class="about-info-icon">
                  <icon-phone/>
                </div>
                <div class="about-info-group">
                  <title-caption>Телефон</title-caption>
                  <text-base>+{{ companyDetails.base.tel }}</text-base>
                </div>
              </div>

              <div class="company-about-plate" v-if="companyDetails.base.about">
                <div class="about-info-icon">
                  <icon-info/>
                </div>
                <div class="about-info-group">
                  <title-caption>О компании</title-caption>
                  <text-base>{{ companyDetails.base.about}}</text-base>
                </div>
              </div>
            </div>
          </template>
        </navigation-tabs>
      </div>
    </transition>
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
    components: {
      NavigationComeback,
      TitleSemi, TitleBase, TextBase, ImageAvatar, TitleCaps, TitleCaption,
      ProfileFaq, NavigationTabs,
      StubTriple, ButtonBase
    },
    beforeCreate() {
      this.$core.execViaComponent('Company', 'get', this.$route.params.companyID);
    },
    mounted() {
      this.company = this.companies.find(company => company.id === Number(this.$route.params.companyID));
    },
    data: () => ({
      company: [],
      currentNavigationTab: 0,
    }),
    computed: {
      ...mapGetters({
        user: 'getUser',
        companies: 'Company/getAll',
        companyDetails: 'Company/getCurrentCompany',
      }),
      syncPage(){
        return this.companyDetails.base !== null && this.company.length !== 0;
      },
      structureUnitLength(){
        return this.company.workers.length + this.company.cofounder.length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sync-page{
    display: flex;
    justify-content: center;
  }

  .career-view-space{
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
          display: flex;
          align-items: center;
          padding: 20px 12px;
          background-color: $grey-scale-400;
          border-radius: 12px;
          margin-bottom: 12px;
          .unit-logo{
            width: 40px;
            height: 40px;
            margin-right: 8px;
          }
          .unit-info{
            display: flex;
            flex-direction: column;
            .unit-info-title{
              font-weight: 600;
              color: #fff;
              font-size: rem(17);
              line-height: rem(22);
            }
            .unit-info-level{
              margin-top: 4px;
            }
          }

          &.su-level{
            .unit-info{
              .unit-info-title{
                color: $grey;
              }
              .unit-info-level{
                margin-top: 4px;
              }
            }
          }
          &.su-level-1{
            background: $su-level-1;
          }
          &.su-level-2{
            background: $su-level-2;
          }
          &.su-level-3{
            background: $su-level-3;
          }
          &.su-level-4{
            background: $su-level-4;
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
      }

      .company-about-space{
        .company-about-plate{
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid rgba($grey-scale-400, .5);
          .about-info-icon{
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: rgba($blue, .2);
            margin-right: 12px;
            .icon{
              color: $blue;
            }
          }
          .about-info-group{
            .facade-text-base{
              margin-top: 4px;
              color: #fff;
            }
          }
        }
      }
    }
    &.fade-out{
      &-enter-active{
        opacity: 0;
        transition: all 400ms ease-in;
      }
      &-enter-to{
        opacity: 1;
      }
    }
  }


</style>