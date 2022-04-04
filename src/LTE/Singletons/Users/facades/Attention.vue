<template>
	<div class="attention">
		<icon-info class="icon-info"/>
		<div>
			<div class="title">Внимание</div>
			<div class="text">
				Передавая часть своей доли другому человеку, вы автоматически делаете его соочредителем компании, а действие по передаче доли - необратимо
			</div>
		</div>
	</div>
</template>

<script>
import IconInfo from '@Icon/Info'

export default {
	name: 'Singleton.Facades.Attention',
	components: {IconInfo}
}
</script>

<style lang="scss" scoped>
.attention {
	background: $grey-scale-400;
	display: flex;
	padding: 12px 14px;
	border-radius: 8px;

	& .icon-info {
		color: #fff;
		margin: 3px 8px 0 0;
	}

	& .title {
		font-weight: 600;
		font-size: rem(17);
		line-height: rem(22);
		color: #fff;
	}
	& .text {
		color: #FFF;
		font-size: 0.75rem;
		line-height: 1rem;
	}
}
</style>