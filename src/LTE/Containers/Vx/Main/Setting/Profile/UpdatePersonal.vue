<template>
  <div class="container-profile-update-personal">
    <input-base
      :model="name"
      placeholder="Имя"
      labeled
      @onInput="newName = $event"
      @onBlur="updateName"
      disable-debounce
    /><input-base
      :model="lastname"
      placeholder="Фамилия"
      labeled
      @onInput="newLastname = $event"
      @onBlur="updateLastname"
      disable-debounce
    /><input-alias
      :model="alias"
      placeholder="Никнейм"
      labeled
      :validation-status="aliasError === null"
      :validation-text="aliasError || 'Имя свободно'"
      @onBlur="updateAlias"
      @onAlias="verifyAlias"
    /><dropdown-date
      :model="testDate"
      placeholder="Дата рождения"
    />
  </div>
</template>

<script>
  import InputBase from '@Facade/Input/Base'
  import InputAlias from '@Facade/Input/Alias'
  import DropdownDate from '@Facade/Dropdown/Date'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Container.Vx.Setting.Profile.UpdatePersonal',
    components: {
      InputBase,
      InputAlias,
      DropdownDate
    },
    data(){
      return {
        newName: null,
        newLastname: null,
        newAlias: null,
        testDate: '12.12.1920'
      }
    },
    computed: {
      ...mapGetters({
        name: 'getUserName',
        lastname: 'getUserLastname',
        alias: 'getUserAlias',
        aliasError: 'getUserAliasError',

      })
    },
    methods: {
      updateProfile(method, data){
        this.$engine.Predictor
          .prepareComponentManually('setting', method, data)
          .runPredictedData()
      },
      updateName(){
        if(this.newName) this.updateProfile('editName',this.newName);
      },
      updateLastname(){
        if(this.newLastname) this.updateProfile('editLastname',this.newLastname);
      },
      updateAlias(){
        if(this.newAlias && this.aliasError === null) this.updateProfile('editAlias', this.newAlias);
      },
      verifyAlias(alias){
        this.newAlias = alias
        this.$engine.Predictor
          .prepareComponentManually('setting', 'checkAlias', alias)
          .runPredictedData();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container-profile-update-personal{
    .facade-input-base{
      margin-bottom: 16px;
    }
    .facade-input-date{
      margin: 16px 0;
    }

  }
</style>