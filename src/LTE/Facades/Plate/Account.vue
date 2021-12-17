<template>
  <div class="facade-plate-account create" :class="{'plate-account-tiny': tiny}" v-if="category === 'create-company'">
    <div class="plate-account-body">
      <div class="button-add">
        <icon-add/>
      </div>
      <text-base v-if="!tiny">Создать компанию</text-base>
    </div>
  </div>
  <div class="facade-plate-account" :class="{'plate-account-tiny': tiny}" v-else>
    <div class="plate-account-body">
      <image-avatar :logo="accountInfo.logo" :color-code="accountInfo.id"/>
      <title-sub v-if="!tiny">{{ accountInfo.name }}</title-sub>
      <div class="dropdown-box" v-if="category === 'company' && !tiny"><icon-dropdown-arrow /></div>
    </div>
  </div>
</template>

<script>
  import IconAdd from '@Icon/Add'
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleSub from '@Facade/Title/Sub'
  import TextBase from '@Facade/Text/Base'
  import IconDropdownArrow from '@Icon/DropdownArrow'

  export default {
    name: 'Facade.Plate.Account',
    props: {
      tiny: {
        type: Boolean,
        default: false
      },
      category: {
        type: String,
        required: true
      },
      data: Object,
    },
    components: {
      IconAdd,
      ImageAvatar,
      TitleSub,
      TextBase,
      IconDropdownArrow
    },
    created() {

    },
    computed: {
      accountInfo(){
        switch (this.category){
          case 'company':
            return  {
              id: String(this.data.id).substr(this.data.id.length - 1, 1),
              name: this.data.name,
              logo: this.data?.logo ? this.data.logo : this.data.name.substr(0, 1)
            }
          case 'profile':
            return {
              id: String(this.data.id).substr(this.data.id.length - 1, 1),
              name: this.data.lastname + ' ' + this.data.name,
              logo: this.data?.logo ?
                this.data.logo : this.data.lastname.substr(0, 1) + this.data.name.substr(0, 1)
            }
        }
        return {}
      }
    }

  }
</script>

<style lang="scss" scoped>
  .facade-plate-account{
    border-radius: 8px;
    box-sizing: border-box;
    background: $grey-scale-500;
    border-left: 4px solid transparent;
    .plate-account-body{
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      overflow: hidden;
      box-sizing: border-box;
      padding: 12px 12px 12px 8px;
      .button-add,
      .facade-image-avatar{
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
      .facade-title-sub,
      .facade-text-base{
        width: 100%;
        white-space: nowrap;
      }
      .dropdown-box{
        width: 16px;
        color: #fff;
      }
    }
    &.create{
      border: 1px solid $grey-scale-400;
      background: transparent;
      .plate-account-body{
        padding: 11px 11px;
        .button-add{
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $blue;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          .icon-add{
            height: 16px;
            color: #fff;
          }
        }
        .facade-text-base{
          color: $blue;
        }
      }
    }
    &.plate-account-tiny{
      .plate-account-body{
        justify-content: center;
        .button-add,
        .facade-image-avatar{
          margin-right: 0;
        }
      }
    }
  }




</style>