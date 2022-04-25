<template>
  <div class="confidentiality-mail-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.confidentiality'})"/>
		<title-base>E-mail</title-base>
		<div class="profile-change-box">
			<div class="content">
				<title-caption>E-mail</title-caption>
				<text-base class="mail">{{userEmail}}</text-base>
				<text-base>Здесь вы можете изменить видимость вашего e-mail</text-base>
				<title-caps>кто видит мой e-mail</title-caps>
				<div class="confiden-card" @click="mail = true">
					<text-base>Мои контакты</text-base>
					<checkbox :viewType="2" :model="mail" />
				</div>
				<div class="confiden-card" @click="mail = false">
					<text-base>Никто</text-base>
					<checkbox :viewType="2" :model="!mail" />
				</div>
				<text-base>Пользователи, которые уже знают ваш e-mail будут видеть его при просмотре вашего профиля.</text-base>
			</div>
		</div>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback';
import TitleBase from '@Facade/Title/Base';
import TitleCaption from '@Facade/Title/Caption';
import TitleCaps from '@Facade/Title/Caps'
import TextBase from '@Facade/Text/Base';
import Checkbox from "@Facade/Input/Checkbox";

import { mapGetters } from 'vuex';

export default {
	name: 'vx.setting.confidentiality.mail',
	components: {NavigationComeback, TitleBase, TitleCaption, TextBase, TitleCaps, Checkbox},
	data() {
		return {
			mail: null
		}
	},
	created() {
		this.mail = this.showEmail
	},
	beforeDestroy() {
		if (this.mail !== this.showEmail)  {
			this.$core.execViaComponent('Setting', 'emailPrivacy', Number(this.mail))
		}
	},
	computed: {
		...mapGetters({
			userEmail: 'getUserEmail',
			showEmail: 'getShowEmail'
		})
	}
}
</script>

<style lang="scss">
.confidentiality-mail-view {
	.facade-title-base {
		text-align: center;
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
    justify-content: space-between;
    padding: 26px 20px;
    background: $grey-scale-400;
		border-radius: 12px;
		cursor: pointer;
		margin-bottom: 12px;

		& .facade-text-base {
			color: white;
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
}
</style>