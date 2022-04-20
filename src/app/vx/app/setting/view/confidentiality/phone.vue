<template>
  <div class="confidentiality-phone-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.confidentiality'})"/>
		<title-base>Телефон</title-base>
		<div class="profile-change-box">
			<div class="content">
				<title-caption>Телефон</title-caption>
				<text-base class="phone">+{{userTelephone}}</text-base>
				<text-base>Здесь вы можете изменить видимость вашего номера телефона</text-base>
				<title-caps>кто видит мой телефон</title-caps>
				<div class="confiden-card" @click="phone = true">
					<text-base>Мои контакты</text-base>
					<checkbox :viewType="2" :model="phone" />
				</div>
				<div class="confiden-card" @click="phone = false">
					<text-base>Никто</text-base>
					<checkbox :viewType="2" :model="!phone" />
				</div>
				<text-base>Пользователи, которые уже знают ваш номер и сохранили его в телефонную книгу, будут видеть его при просмотре вашего профиля.</text-base>
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
	name: 'vx.setting.confidentiality.phone',
	components: {NavigationComeback, TitleBase, TitleCaption, TextBase, TitleCaps, Checkbox},
	data() {
		return {
			phone: null
		}
	},
	created() {
		this.phone = this.showPhone
	},
	beforeDestroy() {
		if (this.phone !== this.showPhone)  {
			this.$core.execViaComponent('Setting', 'phonePrivacy', Number(this.phone))
		}
	},
	computed: {
		...mapGetters({
			userTelephone: 'getUserTelephone',
			showPhone: 'getShowPhone'
		})
	}
}
</script>

<style lang="scss">
.confidentiality-phone-view {
	.facade-title-base {
		text-align: center;
		margin-bottom: 36px;
	}
	.facade-title-caps {
		margin: 24px 0 12px 0;
		text-align: left;
	}
	.phone {
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