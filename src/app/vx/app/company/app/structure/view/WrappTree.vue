<template>
  <div class="size-toggle">
		<structure-tree :big="big" :bigLine="bigLine" :data="structure"/>
		<div class="wrapp">
			<div class="symbol" :class="{'disable': big}" @click="bigLine = 28, big = true">+</div>
			<div class="symbol" :class="{'disable': !big}" @click="bigLine = 0, big = false">-</div>
		</div>
	</div>
</template>

<script>

import StructureTree from './StructureTree'
import { mapGetters } from 'vuex'
export default {
  components: { StructureTree },
	name: 'vx.structure.WrappTree',
	data() {
		return {
			big: false,
			bigLine: 0
		}
	},
	created() {
		this.$core.execViaComponent('Company', 'getStructure', this.activeCompany.id)
	},
	computed: {
		...mapGetters({
			activeCompany: 'Company/getActiveCompany',
			structure: 'Company/getStructure'
		}),
	},
}
</script>

<style lang="scss" scoped>
.size-toggle {
	overflow: auto;
	// & .structure-wrapp:first-child {
	// 	height: 50vh;
	// }
}
.wrapp {
	background: rgba(24, 144, 255, 0.2);
	display: flex;
	padding: 12px 16px;
	border-radius: 30px;
	width: 63px;
	justify-content: space-between;
	position: fixed;
	bottom: 10px;
}
.symbol {
	border: 2px solid #1890FF;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	color: #1890FF;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 25px;
	padding-bottom: 3px;
  box-sizing: border-box;
	cursor: pointer;
	&.disable {
		color: #BAE7FF;
		border-color: #BAE7FF;
		cursor: not-allowed;
	}
}
</style>