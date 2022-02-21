<template>
  <div class="finish-router-view">
    <div class="finish-company-box">
      <upload-avatar-ui
        :avatar="{logo: companyLogo, colorCode: '4'}"
        :size-warning="{warning: 'JPG or PNG. Max size of 4MB', maxSize: 4, allowedTypes: '.jpg,.jpeg,.png'}"
        @onUploadFile="handleNewAvatarFile"
      />
      <div class="company-input-fields">
        <input-base :model="creator.link" placeholder="Сайт или страница в соц.сетях" labeled @onInput="setCreator(['link', $event])" disable-debounce/>
        <phone-number-ui :country="creator.country" :phone="creator.phone" :status="true"
                         @onCountry="setCreator(['country', $event])"
                         @onPhone="setCreator(['phone', $event])"
                         @onStatus="isPhoneNumberReady = !$event"/>
        <input-base :model="creator.city" placeholder="Город" labeled @onInput="setCreator(['city', $event])" disable-debounce/>
        <input-base :model="creator.street" placeholder="Улица" labeled @onInput="setCreator(['street', $event])" disable-debounce/>
        <div class="address-group">
          <input-base :model="creator.house" placeholder="Дом" labeled @onInput="setCreator(['house', $event])" disable-debounce/>
          <input-base :model="creator.apartment" placeholder="Квартира" labeled @onInput="setCreator(['apartment', $event])" disable-debounce/>
          <input-base :model="creator.office" placeholder="Офис" labeled @onInput="setCreator(['office', $event])" disable-debounce/>
        </div>
        <input-area :model="creator.about" placeholder="О компании" labeled :bound="1000" @onArae="setCreator(['about', $event])" disable-debounce/>
      </div>
    </div>
    <div class="button-row">
      <button-secondary @onClick="$emit('onPrev')">Назад</button-secondary>
      <button-base :disable="isPhoneNumberReady || !avatarReady" @onClick="createCo()">Создать компанию</button-base>
    </div>
  </div>
</template>


<script>
/*eslint-disable*/
  import {UploadAvatarUi, PhoneNumberUi} from '@Providers'


  import InputBase from '@Facade/Input/Base'
  import InputArea from '@Facade/Input/Area'
  import ButtonBase from '@Facade/Button/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'

  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'Singleton.Company.Create.Views.Finish.Router',
    components: {UploadAvatarUi, PhoneNumberUi, InputBase, InputArea,  ButtonBase, ButtonSecondary},
    data: () => ({
      isPhoneNumberReady: false,
      avatarReady: true
    }),
    computed: {
      ...mapGetters({companyLogo: 'Company/getCreatorLogo', creator: 'Company/getCreator'})
    },
    methods: {
      ...mapMutations({
        setCreator: 'Company/setCreator',
        clearCreator: 'Company/clear',
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
        setTimeout(() => this.clearCreator(), 0);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .finish-router-view{
    .finish-company-box{
      width: 100%;
      padding: 20px 164px 25px;
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
          margin-bottom: 16px;
        }
        .phone-number-ui ::v-deep{
          .phone-number-group{
            margin-bottom: 0;
          }
        }
        .address-group{
          display: flex;
          justify-content: space-between;
          .facade-input-base{
            width: 31%;
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