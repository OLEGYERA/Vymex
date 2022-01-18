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
    /><input-date
      :model="birthday"
      placeholder="Дата рождения"
      @onDate="updateBirthday"
    />
  </div>
</template>

<script>
  import InputBase from '@Facade/Input/Base'
  import InputAlias from '@Facade/Input/Alias'
  import InputDate from '@Facade/Input/Date'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Container.Vx.Setting.Profile.UpdatePersonal',
    components: {
      InputBase,
      InputAlias,
      InputDate
    },
    data(){
      return {
        newName: null,
        newLastname: null,
        newAlias: null,
        newBirthdate: '1999-08-19'
      }
    },
    computed: {
      ...mapGetters({
        name: 'getUserName',
        lastname: 'getUserLastname',
        alias: 'getUserAlias',
        aliasError: 'getUserAliasError',
        birthday: 'getUserBirthday',
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
      updateBirthday(date){
        this.updateProfile('editBirthDate', date);
      }
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