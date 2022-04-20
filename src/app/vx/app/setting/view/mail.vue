<template>
	<div class="setting-mail-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.profile'})"/>
		<title-base>E-mail</title-base>
		<div class="profile-change-box">
			<title-caption>E-mail</title-caption>
			<text-base class="mail">{{getUserEmail || 'Добавить Email'}}</text-base>
			<text-base>Чтобы изменить e-mail пройдите несколько простых шагов</text-base>
		</div>
		<button-base>Изменить e-mail</button-base>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback'
import TitleBase from '@Facade/Title/Base'
import TitleCaption from '@Facade/Title/Caption'
import TextBase from '@Facade/Text/Base'
import ButtonBase from "@Facade/Button/Base"
import { mapGetters } from 'vuex'

export default {
	name: 'vx.setting.mail',
	components: {NavigationComeback, TitleBase, TitleCaption, TextBase, ButtonBase},
	computed: {
		...mapGetters({
			getUserEmail: 'getUserEmail'
		})
	}
}
</script>

<style lang="scss" scoped>
.setting-mail-view {
	.facade-title-base {
		text-align: center;
		margin-bottom: 36px;
	}
	.mail {
		color: white;
		margin-bottom: 32px;
	}
	.facade-button-base{
      width: 304px;
			margin: 0 auto;
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