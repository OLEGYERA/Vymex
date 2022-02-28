<template>
	<div class="founder-member">
		<div 
			v-for="coFounder in coFounders" 
			:key="coFounder.id" 
			class="founder-member-card"
		>
			<image-avatar
				:logo="coFounder.avatar || (coFounder.name.substr(0, 1) + coFounder.lastname.substr(0, 1))"
				:color-code="String(coFounder.id).substr(coFounder.id.length - 1, 1)"
			/>
			<title-sub>{{`${coFounder.name} ${coFounder.lastname}`}}</title-sub>
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