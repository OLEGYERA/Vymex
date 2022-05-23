<template>
  <div class="confidentiality-change-password-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.confidentiality'})"/>
		<title-base>Изменить пароль</title-base>
		<div class="profile-change-box">
			<div class="content">
				<text-base>При изменении пароля, для продолжения работы на других устройствах, нужно будет ввести новый пароль</text-base>
				<auth-passwords
					change
					@onAction="setPassword($event ? $event : null)"
				/>
			</div>
		</div>
		<div class="change-password-buttons">
			<button-secondary 
				class="change-password-button" 
				@onClick="$router.push({name: 'vx.setting.confidentiality'})"
			>
				Отмена
			</button-secondary>
			<button-base
				@onClick="submit()" 
				class="change-password-button" 
				:disable="disable"
			>
				Изменить пароль
			</button-base>
		</div>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback';
import TitleBase from '@Facade/Title/Base';
import AuthPasswords from "@Container/Auth/Passwords"
import TextBase from '@Facade/Text/Base';
import ButtonSecondary from "@Facade/Button/Secondary"
import ButtonBase from "@Facade/Button/Base"

export default {
	name: 'vx.setting.confidentiality.change-password',
	components: {
		NavigationComeback, 
		TitleBase, 
		TextBase, 
		AuthPasswords, 
		ButtonSecondary,
		ButtonBase
	},
	data() {
		return {
			disable: true,
			newPassword: ''
		}
	},
	methods: {
		setPassword(event) {
			this.newPassword = event
			event ? this.disable = false 
				: this.disable = true 
		},
		submit() {
			this.$core.execViaComponent('Setting', 'editPassword', this.newPassword)
			this.$router.push({name: 'vx.setting.confidentiality'})
		}
	}
}
</script>

<style lang="scss">
.confidentiality-change-password-view {
	.facade-title-base {
		text-align: center;
		margin-bottom: 36px;
	}
	.facade-title-caps {
		margin: 24px 0 12px 0;
		text-align: left;
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
		padding: 24px 20px 60px;
		box-sizing: border-box;
		border-radius: 16px;
		background-color: $grey-scale-500;
		margin-bottom: 36px;
	}

	.change-password-buttons {
      display: flex;
      justify-content: space-between;
      .change-password-button {
        width: 222px;
      }
      .facade-button-base::v-deep {
        font-size: 15px;
        &[disable] {
          background-color: $grey-scale-400;
        }
      }
    }
}
</style>