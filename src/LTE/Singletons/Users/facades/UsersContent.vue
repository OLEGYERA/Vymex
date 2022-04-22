<template>
	<tab-view 
    :search-placeholder="'Поиск'" 
    :search-model="usersSearch"
    @onSearch="usersSearch = $event"
  >
		<template #header-add>
			<header-add v-if="!activeUser.id" :add="false">
				<template #header-title>результат поиска</template>
				<template #header-amount>{{users.length}}</template>
			</header-add>
		</template>
		<template #content>
      <div v-if="!activeUser.id">
<!--        <person -->
<!--          v-for="(user, key) in users" -->
<!--          :contact="user"-->
<!--          :key="key" -->
<!--          user-->
<!--          @click.native="setActiveUser(user)"-->
<!--        />-->
      </div>
      <router-personal v-else />
		</template>
	</tab-view>
</template>

<script>
// import Person from "@/LTE/Singletons/Messenger/facades/Person"; syswar-r3we22
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import TabView from '../../Messenger/facades/TabView';
import RouterPersonal from '../RouterPersonal';
import {mapMutations, mapGetters} from 'vuex'

export default {
	name: 'Singleton.Facades.UsersContent',
	components: {HeaderAdd, TabView, RouterPersonal},
	data() {
		return {
      usersSearch: '',
		}
	},
  computed: {
    ...mapGetters({
      activeUser: 'Users/getActiveUser',
      users: 'Users/getUsers'
    }),
  },
  methods: {
    ...mapMutations({
      setActiveUser: 'Users/setActiveUser',
    }),
  },
  watch: {
    usersSearch: {
      immediate: true,
      handler(val) {
        this.$core.execViaComponent('MsgUser', 'search', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.facade-header-add {
		margin: 20px 0 12px 0;
	}
</style>