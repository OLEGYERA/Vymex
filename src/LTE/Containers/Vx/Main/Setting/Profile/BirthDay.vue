<template>
  <div class="container-profile-birthday">
    <div class="birthday-input">

    </div>
  </div>
</template>

<script>
  import InputBase from '@Facade/Input/Base'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Container.Vx.Setting.Profile.BirthDay',
    components: {
      InputBase,
    },
    data(){
      return {
        newName: null,
        newLastname: null,
        newAlias: null
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

    }
  }
</script>

<style lang="scss" scoped>
  .container-profile-birth-day{


  }
</style>