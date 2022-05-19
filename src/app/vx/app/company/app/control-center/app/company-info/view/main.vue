<template>
  <div class="company-info-main-view">
    <div class="navigation-buttons">
      <navigation-comeback @onClick="$router.push({name: 'vx.co.control-center', params: {companyID: $route.params.companyID}})"/>
      <navigation-close/>
    </div>

    <div class="company-info-header">
      <title-base>Инфо о компании</title-base>
      <icon-points-vertical @click.native="modalStatus = true"/>

      <modal-action-list :status="modalStatus" :actions="['Редактировать']" @onClose="modalStatus = false" @onList="$router.push({name: 'vx.co.control-center.company-edit'})"/>
    </div>

    <div class="company-about-space">
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
  </div>
</template>

<script>

  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleSemi from '@Facade/Title/Semi'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import ButtonBase from '@Facade/Button/Base'
  import TitleCaps from '@Facade/Title/Caps'
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleSub from '@Facade/Title/Sub'
  import NavigationClose from '@Facade/Navigation/Close'
  import ModalActionList from '@Facade/Modal/ActionList'

  import TitleBase from '@Facade/Title/Base'
  import {mapGetters} from "vuex";


  export default {
    name: 'vx.co.control-center.company-info.main.view',
    components: {
      NavigationComeback, TitleSemi, TitleCaption, TextBase, ButtonBase,
      ImageAvatar, TitleCaps, TitleBase, TitleSub, NavigationClose, ModalActionList
      // UnitPrivilegeUi
    },
    data: () => ({
      tableFull: false,
      status: false,
      headerAmount: [
        { start: 'до', end: 10},
        { start: '10-', end: 50},
        { start: '50-', end: 100},
        { start: '100-', end: 500},
        { start: 'от', end: 500},
      ],
      suInfo: [
        {
          name: 'Соучредитель',
          suAmount: [8.0, 8.0, 8.0, 8.0, 8.0],
        },
        {
          name: 'СЕО',
          suAmount: [8.0, 8.0, 8.0, 8.0, 8.0],
        },
        {
          name: 'Руководитель направлений',
          suAmount: [8.0, 8.0, 8.0, 8.0, 8.0],
        },
        {
          name: 'Руководитель отделов',
          suAmount: [8.0, 8.0, 8.0, 8.0, 8.0],
        },
        {
          name: 'Линейный отдел сотрудников',
          suAmount: [8.0, 8.0, 8.0, 8.0, 8.0],
        },
      ],
      activeColumn: 0,
      modalStatus: false,
      payments:[
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: false,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: false,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
        {
          cost: 150,
          status: true,
          date: '10 Августа 2021, 21:30',
          receipt: 14589654
        },
      ]
    }),
    mounted() {
      this.$core.execViaComponent('MsgUser', 'search', '');
      console.log(this.searchedContacts, 'data')
    },
    computed: {
      ...mapGetters({
        searchedContacts: 'Messenger/getSearchedContacts',
        companyDetails: 'Company/getCurrentCompany',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .company-info-main-view{
    .navigation-buttons{
      display: flex;
      justify-content: space-between;
    }

    .company-info-header{
      position: relative;
      margin-bottom: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon{
        padding: 0 10px;
        color: #fff;
        cursor: pointer;
      }

      .facade-modal-action-list::v-deep {
        right: 0;
        .action-list-body{
          top: 10px;
          transform: translateX(-100%);
        }
      }
    }

    .company-about-space{
      padding: 48px 20px;
      background-color: $grey-scale-500;
      border-radius: 16px;

      .company-head-info{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 48px;
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
          margin-right: 84px;
          .ID-container{
            color: #fff;
            margin-top: 4px;
          }
        }

      }

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
            height: 16px;
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

</style>