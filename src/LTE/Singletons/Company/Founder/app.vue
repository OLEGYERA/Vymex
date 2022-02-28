<template>
  <div class="singleton-co-founder-app">
    <navigation-close @onClick="closeCreatorCompany()"/>
    <title-base>Управление долей</title-base>
    <text-base>Здесь вы можете управлять долями своей компании</text-base>
    <input-search :placeholder="'Поиск'"/>
    <div class="layout-share">
      <share-company v-for="(v, idx) in [74, 0, 33]" :key="idx" :value="v"/>
    </div>
    <title-caps>Соучредители <span class="founder-counter">{{ coFounders.length }}</span></title-caps>
		<founder-member :coFounders="coFounders" />
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

export default {
  name: 'vx.co.founder.view',
  components: {
		TitleBase, 
		NavigationClose, 
		TextBase, 
		InputSearch, 
		ShareCompany, 
		TitleCaps, 
		FounderMember
	},
  data() {
		return {
			coFounders: [
				{name: 'Александр', lastname: 'Ким', share: 74, id: 0},
				{name: 'Виктор', lastname: 'Лещак', share: 1, id: 1},
				{name: 'Анна', lastname: 'Кучеряш', share: 5, id: 2},
				{name: 'Анатолий', lastname: 'Кукловод', share: 3, id: 3},
				{name: 'Анатолий', lastname: 'Толий', share: 0.1, id: 4}
			]
		}
	},
  methods: {
    closeCreatorCompany() {
      this.$router.push({name: 'vx'})
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