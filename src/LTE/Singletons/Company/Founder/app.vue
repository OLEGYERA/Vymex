<template>
  <div class="singleton-co-founder-app">
    <navigation-close @onClick="closeCreatorCompany()"/>
    <title-base>Управление долей</title-base>
    <text-base>Здесь вы можете управлять долями своей компании</text-base>
    <input-search 
      :placeholder="'Поиск'" 
      :model="usersSearch"
      @onSearch="usersSearch = $event"
      @onFocus="searchParams()"
      @onBlur="focusSearch = false"
    />
    <div v-if="focusSearch || usersSearch">
      <title-caps>Результаты поиска <span class="founder-counter">{{focusSearch.length}}</span></title-caps>
      <img v-if="loadingSearch" src="@/assets/img/preloader.gif" alt="loading...">
      <founder-member v-else :coFounders="searchRes" />
    </div>
    <div v-else>
      <div class="layout-share">
        <share-company />
        <your-issued />
      </div>
      <div v-if="issuedShares.length">
        <title-caps>Вы выдали доли <span class="founder-counter">{{issuedShares.length}}</span></title-caps>
        <img v-if="loadingShares" src="@/assets/img/preloader.gif" alt="loading...">
        <founder-member v-else :coFounders="issuedShares" />
      </div>
      <title-caps>Соучредители <span class="founder-counter">{{ cofounders.length }}</span></title-caps>
      <img v-if="loadingCofounders" src="@/assets/img/preloader.gif" alt="loading...">
      <founder-member v-else :coFounders="cofounders" />
    </div>
  </div>
</template>

<script>
import NavigationClose from '@Facade/Navigation/Close'
import TitleBase from '@Facade/Title/Base'
import TextBase from '@Facade/Text/Base'
import InputSearch from "@Facade/Input/Search";
import ShareCompany from './provides/ShareCompany';
import TitleCaps from '@Facade/Title/Caps'
import FounderMember from './provides/FounderMember';
import { mapGetters, mapMutations } from 'vuex';
import YourIssued from './provides/YourIssued';

export default {
  name: 'vx.co.founder.view',
  components: {
		TitleBase, 
		NavigationClose, 
		TextBase, 
		InputSearch, 
		ShareCompany, 
		TitleCaps, 
		FounderMember,
    YourIssued
	},
  data() {
    return {
      usersSearch: '',
      focusSearch: false
    }
  },
  created() {
    this.$core.execViaComponent('Cofounders', 'getCofounders', this.activeCompany.id)
    this.$core.execViaComponent('Cofounders', 'getShareHistory', this.activeCompany.id)
  },
  computed: {
    ...mapGetters({
      issuedShares: 'Users/getIssuedShares',
      cofounders: 'Users/getCofounders',
      activeCompany: 'Company/getActiveCompany',
      searchRes: 'Users/getSearch',
      loadingShares: 'Users/getLoadingShares',
      loadingCofounders: 'Users/getLoadingCofounders',
      loadingSearch: 'Users/getLoadingSearch'
    }),
  },
  methods: {
    ...mapMutations({
      setLoadingShares: 'Users/setLoadingShares',
      setLoadingCofounders: 'Users/setLoadingCofounders',
      setLoadingSearch: 'Users/setLoadingSearch'
    }),
    closeCreatorCompany() {
      this.$router.push({name: 'vx'})
    },
    searchParams() {
      this.setLoadingSearch(true)
      this.$core.execViaComponent('Cofounders', 'search', [this.activeCompany.id, ''])
      this.focusSearch = true
    }
  },
  watch: {
    'activeCompany.id': {
      immediate: true,
      handler(val) {
        this.setLoadingShares(true)
        this.setLoadingCofounders(true)

        this.$core.execViaComponent('Cofounders', 'getCofounders', val)
        this.$core.execViaComponent('Cofounders', 'getShareHistory', val)

        this.usersSearch = '';
      }
    },
    usersSearch(val) {
      this.$core.execViaComponent('Cofounders', 'search', [this.activeCompany.id, val])
    }
  }
}
</script>

<style lang="scss" scoped>
.singleton-co-founder-app {
  padding: 0 15px;
  max-width: 795px;
  margin: 10px auto;

  & .facade-title-base {
    margin-bottom: 12px;
  }

  & .facade-text-base {
    margin-bottom: 20px;
  }

  & .layout-share {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .founder-counter {
    color: $blue;
  }

  .facade-title-caps {
    margin: 35px 0 20px 0;
  }
}
</style>