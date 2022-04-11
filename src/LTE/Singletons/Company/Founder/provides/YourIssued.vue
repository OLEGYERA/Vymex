<template>
  <div class="share-company">
		<title-sub v-if="!share">Вы пока не выдали свою долю</title-sub>
		<title-sub v-else>Вы выдали свою долю</title-sub>
		<title-caption>{{activeCompany.name}}</title-caption>
		<div class="company-content">
			<div v-if="100 - share" class="memory-plot">
				<div class="plot"
					:style="{background: `conic-gradient(#1890FF 0% ${100 - share}%, #4A5A6A ${100 - share}% 100%)`}"></div>
			</div>
			<share :value="100 - share" />
			<text-base @click.native="routerPush" :class="{'disabled': !share}">Размыть свою долю</text-base>
		</div>
	</div>
</template>

<script>
import TitleSub from '@Facade/Title/Sub'
import TitleCaption from '@Facade/Title/Caption'
import Share from '../facades/Share'
import TextBase from '@Facade/Text/Base'
import { mapGetters } from 'vuex'

export default {
	name: 'Singleton.Company.Provides.YourIssued',
	components: {TitleSub, TitleCaption, Share, TextBase},
	computed: {
		...mapGetters({
			activeCompany: 'Company/getActiveCompany',
			share: 'Company/getShare'
		})
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
	.facade-text-base.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
}
</style>