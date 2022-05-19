<template>
  <div class="company-info-edit-view">
    <div class="navigation-buttons">
      <navigation-comeback @onClick="$router.push({name: 'vx.co.control-center.company-info'})"/>
      <navigation-close/>
    </div>

    <title-base>Редактировать</title-base>

    <div class="finish-company-box">
      <upload-avatar-ui
          :avatar="{logo: companyLogo, colorCode: $core.traits.ImageColorCode(companyDetails.base.id)}"
          :size-warning="{warning: 'JPG or PNG. Max size of 4MB', maxSize: 4, allowedTypes: '.jpg,.jpeg,.png'}"
          @onUploadFile="handleNewAvatarFile"
      />
      <div class="company-input-fields">
        <input-base :model="companyDetails.base.name" placeholder="Имя компании" labeled/>
        <input-base :model="companyDetails.base.siteUrl" placeholder="Сайт или страница в соц.сетях" labeled @onInput="setCreator(['siteUrl', $event])" disable-debounce/>
        <input-base :model="companyDetails.base.city" placeholder="Город" labeled @onInput="setCreator(['city', $event])" disable-debounce/>
        <phone-number-ui :country="{phoneIdent: companyDetails.base.countryCode, countryName: companyDetails.base.country}" :phone="{withMask: companyDetails.base.tel}" :status="true"
                         @onCountry="setCreator(['country', $event])"
                         @onPhone="setCreator(['phone', $event])"
                         @onStatus="isPhoneNumberReady = !$event"/>
        <input-base :model="companyDetails.base.street" placeholder="Улица" labeled @onInput="setCreator(['street', $event])" disable-debounce/>
        <div class="address-group">
          <input-base :model="companyDetails.base.house" placeholder="Дом" labeled @onInput="setCreator(['house', $event])" disable-debounce/>
          <input-base :model="companyDetails.base.apartment" placeholder="Квартира" labeled @onInput="setCreator(['apartment', $event])" disable-debounce/>
          <input-base :model="companyDetails.base.office" placeholder="Офис" labeled @onInput="setCreator(['office', $event])" disable-debounce/>
        </div>
        <input-textarea :model="companyDetails.base.about" :max-length="1000" placeholder="О компании" labeled @onInput="setCreator(['about', $event])"/>

      </div>
    </div>
    <div class="button-row">
      <button-secondary @onClick="$router.push({name: 'vx.co.control-center.company-info'})">Назад</button-secondary>
      <button-base @onClick="$router.push({name: 'vx.co.control-center.company-info'})">Сохранить</button-base>
    </div>
  </div>
</template>


<script>
  /*eslint-disable*/
  import {UploadAvatarUi, PhoneNumberUi} from '@Providers'

  import NavigationComeback from '@Facade/Navigation/Comeback'
  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import InputTextarea from "@Facade/Input/TextArea"


  import InputBase from '@Facade/Input/Base'
  import ButtonBase from '@Facade/Button/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'

  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'vx.co.control-center.company-edit',
    components: {UploadAvatarUi, PhoneNumberUi, InputBase, ButtonBase,
      ButtonSecondary, NavigationComeback, NavigationClose, TitleBase, InputTextarea},
    data: () => ({
      isPhoneNumberReady: false,
      avatarReady: true
    }),
    mounted() {
      console.log(this.companyDetails, 'companyDetails')
    },
    computed: {
      ...mapGetters({companyLogo: 'Company/getCreatorLogo', companyDetails: 'Company/getCurrentCompany'})
    },
    methods: {
      ...mapMutations({
        setCreator: 'Company/setCreator',
        // clearCreator: 'Company/clear',
      }),
      async handleNewAvatarFile(avatarFile){
        const avatarNewFile = new File([avatarFile.result], `${avatarFile.name}.png`, {type:"image/png", lastModified:new Date()});
        this.avatarReady = false;
        this.$core.execViaComponent('Uploader', 'init',[
          avatarNewFile,
          this.handleUploadOnprogress, null,
          this.handleUploaderOnload
        ])
      },
      handleUploadOnprogress(progress){
        console.log(progress)
      },
      handleUploaderOnload(fileId){
        this.setCreator(['logo', fileId])
        this.avatarReady = true;
      },
      createCo(){
        this.$core.execViaComponent('Company', 'create');
        // for (let i=0; i<5000; i++) {
        //   console.log('Тест создания: ' + i);
        //   this.$core.execViaComponent('Company', 'create');
        // }
        this.$root.clearOverlapRoute();
        this.$router.push({name: 'vx'});
      },
    }
  }
</script>

<style lang="scss" scoped>
.company-info-edit-view{
  .navigation-buttons{
    display: flex;
    justify-content: space-between;
  }

  .facade-title-base{
    text-align: center;
    margin-bottom: 36px;
  }
  .finish-company-box{
    width: 100%;
    padding: 50px 164px 48px;
    border-radius: 16px;
    background-color: $grey-scale-500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 32px;
    .company-input-fields{
      width: 100%;
      .facade-input-base{
        margin-bottom: 24px;
        border-bottom-width: 1px;
      }
      .phone-number-ui ::v-deep{
        margin-bottom: 8px;
        .phone-number-group{
          border-bottom-width: 1px;
          margin-bottom: 0;
        }
        .facade-input-base{
          border-bottom-width: 1px;
        }
      }
      .address-group{
        display: flex;
        justify-content: space-between;
        .facade-input-base{
          width: 31%;
        }
      }
      .facade-input-text-area::v-deep{
        .textarea-container{
          border-bottom-width: 1px;
        }
      }
    }
  }

  .button-row{
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    .facade-button-secondary, .facade-button-base{
      width: 220px;
    }
  }
}
</style>