<template>
  <div class="share-company">
		<title-sub v-if="value">Ваша доля в компании</title-sub>
		<title-sub v-else>Вы пока не выдали свою долю</title-sub>
		<title-caption>Arxel</title-caption>
		<div class="company-content">
			<div v-if="value" class="memory-plot">
				<div class="plot"
					:style="{background: `conic-gradient(#1890FF 0% ${value}%, #4A5A6A ${value}% 100%)`}"></div>
			</div>
			<share :value="value" />
			<text-base @click.native="routerPush" v-if="!value">Размыть свою долю</text-base>
		</div>
	</div>
</template>

<script>
import TitleSub from '@Facade/Title/Sub'
import TitleCaption from '@Facade/Title/Caption'
import Share from '../facades/Share'
import TextBase from '@Facade/Text/Base'

export default {
	name: 'Singleton.Company.Provides.ShareCompany',
	components: {TitleSub, TitleCaption, Share, TextBase},
	props: {
		value: {
			type: [Number, String],
			require: true,
			default: 0
		}
	},
	methods: {
		routerPush() {
			this.$root.pushOverlapRoute({name: 'vx.co.founder.blur'})
		}
	}
}
</script>

<style lang="scss" scoped>
.share-company {
	background: $grey-scale-500;
	border-radius: 12px;
	padding: 16px;
	margin-top: 20px;
	width: 44.5%;

	& .facade-title-sub {
		margin-bottom: 4px;
	}

	& .memory-plot {
		display: inherit;
		align-items: center;
		margin-right: 14px;

		.plot {
			border-radius: 50%;
			width: 44px;
			height: 44px;
		}
	}

	& .company-content {
		margin-top: 12px;
		display: flex;
		align-items: center;
	}

	& .facade-text-base {
		margin-left: auto;
		color: $blue;
		transition: .2s all linear;
		cursor: pointer;

		&:hover {
      color: #fff;
		}
	}
}
</style>