<template>
  <div class="personal-account-main-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.co.control-center'})"/>

    <div class="account-main-header">
      <title-base>Личный кабинет</title-base>
      <text-base>Здесь находиться оплата электронными денежными средствами</text-base>
    </div>

    <div class="tariff-plan-box">
      <div class="tariff-header">
        <div class="header-left-part">
          <div class="image-box">
            <img src="@/assets/img/vymex/logo.svg" alt="">
          </div>
          <div class="header-text-group">
            <title-semi>Тарифный план до 10 пользователей</title-semi>
            <title-caption>Смотреть тарифный план</title-caption>
          </div>
        </div>

        <div class="status-box">
          <title-caption>Активный</title-caption>
        </div>
      </div>

      <div class="tariff-down-part">
        <div class="tariff-balance-group">
          <text-base class="tariff-balance-title">Ваш баланс:</text-base>
          <div class="tariff-balance-amount">
            <div class="balance-count">$38</div>
            <div class="balance-star">*</div>
          </div>
          <text-base>Рекомендуемая дата следующего платежа:</text-base>
          <text-base class="tariff-payment-date">02.10.2021</text-base>
        </div>

        <div class="replenish-the-balance-group">
          <text-base class="tariff-replenish-title">Пополнить сейчас:</text-base>
          <div class="replenish-count">$0</div>
          <button-base>Пополнить баланс</button-base>
        </div>
      </div>

    </div>

    <div class="account-box-group">
      <div class="account-co-founders-box box">
        <title-caps>
          Соучередители
          <span class="account-title-amount">5</span>
        </title-caps>

        <div class="box-down-part">
          <div class="box-left-part">
            <title-caption>Стоимость:</title-caption>
            <div class="box-amount">$18</div>
          </div>

          <div class="co-founders-avatar-group">
<!--            <div class="co-founder-avatar" v-for="(data, dataKey) in searchedContacts" :key="dataKey">-->
<!--              <image-avatar :logo="$core.traits.ImageLogo(data.avatar, data.name, data.lastname)" :color-code="$core.traits.ImageColorCode(data.id)"/>-->
<!--            </div>-->
          </div>

        </div>
      </div>

      <div class="account-su-box box">
        <title-caps>
          Структурные единицы
          <span class="account-title-amount">2</span>
        </title-caps>

        <div class="box-down-part">
          <div class="box-left-part">
            <title-caption>Стоимость:</title-caption>
            <div class="box-amount">$20</div>
          </div>

          <div class="right-part">
            <div class="level-amount">
              <title-caption>$18 (1)</title-caption>
              <div class="level-slider-1 level-slider"></div>
            </div>

            <div class="level-amount">
              <title-caption>$2 (1)</title-caption>
              <div class="level-slider-2 level-slider"></div>
            </div>

            <div class="level-amount">
              <title-caption>0</title-caption>
              <div class="level-slider-3 level-slider"></div>
            </div>

            <div class="level-amount">
              <title-caption>0</title-caption>
              <div class="level-slider-4 level-slider"></div>
            </div>
          </div>

        </div>

      </div>

      <div class="account-disk-storage-box box">
        <title-caps>
          Структурные единицы
          <span class="account-title-amount">50 gb</span>
        </title-caps>

        <div class="box-down-part">
          <div class="box-left-part">
            <title-caption>Стоимость:</title-caption>
            <div class="box-amount">$0</div>
          </div>

          <div class="right-part">
            <title-caption>Доступно:</title-caption>
            <title-caption class="available-storage">50 GB</title-caption>
            <div class="storage-slider">
              <div class="full-storage-slider"></div>
            </div>
            <text-base class="storage-button">Расширить</text-base>
          </div>

        </div>

      </div>
    </div>

    <title-caps class="account-main-subtitle">
      Оплаты
      <span class="account-subtitle-amount">12</span>
    </title-caps>

    <div class="payment-table-header">
      <title-caption>Списание</title-caption>
      <title-caption>Статус</title-caption>
      <title-caption>Дата</title-caption>
      <title-caption>Квитанция</title-caption>
    </div>

    <div class="payment-table-main" :class="{'payment-table-full': tableFull}">
      <div class="payment-info-block" v-for="(payment, paymentKey) in payments" :key="paymentKey">
        <text-base>${{payment.cost}}</text-base>
        <div class="payment-success-info" :class="{success: payment.status}">
          <title-caption>{{payment.status ? 'Успешно' : 'Ошибка'}}</title-caption>
        </div>
        <text-base>{{payment.date}}</text-base>
        <text-base>{{payment.receipt}}</text-base>
        <icon-save/>
      </div>
    </div>

    <div class="btn-open-full" @click="tableFull = !tableFull">
      <title-sub>{{ !tableFull ? 'Показать все' : 'Свернуть'}}</title-sub>
    </div>

    <div class="tariff-plan-subtitle">
      <title-caps>Тарифный план</title-caps>
      <icon-info @click.native="status = true"/>

      <div class="modal-tariff-plan" v-if="status">
        <div class="modal-outside" @click="status = false"></div>
        <div class="modal-text">
          Воркеры, добавленные в систему, но не проработавшие полный календарный месяц будут просчитаны исключительно за то время,
          которое они находились в структурной единице. <br>
          Если вы пригласили воркера в структурную единицу - воркер базово будет просчитан как за неделю нахождения в ней,
          даже если он будет мгновенно удалён.“
        </div>
      </div>
    </div>

    <div class="tariff-plan-table">
      <div class="tariff-table-header">
        <text-base class="header-title">Кол-во <br> структурных <br> единиц</text-base>

        <div class="user-amount-box" v-for="(amount, amountKey) in headerAmount" :key="amountKey">
          <div class="top-text-group">
            <title-semi :class="{active: activeColumn === amountKey}">{{ amount.start }}</title-semi>
            <title-base :class="{active: activeColumn === amountKey}">{{ amount.end }}</title-base>
          </div>
          <title-caption>Пользователей</title-caption>
        </div>
      </div>

      <div class="su-info" :class="`su-info-${infoKey}`" v-for="(info, infoKey) in suInfo" :key="infoKey">
        <div class="su-position">
          <div class="color-box" :class="`color-box-${infoKey}`"></div>
          <text-base>{{ info.name }}</text-base>
        </div>

        <div class="su-amount" v-for="(amount, amountKey) in info.suAmount" :key="amountKey">
          <title-semi :class="{active: activeColumn === amountKey}">${{ amount }}</title-semi>
        </div>
      </div>

      <div class="table-footnote">
        <title-caption class="footnote-star">*</title-caption>
        <title-caption>цена указана за одного специалиста в месяц</title-caption>
      </div>

      <div class="border-active-plan">
        <div class="subtitle-active">Активный</div>
      </div>

<!--      <div class="user-amount-box">-->
<!--        <div class="top-text-group">-->
<!--          <title-semi>до</title-semi>-->
<!--          <title-base>10</title-base>-->
<!--        </div>-->
<!--        <title-caption>Пользователей</title-caption>-->
<!--      </div>-->

<!--      <div class="user-amount-box">-->
<!--        <div class="top-text-group">-->
<!--          <title-semi>10-</title-semi>-->
<!--          <title-base>50</title-base>-->
<!--        </div>-->
<!--        <title-caption>Пользователей</title-caption>-->
<!--      </div>-->

<!--      <div class="user-amount-box">-->
<!--        <div class="top-text-group">-->
<!--          <title-semi>50-</title-semi>-->
<!--          <title-base>100</title-base>-->
<!--        </div>-->
<!--        <title-caption>Пользователей</title-caption>-->
<!--      </div>-->

<!--      <div class="user-amount-box">-->
<!--        <div class="top-text-group">-->
<!--          <title-semi>100-</title-semi>-->
<!--          <title-base>500</title-base>-->
<!--        </div>-->
<!--        <title-caption>Пользователей</title-caption>-->
<!--      </div>-->

<!--      <div class="user-amount-box">-->
<!--        <div class="top-text-group">-->
<!--          <title-semi>от</title-semi>-->
<!--          <title-base>500</title-base>-->
<!--        </div>-->
<!--        <title-caption>Пользователей</title-caption>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleSemi from '@Facade/Title/Semi'
  import TitleCaption from '@Facade/Title/Caption'
  import TextBase from '@Facade/Text/Base'
  import ButtonBase from '@Facade/Button/Base'
  import TitleCaps from '@Facade/Title/Caps'
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleSub from '@Facade/Title/Sub'

  import TitleBase from '@Facade/Title/Base'
  import {UnitPrivilegeUi} from '@Providers'
  import {mapGetters} from "vuex";


  export default {
    name: 'vx.co.control-center.personal-account.main.view',
    components: {
      NavigationComeback, TitleSemi, TitleCaption, TextBase, ButtonBase,
      ImageAvatar, TitleCaps, TitleBase, TitleSub
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
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .personal-account-main-view{
    .account-main-header{
      margin-bottom: 48px;
      .facade-title-base{
        margin-bottom: 12px;
      }
    }

    .tariff-plan-box{
      padding: 0 12px;
      background-color: $grey-scale-500;
      border-radius: 12px;
      margin-bottom: 24px;
      .tariff-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid $grey-scale-400;

        .header-left-part{
          display: inherit;
          align-items: inherit;
          .image-box{
            margin-left: 8px;
            display: inherit;
            justify-content: center;
            align-items: inherit;
            background-color: $grey-scale-400;
            height: 50px;
            width: 50px;
            border-radius: 8px;
          }
          .header-text-group{
            margin-left: 12px;
            .facade-title-semi{
              margin-bottom: 4px;
            }
            .facade-title-caption{
              color: $blue;
            }
          }

        }

        .status-box{
          padding: 4px 8px;
          border-radius: 5px;
          background-color: rgba($green, .1);
          height: min-content;

          .facade-title-caption{
            color: $green;
          }
        }
      }

      .tariff-down-part{
        padding: 16px 8px;
        display: flex;
        justify-content: space-between;

        .tariff-balance-group{
          .tariff-balance-title{
            margin-bottom: 8px;
          }

          .tariff-balance-amount{
            margin-bottom: 8px;
            color: #fff;
            display: flex;
            font-weight: 600;
            .balance-count{
              font-size: 48px;
              margin-right: 8px;
            }

            .balance-star{
              margin-top: 4px;
              font-size: 18px;
              line-height: 22px;
            }
          }

          .tariff-payment-date{
            color: #fff;
          }
        }

        .replenish-the-balance-group{
          border-left: 1px solid $grey-scale-400;
          padding: 0 23px;
          width: 304px;
          box-sizing: border-box;
          .tariff-replenish-title{
            margin-bottom: 8px;
          }
          .replenish-count{
            margin-bottom: 16px;
            font-size: 48px;
            color: $grey-scale-400;
          }
          .facade-button-base{
            width: max-content;
            padding: 10px 24px;
          }
        }
      }
    }

    .account-box-group{
      display: flex;
      margin-bottom: 56px;

      .box{
        height: 142px;
        width: 222px;
        box-sizing: border-box;
        background-color: $grey-scale-500;
        border-radius: 12px;
        padding: 16px 12px;
        display: inherit;
        flex-direction: column;
        justify-content: space-between;

        .account-title-amount{
          color: $blue;
        }

        .box-amount{
          line-height: 29px;
          font-size: 24px;
          font-weight: 600;
          color: #fff;
        }

        .box-down-part{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .left-part{
            .facade-title-caption{
              margin-bottom: 4px;
            }
          }
        }
      }

      .account-co-founders-box{
        margin-right: 24px;

        .co-founders-avatar-group{
          display: flex;
          .co-founder-avatar{

          }
        }
      }

      .account-su-box{
        margin-right: 24px;

        .right-part{
          .level-amount{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .facade-title-caption{
              margin-right: 8px;
            }
            .level-slider{
              width: 20px;
              height: 8px;
              border-radius: 20px;

              &.level-slider-1{
                background-color: $su-level-1;
              }
              &.level-slider-2{
                background-color: $su-level-2;
              }
              &.level-slider-3{
                background-color: $su-level-3;
              }
              &.level-slider-4{
                background-color: $su-level-4;
              }
            }
          }

        }
      }

      .account-disk-storage-box{
        display: inherit;
        width: 303px;
        padding-left: 14px;

        .right-part{
          text-align: right;

          .facade-title-caption{
            font-size: 13px;
            margin-right: 1px;
            margin-bottom: 4px;
          }

          .available-storage{
            color: #fff;
            margin-bottom: 6px;
          }

          .storage-slider{
            width: 152px;
            height: 8px;
            margin-bottom: 12px;
            background-color: $grey-scale-300;
            border-radius: 12px;
            .full-storage-slider{
              background-color: $green;
            }
          }

          .storage-button{
            color: $blue;
            cursor: pointer;
          }
        }
      }
    }

    .account-main-subtitle{
      margin-bottom: 32px;
      .account-subtitle-amount{
        color: $blue;
      }
    }

    .payment-table-header{
      padding: 0 10px;
      margin-bottom: 12px;
      display: grid;
      grid-template-columns: 134px 194px 307px 121px 1fr;
    }

    .payment-table-main{
      max-height: 336px;
      margin-bottom: 8px;
      overflow: hidden;

      .payment-info-block{
        padding: 0 10px;
        height: 48px;
        margin-bottom: 8px;
        display: grid;
        align-items: center;
        box-sizing: border-box;
        grid-template-columns: 134px 194px 307px 121px 1fr;
        background-color: $grey-scale-500;
        border-radius: 8px;

        .facade-text-base{
          color: #fff;
        }

        .payment-success-info{
          padding: 4px 8px;
          border-radius: 5px;
          background-color: rgba($red, .1);
          width: max-content;

          .facade-title-caption{
            color: $red;
          }
        }

        .success{
          background-color: rgba($green, .1);
          .facade-title-caption{
            color: $green;
          }
        }

        .icon-save{
          height: 16px;
          width: 16px;
          color: $grey-scale-200;
        }
      }
    }

    .payment-table-full{
      max-height: max-content;
    }

    .btn-open-full{
      width: 100%;
      padding: 10px 0;
      margin-bottom: 48px;
      text-align: center;
      cursor: pointer;
      border-bottom: 1px solid $grey-scale-500;

      .facade-title-sub{
        color: $blue
      }
    }

    .tariff-plan-subtitle{
      position: relative;
      padding: 8px 0;
      margin-bottom: 24px;
      display: flex;
      align-items: center;

      .facade-title-caps{
        margin-right: 11px;
      }
      .icon-info{
        height: 16px;
        color: $blue;
        cursor: pointer;
      }

      .modal-tariff-plan{
        .modal-outside{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .modal-text{
          position: absolute;
          bottom: -8px;
          left: 134px;
          transform: translateY(100%);
          padding: 15px;
          width: 380px;
          box-sizing: border-box;
          background-color: $grey-scale-700;
          border-radius: 8px;
          //font-weight: 400;
          font-size: 12px;
          line-height: 22px;
          color: $grey-scale-200;
          z-index: 2;
        }
      }
    }

    .tariff-plan-table{
      display: grid;
      grid-template-columns: 1fr repeat(5, 127px);
      grid-template-rows: 92px repeat(5, 74px) 48px;
      row-gap: 8px;

      .facade-text-base{
        color: #fff;
      }

      .facade-title-semi{
        color: $grey-scale-200;
      }

      .facade-title-base{
        color: $grey-scale-200;
      }

      .active{
        color: #fff;
      }

      .tariff-table-header{
        display: inherit;
        grid-area: 1 / 1 / 2 / -1;
        grid-template-columns: 1fr repeat(5, 127px);
        align-items: flex-end;
        justify-items: center;
        margin-bottom: 8px;

        .header-title{
          justify-self: flex-start;
          margin-bottom: 4px;
        }

        .user-amount-box{
          .top-text-group{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            margin-bottom: 9px;

            .facade-title-semi{
              margin-right: 4px;
              margin-bottom: 2px;
            }
          }

          .facade-title-caption{
            //margin-bottom: 8px;
          }

        }
      }

      .su-info{
        display: inherit;
        grid-template-columns: 1fr repeat(5, 127px);
        align-items: center;
        justify-items: center;
        background-color: $grey-scale-500;
        border-radius: 8px;

        &-0{
          grid-area: 2 / 1 / 3 / -1;
        }

        &-1{
          grid-area: 3 / 1 / 4 / -1;
        }

        &-2{
          grid-area: 4 / 1 / 5 / -1;
        }

        &-3{
          grid-area: 5 / 1 / 6 / -1;
        }

        &-4{
          grid-area: 6 / 1 / 7 / -1;
        }

        .su-position{
          padding-left: 12px;
          //height: 100%;
          box-sizing: border-box;
          justify-self: flex-start;
          display: flex;
          align-items: center;
          .color-box{
            height: 50px;
            width: 4px;
            margin-right: 13px;
            border-radius: 10px;

            &-0{
              background-color: $blue;
            }
            &-1{
              background-color: $su-level-1;
            }
            &-2{
              background-color: $su-level-2;
            }
            &-3{
              background-color: $su-level-3;
            }
            &-4{
              background-color: $su-level-4;
            }
          }

          .facade-text-base{
            width: min-content;
          }
        }
      }

      .table-footnote{
        display: flex;
        padding: 2px 8px 0 18px;
        align-items: flex-start;

        .footnote-star{
          margin-right: 3px;
          margin-top: 2px;
        }
      }

      .border-active-plan{
        position: relative;
        grid-area: 1 / 2 / -1 / 3;
        border: 2px solid $blue;
        border-radius: 8px;

        .subtitle-active{
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 17px;
          line-height: 24px;
          color: $blue;
        }
      }
    }
  }
</style>