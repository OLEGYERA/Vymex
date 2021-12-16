<template>
  <div class="container-auth-phone">
    <input-base
      placeholder="Страна"
      :img="chooseCountry ? chooseCountry.img : ''"
      :input-model="chooseCountry ? chooseCountry.countryName : ''"
      @onTouch="modalTableStatus=true"
      touch
    />
    <modal-table search :status="modalTableStatus" @onCLose="modalTableStatus = false"
                 @onSearchTable="modalTableSearchModel = $event">
      <template #table-header-title>Выберите страну</template>
      <template #table-cells>
        <modal-table-cell
          :group="[{img: 'country-logo', title: 'country-title'}, {phone: 'phone-title'}]"
          :position="'between'"
          @click.native="selectCountry(country)"
          :class="{active: isSimilarCountry(country)}"
          v-for="(country, keyCountry) in filterCountries"
          :key="keyCountry"
        >
          <template #img><img :src="country.img" :alt="country.countryName"></template>
          <template #title>{{ country.countryName }}</template>
          <template #phone>+{{ country.phoneIdent }}</template>
        </modal-table-cell>
      </template>
    </modal-table>

    <div class="phone-number-group">
      <input-selectable
        placeholder="+"
        :selectable-items="filterCountriesPhoneIdent"
        :selectable-item="chooseCountry ? this.generatePhoneIdent(chooseCountry) : ''"
        @onSelect="selectPhoneIdent"
        @onBlur="focusOnPhoneLth"
      />
      <input-base
        :input-model="phoneLthNumber ? phoneLthNumber.withMask : ''"
        :input-focus="phoneLengthFocusToggle"
        :mask-pattern="generateMaskPatternForPhoneLth"
        @onInput="monitorFillingTheMask"
      />
    </div>

    <div class="phone-number-label">
      {{label}}
    </div>

    <button-base
      :status="phoneNumberCanSubmit"
      @onClick="$emit('onAction')"
    >
      Получить код
    </button-base>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import InputBase from '@/components/input/base'
import InputSelectable from '@/components/input/selectable'
import ModalTable from '@/components/modal/table'
import ModalTableCell from '@/components/modal/table-cell'
import ButtonBase from '@/components/button/base'

export default {
  name: 'Container.Auth.Phone',
  props: {
    label: String,
    status: Boolean,
  },
  components: {
    InputBase,
    InputSelectable,
    ModalTable,
    ModalTableCell,
    ButtonBase,
  },
  created() {
    if(!this.countries.length)
      this.$engine.Predictor
        .prepareComponentManually('auth', 'getCountries')
        .runPredictedData()
  },
  data(){
    return{
      modalTableStatus: false,
      modalTableSearchModel: null,
      phoneLengthFocusToggle: false,
    }
  },
  computed: {
    ...mapGetters({
      countries: 'getCountries',
      chooseCountry: 'getChooseCountry',
      phoneLthNumber: 'getPhoneLthNumber'
    }),
    filterCountries(){
      if(this.modalTableSearchModel) {
        return this.countries.filter((country)=>{
          return country.countryName.toLowerCase().includes(this.modalTableSearchModel.toLowerCase())
        })
      } else{
        return this.countries;
      }
    },
    filterCountriesPhoneIdent(){
      let phoneIdents = [];
      this.countries.forEach( country => phoneIdents.push(this.generatePhoneIdent(country)))
      return phoneIdents
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
      return this.chooseCountry?.phoneIth === this.phoneLthNumber.withoutMask.length && this.status !== false
    }
  },
  methods: {
    ...mapMutations(['setChooseCountry', 'setPhoneLthNumber']),
    selectCountry(selectedCountry){
      if(!this.isSimilarCountry(selectedCountry)){
        this.setChooseCountry(selectedCountry)
        this.clearPhoneLth()
      }

      this.modalTableStatus = false

      this.focusOnPhoneLth()
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
      this.phoneLengthFocusToggle = !this.phoneLengthFocusToggle;
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container-auth-phone{
  ::v-deep .input-base{
    margin-top: 16px;
    img{
      width: 28px;
      height: 28px;
    }
  }

  ::v-deep .modal-table-cell{
    .country-logo{
      width: 36px;
      height: 36px;
      margin-right: 22px;
      img{
        width: 100%;
      }
    }

    .country-title,
    .phone-title{
      color: #fff;
      font-size: 20px;
      line-height: 24px;
      font-weight: 500;
    }

    .phone-title{
      color: $blue;
    }
  }

  .phone-number-group{
    display: flex;
    justify-content: space-between;
    align-content: center;
    .input-selectable{
      width: 80px;
      margin-right: 12px;
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