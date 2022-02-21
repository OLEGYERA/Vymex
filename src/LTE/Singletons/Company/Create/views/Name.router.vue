<template>
  <div class="name-router-view">
    <div class="title-box">
      <input-base :model="creator.name" placeholder="Название компании" labeled @onInput="setCreator(['name', $event])" disable-debounce/>
    </div>
    <div class="button-row">
      <button-secondary @onClick="prev()">Назад</button-secondary>
      <button-base :disable="creator.name.length === 0" @onClick="next()">Далее</button-base>
    </div>
  </div>
</template>


<script>
/*eslint-disable*/
import InputBase from '@Facade/Input/Base'
import ButtonBase from '@Facade/Button/Base'
import ButtonSecondary from '@Facade/Button/Secondary'

import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Singleton.Company.Create.Views.Name.Router',
  components: {InputBase, ButtonBase, ButtonSecondary},
  computed: {
    ...mapGetters({creator: 'Company/getCreator'})
  },
  methods: {
    ...mapMutations({setCreator: 'Company/setCreator'}),

    prev(){
      this.$emit('onPrev');
    },
    next(){
      this.$emit('onNext');
    },
  }
}
</script>

<style lang="scss" scoped>
  .name-router-view{
    .title-box{
      width: 100%;
      padding: 20px 164px 25px;
      border-radius: 16px;
      background-color: $grey-scale-500;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 32px;
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