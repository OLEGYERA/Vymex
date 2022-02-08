<template>
  <div class="phone-number-ui">
    <dropdown-base
      placeholder="Страна"
      :model="country"
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
        :model="country ? this.generatePhoneIdent(country) : ''"
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
    name: 'Providers.Setting.PhoneNumber.Ui',
    props: {
      status: {
        type: Boolean,
        required: true
      },
      country: {
        type: Object,
        require: null
      },
      phone: {
        type: Object,
        require: null
      },
    },
    components: {
      InputBase,
      DropdownBase,
    },
    created() {
      console.log('create')
      if(!this.countries.length) this.$core.execViaComponent('Auth', 'getCountries');
    },
    mounted() {
      console.log('mounted')
      if(!this.country.name) this.$emit('onCountry', this.countries[0]);
      this.phoneNumberModel = this.phone ? this.phone.withMask : ''; //relink vuex state on Container model
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
      }),
      filterCountriesPhoneIdent(){
        let phoneIdents = [];
        this.countries.forEach( country => phoneIdents.push(this.generatePhoneIdent(country)))
        return phoneIdents;
      },
      generateMaskPatternForPhoneLth(){
        if(this.country && this.country.phoneIth){
          let counter = 1,
            counterRange = Math.trunc(this.country.phoneIth/2),
            maskPattern = '';

          while(counter < counterRange){
            maskPattern += '##-'
            counter++
          }

          maskPattern += this.country.phoneIth % 2 === 0 ? '##' : '###'
          return maskPattern;
        }
        return null
      },
      phoneNumberCanSubmit(){
        return this.phoneNumberModel &&
          this.country?.phoneIth === this.phone.withoutMask.length && this.status !== false
      }
    },
    methods: {
      ...mapMutations(['setChooseCountry', 'setPhoneLthNumber']),
      selectCountry(selectedCountry){
        if(!this.isSimilarCountry(selectedCountry)){
          this.$emit('onCountry', selectedCountry)
          // this.setChooseCountry(selectedCountry)
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
        this.$emit('onPhone', {withMask: '', withoutMask: ''})

        // this.setPhoneLthNumber({
        //   withMask: '',
        //   withoutMask: ''
        // });
      },
      focusOnPhoneLth(){
        setTimeout(() => this.$refs['phoneNumber'].$refs['facade-input-base-ref'].focus(), 100)
      },
      isSimilarCountry(country){
        return String(this.country?.countryName) === String(country.countryName)
      },
      generatePhoneIdent(country){
        return {value: `+${country.phoneIdent}`, key: country.countryName}
      },
      monitorFillingTheMask(newPhoneLengthNumber){
        let standardPhone = newPhoneLengthNumber.replace(/-/g, '');

        this.$emit('onPhone', {withMask: newPhoneLengthNumber, withoutMask: standardPhone})


        // this.setPhoneLthNumber({
        //   withMask: newPhoneLengthNumber,
        //   withoutMask: standardPhone
        // });
      },
    },
    watch: {
      phone(lastPhoneNumber){
        if(lastPhoneNumber) this.phoneNumberModel = lastPhoneNumber.withMask
      },
      phoneNumberCanSubmit(state){
        this.$emit('onStatus', state);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phone-number-ui{
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