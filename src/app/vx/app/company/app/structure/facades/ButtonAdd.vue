<template>
  <div class="button-add"><icon-add :size="11" />Создать единицу</div>
</template>

<script>
import IconAdd from "@Icon/Add";
export default {
	name: 'vx.structure.facade.button.add',
	components: {IconAdd}
}
</script>

<style lang="scss" scoped>
.button-add {
	color: white;
	font-size: 0.75rem;
	background: $grey-scale-500;
	border-radius: 8px;
	display: inline-flex;
	padding: 8px 16px;
	align-items: center;
	cursor: pointer;

	& .icon {
		width: 11px;
		height: 11px;
		margin-right: 10px;
	}
}
</style>