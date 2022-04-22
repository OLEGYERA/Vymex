<template>
	<div class="share" :class="{card}">
		<title-caps v-if="card">{{value}}%</title-caps>
		<title-sub v-else>{{value}}% доли</title-sub>
	</div>
</template>

<script>
import TitleSub from '@Facade/Title/Sub'
import TitleCaps from '@Facade/Title/Caps'

export default {
	name: 'Singleton.Company.Facades.Share',
	components: {TitleSub, TitleCaps},
	props: {
		value: {
			type: [Number, String],
			require: true
		},
		card: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
	.share {
		padding: 6px 14px;
		background: $grey-scale-400;
		border-radius: 50px;
		display: inline-block;

		&.card {
			padding: 0 8px;
			border-radius: 10px;
			border: 1px solid $grey-scale-300;
			background: $grey-scale-500;
		}

		.facade-title-caps {
			color: white;
		}
	}
</style>