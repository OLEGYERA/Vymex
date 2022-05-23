<template>
	<div class="structure-main-view">
		<navigation-close @onClick="$router.go(-1)"/>
		<div class="header">
			<title-base>Структура</title-base>
			<text-base>Тут отображаеться структура вашей компании</text-base>
		</div>
		<navigation-tabs 
			class="profile-career-navigation"
			:tabs="[{title: 'Список'},{title: 'Связи'},{title: 'Команда', count: companyTeam.length}]" 
			:current-tab="currentNavigationTab" 
			@onTab="currentNavigationTab = $event"
		>
			<template #options><button-add @click.native="$router.push({name: 'vx.structure.createUnit'})" /></template>
			<template #tab-content-0>
				<structure-table />
			</template>
			<template #tab-content-1>
				<wrapp-tree />
			</template>
			<template #tab-content-2>
				<div class="team" v-for="worker in companyTeam" :key="worker.id">
					<person structure :contact="worker" @click.native="show(worker)" />
				</div>
			</template>
		</navigation-tabs>
		<worker-info />
	</div>
</template>

<script>
import NavigationClose from '@Facade/Navigation/Close'
import TitleBase from '@Facade/Title/Base'
import TextBase from '@Facade/Text/Base'
import NavigationTabs from '@Facade/Navigation/Tabs'
import ButtonAdd from '../facades/ButtonAdd'
import StructureTable from './StructureTable'
import WrappTree from './WrappTree'
import Person from '@/LTE/Singletons/Messenger/facades/Person'
import { mapGetters, mapMutations } from 'vuex'
import WorkerInfo from '../singleton/WorkerInfo'

export default {
	name: 'vx.structure.main',
	components: {
		NavigationClose, 
		TitleBase, 
		TextBase, 
		NavigationTabs, 
		ButtonAdd, 
		StructureTable,
		WrappTree,
		Person,
		WorkerInfo
	},
	data: () => ({
		currentNavigationTab: 0,
	}),
	created() {
		this.$core.execViaComponent('Company', 'getCompanyTeam', this.activeCompany.id)
	},
	computed: {
		...mapGetters({
			activeCompany: 'Company/getActiveCompany',
			companyTeam: 'Company/getCompanyTeam'
		}),
	},
	methods: {
		...mapMutations({
			setUnits: 'Company/setUnits'
		}),
		show(worker) {
			this.$core.execViaComponent('Company', 'getUserInfo', {userId: worker.id, companyId: this.activeCompany.id} )
			this.setUnits(worker.units)
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	& .facade-title-base {
		margin-bottom: 12px;
	}
}
.button-add {
	margin-left: auto;
}
</style>