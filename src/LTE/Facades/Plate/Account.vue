<template>
  <div class="facade-plate-account create" :class="{'plate-account-tiny': tiny}"
       v-if="category === 'create-company'" @click="$root.pushOverlapRoute({name: 'vx.co.create'})">
    <div class="plate-account-body">
      <div class="button-add">
        <icon-add/>
      </div>
      <text-base v-if="!tiny">Создать компанию</text-base>
    </div>
  </div>
  <div class="facade-plate-account" :class="{'plate-account-tiny': tiny, 'active': active}" v-else>
    <div class="plate-account-body" @click="$emit('is-open', isOpen)">
      <image-avatar :logo="accountInfo.logo" :color-code="accountInfo.colorId"/>
      <title-sub v-if="!tiny">{{ accountInfo.name }}</title-sub>
      <div class="dropdown-box" v-if="category === 'company' && !tiny" :turned="isOpen">
        <icon-dropdown-arrow />
      </div>
    </div>
    <div class="plate-account-content" v-show="isOpen">
      <level-ui 
        v-for="l in ['co-founder', 'one', 'two', 'four']" 
        :key="l" 
        :level="l"
        :tiny="tiny"
        @click.native="routerPush(l)"
      />
    </div>
  </div>
</template>

<script>
  import IconAdd from '@Icon/Add'
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleSub from '@Facade/Title/Sub'
  import TextBase from '@Facade/Text/Base'
  import IconDropdownArrow from '@Icon/DropdownArrow'
  import {LevelUi} from '@Providers'

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
      active: Boolean,
      router: Object,
      isOpen: Boolean
    },
    components: {
      IconAdd,
      ImageAvatar,
      TitleSub,
      TextBase,
      IconDropdownArrow,
      LevelUi
    },
    created() {

    },
    computed: {
      accountInfo(){
        //все костыль нужно переделывать
        switch (this.category){
          case 'company':
            return  {
              colorId: this.$core.traits.ImageColorCode(this.data.id),
              name: this.data.name,
              logo: this.data?.logo ? this.data.logo : this.data.name.substr(0, 1)
            }
          case 'profile':
            return {
              colorId: this.data.colorCode,
              name: this.data.name + ' ' + this.data.lastname,
              logo: this.data.logo
            }
        }
        return {}
      }
    },
    methods: {
      routerPush(level) {
        if (level === 'co-founder') {
          this.$router.push({name: 'vx.co.founder'}).catch(() => {})
        } else {
          this.$router.push(this.router).catch(() => {})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-plate-account{
    border-radius: 8px;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-left: 4px solid transparent;
    transition: .2s all linear;
    .plate-account-body{
      cursor: pointer;
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
        &[turned]{
          transform: rotate(180deg);
        }
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
          transition: .2s all linear;
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

    &:hover{
      background-color: $grey-scale-400;
      &.create{
        .plate-account-body{
          .facade-text-base{
            color: #fff;
          }
        }
      }
    }

    &.active{
      cursor: default;
      border-color: $blue;
      background-color: $grey-scale-500;
    }
    & .plate-account-content {
      padding: 0 12px 12px 8px;
      cursor: default;
    }
  }




</style>