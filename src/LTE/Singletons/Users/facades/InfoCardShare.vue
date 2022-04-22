<template>
	<div class="attention">
		<div class="left">
			<icon-process class="icon"/>
			<title-caption>Начисление доли</title-caption>
		</div>
		<div class="share">{{share}}%</div>
	</div>
</template>

<script>
import IconProcess from '@Icon/Process'
import TitleCaption from '@Facade/Title/Caption'

export default {
	name: 'Singleton.Facades.InfoCardShare',
	components: {IconProcess, TitleCaption},
	props: {
		share: {
			type: [Number, String],
			default: 0
		}
	}
}
</script>

<style lang="scss" scoped>
.attention {
	background: $grey-scale-400;
	padding: 14px 16px;
	border-radius: 12px;
	display: flex;
	justify-content: space-between;

	& .icon {
		margin-right: 8px;
	}

	& .left {
		display: flex;
		align-items: center;
	}

	& .share {
		color: #fff;
		font-weight: 600;
		font-size: rem(17);
		line-height: rem(22);
		background: $grey-scale-500;
		border-radius: 14px;
		padding: 4px 12px;
	}
}
</style>