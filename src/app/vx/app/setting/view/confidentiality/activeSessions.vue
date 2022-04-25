<template>
  <div class="confidentiality-mail-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.confidentiality'})"/>
		<title-base>Активные сеансы</title-base>
		<div class="profile-change-box">
			<text-base>Нажмите на сеанс, чтобы завершить его</text-base>
			<title-caps>это устройство</title-caps>
			<div class="confiden-card">
				<div class="setting-avatar">
					<icon-notebook />
				</div>
				<text-base>{{title}}</text-base>
				<title-caption class="">В сети</title-caption>
			</div>
		</div>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback';
import TitleBase from '@Facade/Title/Base';
import TitleCaps from '@Facade/Title/Caps'
import TextBase from '@Facade/Text/Base';
import TitleCaption from '@Facade/Title/Caption'

import { mapGetters } from 'vuex';

export default {
	name: 'vx.setting.confidentiality.active-sessions',
	components: {NavigationComeback, TitleBase, TextBase, TitleCaps, TitleCaption},
	created() {
		this.$core.execViaComponent('Setting', 'getActiveSessions')
	},
	computed: {
		...mapGetters({
			activeSessions: 'getActiveSessions'
		}),
		title() {
			return this.activeSessions.length ? this.activeSessions[0].deviceTitle : ''
		}
	}
}
</script>

<style lang="scss">
.confidentiality-mail-view {
	.facade-title-base {
		margin-bottom: 36px;
	}
	.facade-title-caps {
		margin: 24px 0 12px 0;
		text-align: left;
	}
	.mail {
		color: white;
		margin-bottom: 32px;
	}
	.content {
		max-width: 468px;
		margin: 0 auto;
	}
	.confiden-card {
		display: flex;
    padding: 16px;
    background: $grey-scale-400;
		border-radius: 12px;
		cursor: pointer;
		margin-bottom: 12px;

		& .facade-text-base {
			text-align: left;
			color: white;
		}
		& .facade-title-caption {
			color: $green;
			flex-shrink: 0;
			align-items: center;
			display: flex;
			margin-left: 10px;
		}
	}
	.profile-change-box { 
		text-align: center;
		width: 100%;
		padding: 24px 20px;
		box-sizing: border-box;
		border-radius: 16px;
		background-color: $grey-scale-500;
		margin-bottom: 36px;
	}
	.setting-avatar{
		display: flex;
		justify-content: center;
		flex-shrink: 0;
		align-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: $blue-scale-700;
		margin-right: 12px;
		.icon{
			max-height: 16px;
			color: $blue;
		}
	}
}
</style>