<template>
  <div class="facade-plate-account create" v-if="category === 'create-company'"
       :class="{'plate-account-tiny': tiny}" @click="$root.pushOverlapRoute({name: 'vx.co.create'})">
    <div class="plate-account-body">
      <div class="button-add">
        <icon-add/>
      </div>
      <text-base v-if="!tiny">Создать компанию</text-base>
    </div>
  </div>
  <div class="facade-plate-account" :class="[category, {'plate-account-tiny': tiny, 'active': activeAccount}]" v-else>
    <div class="plate-account-body" @click="plateAction">
      <image-avatar :logo="renderLogo" :color-code="this.$core.traits.ImageColorCode(this.data.id)"/>
      <title-sub v-if="!tiny">{{ data.name }}</title-sub>
      <div class="dropdown-box" v-if="category === 'company' && !tiny" :turned="showWorkers">
        <icon-dropdown-arrow/>
      </div>
    </div>
    <div class="plate-account-content" v-if="category === 'company'" v-show="showWorkers">
      <unit-position-ui v-for="worker in userWorkers" :key="worker.unitId"
                        :data="worker" :tiny="tiny"
                        :active="getSelectedCompany.companyId === data.id && getSelectedCompany.workerId === worker.id"
                        @click.native="selectWorker(data.id, worker)"
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
  import {UnitPositionUi} from '@Providers'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Facade.Plate.Account',
    components: {
      IconAdd,
      ImageAvatar,
      TitleSub,
      TextBase,
      IconDropdownArrow,
      UnitPositionUi
    },
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
    },
    mounted() {
      //нужно переделать под авто определение типа аккаунта
      if(this.category === 'company'){
        this.userWorkers = this.$core.traits.UserCompanyWorkers(this.data);

        if(this.getSelectedCompany.companyId === this.data.id) {
          this.activeAccount = true;
          this.showWorkers = true;
        }
      }

      if(this.category === 'profile'){
        if(this.$route.name === 'vx' || ['vx.setting'].some(route => this.$route.name.indexOf(route) !== -1)){
          this.activeAccount = true;
        }
      }
    },
    data: () => ({
      userWorkers: [],
      activeAccount: false,
      showWorkers: false
    }),
    computed: {
      ...mapGetters({
        openCompany: 'getOpenCompany',
        getSelectedCompany: 'Company/getSelectedCompany'
      }),

      /**
       * Specifies data for the logo for the tile - initials or image
       *
       * @returns {String} logo
       */
      renderLogo(){
        switch (this.category){
          case 'company':
            return this.data?.logo ? this.data.logo : this.data.name.substr(0, 1);
          case 'profile':
            return this.data.logo;
        }
      },
    },
    methods: {
      ...mapMutations({
        setSelectedCompany: 'Company/setSelectedCompany'
      }),

      /**
       * @if category === 'company' Show/Close the list of workers on the company tile
       *
       * @if category === 'profile' Redirect on profile page
       *
       * @returns void
       */
      plateAction(){
        if(this.category === 'company'){
          this.showWorkers = !this.showWorkers;
        }

        if(this.category === 'profile'){
          this.$router.push({name: 'vx'}).catch(() => {})
        }
      },

      /**
       * Sets the selected worker with a specific company for further interaction
       * with them through the vuex {Company/SelectedCompany}
       *
       * @param {Number} companyId
       * @param {Object} workerData
       *
       * @returns void
       */
      selectWorker(companyId, workerData) {
        this.setSelectedCompany({
          companyId: companyId,
          workerId: workerData.id,
          unitId: workerData.unitId,
          unitLevel: workerData.unitLevel
        })

        if(workerData.unitLevel === 0){
          this.$router.push({name: 'vx.co.founder', params: {companyID: companyId}}).catch(() => {})
        } else {
          this.$router.push({name: 'vx.co', params: {companyID: companyId}}).catch(() => {})
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
      &.profile{
        background-color: $grey-scale-400;
      }
      &.create{
        background-color: $grey-scale-400;
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
    .plate-account-content {
      padding: 0 12px 12px 8px;
      cursor: default;
    }
  }




</style>