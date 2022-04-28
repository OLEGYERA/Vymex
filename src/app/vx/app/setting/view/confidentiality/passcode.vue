<template>
  <div class="confidentiality-passcode-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.confidentiality'})"/>
		<title-base>Код-пароль</title-base>
		<div v-if="getPasscode">
			<div class="profile-change-box">
				<title-caps>Пароль</title-caps>
				<plate-setting @click.native="setPasscodeActive(!passcodeActive)" buttonSwitch>
					<template #icon><icon-confidential/></template>
					<template #title>Код-пароль</template>
					<template #additional><button-switch :switchNotify="passcodeActive"/></template>
				</plate-setting>
				<plate-setting @click.native="showModal=true">
					<template #icon><icon-edit/></template>
					<template #title>Изменить пароль</template>
				</plate-setting>
				<plate-setting @click.native="autoLockModal=true">
					<template #icon><icon-clock/></template>
					<template #title>Автоблокировка</template>
					<template #additional><text-base class="time">{{autoLock.filter(t => t.time === activeAutoLock)[0].title}}</text-base></template>
				</plate-setting>
			</div>
		</div>
		<div v-else>
			<div class="profile-change-box">
				<div class="content">
					<text-base>Вы можете заблокировать полный или частичный доступ к функциям VYMEX — это гарантирует максимальный уровень защиты вашей информации, так как даже имея доступ к вашему устройству никто не сможет использовать приложение без короткого код-пароля</text-base>
				</div>
			</div>
			<div class="passcode-buttons">
				<button-base
					@onClick="showModal=true" 
					class="passcode-button" 
				>
					Настроить код-пароль
				</button-base>
			</div>
		</div>

		<modal :status="showModal" @onClose="showModal = false" :disable="!codeValid" @onOk="savePasscode()">
			<template #title>Придумайте код-пароль</template>
      <template #description>
				<codepassword @onAction="firstCode=$event" />
				<text-base>Повторите код-пароль</text-base>
				<codepassword @onAction="secondCode=$event" />
			</template>
			<template #button-accept>Применить</template>
		</modal>

		<modal :status="autoLockModal" @onClose="autoLockModal = false" @onOk="setAutoLock()">
			<template #title>Автоблокировка</template>
      <template #content>
				<radio-slot 
					lang 
					v-for="lock in autoLock" 
					:key="lock.title"
					:model="localAutoLock === lock.time" 
					@onClick="localAutoLock = lock.time"
				>
					<template #title>
						<div class="lock-checkbox">
							{{lock.title}}
						</div>
					</template>
				</radio-slot>
			</template>
			<template #button-accept>Применить</template>
		</modal>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback';
import TitleBase from '@Facade/Title/Base';
import TextBase from '@Facade/Text/Base';
import ButtonBase from "@Facade/Button/Base";
import Modal from "@Facade/Modal/Base";
import Codepassword from "@Facade/Input/Codepassword";
import TitleCaps from '@Facade/Title/Caps'
import PlateSetting from '@Facade/Plate/Setting'
import ButtonSwitch from '@Facade/Button/Switch'
import RadioSlot from '@/app/vx/app/company/app/process/facades/RadioSlot'

import { mapGetters, mapMutations } from 'vuex';

export default {
	name: 'vx.setting.confidentiality.passcode',
	components: {
		NavigationComeback, 
		TitleBase, 
		TextBase,
		ButtonBase,
		Modal,
		Codepassword,
		TitleCaps,
		PlateSetting,
		ButtonSwitch,
		RadioSlot
	},
	data() {
		return {
			showModal: false,
			firstCode: '',
			secondCode: '',
			autoLockModal: false,
			autoLock: [
				{title: 'Через 1 минуту', time: 60000},
				{title: 'Через 5 минут', time: 300000},
				{title: 'Через 15 минут', time: 900000},
				{title: 'Через 1 час', time: 3600000},
				{title: 'Через 5 часов', time: 18000000}
			],
			localAutoLock: null
		}
	},
	created() {
		this.localAutoLock = this.activeAutoLock
	},
	methods: {
		...mapMutations({
			setPasscode: 'Users/setPasscode',
			setPasscodeActive: 'Users/setPasscodeActive',
			setActiveAutoLock: 'Users/setActiveAutoLock',
			setBlockModal: 'Users/setBlockModal',
		}),
		savePasscode() {
			this.setPasscode(this.firstCode)
		},
		setAutoLock() {
			this.setActiveAutoLock(this.localAutoLock)
			this.setBlockModal(true)
			this.autoLockModal = false
			this.$notify({text: 'Изменения сохранены!', type: 'success', duration: 3000, speed: 500})
		}
	},
	computed: {
		...mapGetters({
			getPasscode: 'Users/getPasscode',
			passcodeActive: 'Users/getPasscodeActive',
			activeAutoLock: 'Users/getActiveAutoLock'
		}),
		codeValid() {
			return this.firstCode.length === 4 && this.secondCode.length
				&& this.firstCode === this.secondCode
		}
	}
}
</script>

<style lang="scss">
.confidentiality-passcode-view {
	.facade-title-base {
		text-align: center;
		margin-bottom: 36px;
	}
	.facade-title-caps {
		margin: 24px 0 12px 0;
		text-align: left;
	}
	.container-auth-code {
    margin: 0 auto;
    max-width: 230px;
		&:first-child {
			margin-bottom: 35px;
		}
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

	.passcode-buttons {
		display: flex;
		justify-content: center;
		.passcode-button {
			width: 304px;
		}
		.facade-button-base::v-deep {
			font-size: 15px;
			&[disable] {
				background-color: $grey-scale-400;
			}
		}
	}

	.facade-plate-setting {
		transition: .2s all linear;
		cursor: pointer;
		padding: 0 20px;

		&:hover{
			background-color: $grey-scale-400;
		}
	}

	.time {
		color: $blue;
	}

	.lock-checkbox {
    display: flex;
    align-items: center;
    & img {
      margin-right: 12px;
    }
  }
}
</style>