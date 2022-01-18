<template>
  <div class="container-auth-phone">
    <dropdown-base
       placeholder="Страна"
       :model="chooseCountry"
       model-observer="countryName"
       :data="countries"
       :opts="chooseCountryOpts"
       error="Страна не обнаружена"
       img
       disable-debounce
       @onSelect="selectCountry"
       @onBlur="focusOnPhoneLth"
       :disable="!status"
    />
    <div class="phone-number-group">
      <dropdown-base
        placeholder="+Код"
        :model="chooseCountry ? this.generatePhoneIdent(chooseCountry) : ''"
        model-observer="value"
        :data="filterCountriesPhoneIdent"
        :opts="phoneIdentOpts"
        error="- - -"
        mask="+####"
        disable-debounce
        @onSelect="selectPhoneIdent"
        @onBlur="focusOnPhoneLth"
        :disable="!status"
      />
      <input-base
        :model="phoneNumberModel"
        :mask="generateMaskPatternForPhoneLth"
        ref="phoneNumber"
        @onInput="monitorFillingTheMask"
        :disable="!status"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import InputBase from "@/LTE/Facades/Input/Base";
  import DropdownBase from '@Facade/Dropdown/Base'

  export default {
    name: 'Container.Auth.Phone',
    props: {
      status: {
        type: Boolean,
        required: true
      }
    },
    components: {
      InputBase,
      DropdownBase,
    },
    created() {
      if(!this.countries.length)
        this.$core.predictor
          .prepareComponentManually('auth', 'getCountries')
          .runPredictedData()
    },
    mounted() {
      this.phoneNumberModel = this.phoneLthNumber ? this.phoneLthNumber.withMask : ''; //relink vuex state on Container model
    },
    data(){
      return{
        chooseCountryOpts: {
          cell: {
            structure: [{img: 'country-logo', title: 'country-title'}, {phone: 'phone-title'}],
            position: 'between',
          },
          template: {
            img: 'img',
            title: 'countryName',
            phone: 'phoneIdent'
          }
        },
        phoneIdentOpts: {
          cell: {
            structure: [{code: 'phone-indent'}],
            height: 35,
            size: 7,
          },
          template: {code: 'value'}
        },
        phoneNumberModel: null,
      }
    },
    computed: {
      ...mapGetters({
        countries: 'getCountries',
        chooseCountry: 'getChooseCountry',
        phoneLthNumber: 'getPhoneLthNumber'
      }),
      filterCountriesPhoneIdent(){
        let phoneIdents = [];
        this.countries.forEach( country => phoneIdents.push(this.generatePhoneIdent(country)))
        return phoneIdents;
      },
      generateMaskPatternForPhoneLth(){
        if(this.chooseCountry && this.chooseCountry.phoneIth){
          let counter = 1,
            counterRange = Math.trunc(this.chooseCountry.phoneIth/2),
            maskPattern = '';

          while(counter < counterRange){
            maskPattern += '##-'
            counter++
          }

          maskPattern += this.chooseCountry.phoneIth % 2 === 0 ? '##' : '###'
          return maskPattern;
        }
        return null
      },
      phoneNumberCanSubmit(){
        return this.phoneNumberModel &&
          this.chooseCountry?.phoneIth === this.phoneLthNumber.withoutMask.length && this.status !== false
      }
    },
    methods: {
      ...mapMutations(['setChooseCountry', 'setPhoneLthNumber']),
      selectCountry(selectedCountry){
        if(!this.isSimilarCountry(selectedCountry)){
          this.setChooseCountry(selectedCountry)
          this.clearPhoneLth()
        }
      },
      selectPhoneIdent(selectedPhoneIdent){
        let selectedCountry;
        this.countries.forEach( country => {
          if(String(country.countryName) === String(selectedPhoneIdent.key))
            selectedCountry = country
        })
        this.selectCountry(selectedCountry)
      },
      clearPhoneLth(){
        this.setPhoneLthNumber({
          withMask: '',
          withoutMask: ''
        });
      },
      focusOnPhoneLth(){
        setTimeout(() => this.$refs['phoneNumber'].$refs['facade-input-base-ref'].focus(), 100)
      },
      isSimilarCountry(country){
        return String(this.chooseCountry?.countryName) === String(country.countryName)
      },
      generatePhoneIdent(country){
        return {value: `+${country.phoneIdent}`, key: country.countryName}
      },
      monitorFillingTheMask(newPhoneLengthNumber){
        let standardPhone = newPhoneLengthNumber.replace(/-/g, '');

        this.setPhoneLthNumber({
          withMask: newPhoneLengthNumber,
          withoutMask: standardPhone
        });
      },
    },
    watch: {
      phoneLthNumber(lastPhoneNumber){
        if(lastPhoneNumber) this.phoneNumberModel = lastPhoneNumber.withMask
      },
      phoneNumberCanSubmit(state){
        this.$emit('onStatus', state);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-auth-phone{
    ::v-deep {
      .facade-dropdown-base{
        margin-bottom: 16px;
        .dropdown-box{
          .facade-table-cell{
            .group-num-0{
              align-items: center;
            }
            .country-logo{
              height: rem(24);
              img{
                height: 100%;
              }
            }

            .country-title, .phone-title{
              font-weight: 400;
              font-size: rem(17);
              line-height: rem(22);
            }
            .country-title{
              margin-left: rem(12);
            }
            .phone-title{
              color: $blue;
            }
          }
        }
      }

      .phone-number-group{
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-bottom: 44px;
        .facade-dropdown-base{
          width: 72px;
          min-width: 72px;
          margin-right: 12px;
          .facade-table-cell{
            padding: 0 rem(8);
            .phone-indent{
              font-weight: 400;
              font-size: rem(15);
              line-height: rem(18);
            }
          }
        }
      }
    }

    .phone-number-label{
      margin-top: 32px;
      font-weight: 500;
      height: 20px;
      color: #fff;
      text-align: center;
    }

    .button-base{
      margin-top: 16px;
    }

  }
</style>