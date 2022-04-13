<template>
	<div class="founder-member">
		<div 
			v-for="coFounder in coFounders" 
			:key="coFounder.id" 
			class="founder-member-card"
		>
			<image-avatar
				:logo="coFounder.user.avatar || logo(coFounder)"
				:color-code="String(coFounder.user.id).substr(coFounder.id.length - 1, 1)"
			/>
			<title-sub>
				{{coFounder.user.name}} {{coFounder.user.lastname}}
			</title-sub>
			<div class="card-share">
				<share card :value="coFounder.share" />
				<title-caption>Доля в компании</title-caption>
			</div>
		</div>
	</div>
</template>

<script>
import ImageAvatar from '@Facade/Image/Avatar'
import TitleSub from '@Facade/Title/Sub'
import Share from '../facades/Share'
import TitleCaption from '@Facade/Title/Caption'

export default {
	name: 'Singleton.Company.Provides.FounderMember',
	components: {ImageAvatar, TitleSub, Share, TitleCaption},
	props: {
    coFounders: {
      type: Array,
      default: () => []
    }
  },
	methods: {
		logo(coFounder) {
			if (coFounder.user.name && coFounder.user.lastname) {
				return `${coFounder.user.name[0]}${coFounder.user.lastname[0]}`
			} else {
				return ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.founder-member {
		padding-bottom: 20px;

		&-card {
			background: $grey-scale-400;
			border-radius: 12px;
			padding: 12px;
			margin-bottom: 12px;
			display: flex;
      align-items: center;
		}
		& .card-share {
			display: flex;
			align-items: center;
			margin-left: auto;
		}
	}
	.facade-image-avatar{
		width: 40px;
		height: 40px;
	}
	.facade-title-caption {
		margin-left: 8px;
	}
	.facade-title-sub {
		margin-left: 12px;
	}
</style>