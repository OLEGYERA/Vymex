<template>
	<div class="setting-phone-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting.profile'})"/>
		<title-base>
			{{phase2 ? 'Изменить телефон' : 'Телефон'}}
		</title-base>
		<div v-if="!Object.keys(changePhone).length">
			<div v-if="phase2" class="profile-change-box">
				<auth-phone :status="!isClientBlocking" @onStatus="isStatusPhone = $event" />
			</div>
			<div v-else class="profile-change-box">
				<title-caption>Телефон</title-caption>
				<text-base class="phone">+{{userTelephone}}</text-base>
				<text-base>В целях безопасности изменения вступят в силу через 7 дней</text-base>
			</div>
			<button-base v-if="phase2" @onClick="newNumber()">
				Отправить код
			</button-base>
			<button-base v-else @onClick="changeNumber()">
				Изменить номер
			</button-base>
		</div>
		
		<div v-else class="profile-change-box" >
			<title-caption>Текущий телефон</title-caption>
			<text-base class="phone">{{changePhone.oldPhone}}</text-base>
			<title-caption>Новый телефон</title-caption>
			<text-base class="phone">{{phoneIdent.phoneIdent}}{{changePhone.newPhone}}</text-base>
			<text-base>В целях безопасности изменения вступят в силу через: </text-base>
			<countdown-timer :time="changePhone.time" />
			<text-base class="cancel" @click.native="cancelEditPhone()">Отменить изменения</text-base>
		</div>
		
		<modal :status="showModal" @onClose="showModal = false" @onOk="sendApproveCodeData" :disable="disable">
			<template #title>Введите код</template>
			<template #description>Мы отправили код на номер +{{phoneIdent.phoneIdent}} {{phoneLth.withMask.replace(/-/g, ' ')}}</template>
			<template #content>
				<auth-code :status="approveCodeStatus" @onAction="getCode" />
				<div class="label-box">
					<text-label v-if="resendCodeTime !== null">Отправить повторно через <countdown-timer :time="resendCodeTime" @onExpired="resendCodeTime = null"/></text-label>
					<text-label v-else><button-link @onClick="resendCode">Отправить повторно</button-link></text-label>
				</div>
			</template>
			<template #button-accept>Применить</template>
		</modal>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback';
import TitleBase from '@Facade/Title/Base';
import TitleCaption from '@Facade/Title/Caption';
import TextBase from '@Facade/Text/Base';
import ButtonBase from "@Facade/Button/Base";
import { mapGetters, mapMutations } from 'vuex';
import Modal from "@Facade/Modal/Base";
import AuthCode from "@Container/Auth/Code";
import TextLabel from "@/LTE/Facades/Text/Label";
import CountdownTimer from "@Facade/Time/CountdownTimer";
import ButtonLink from "@Facade/Button/Link";
import AuthPhone from "@Container/Auth/Phone"

export default {
	name: 'vx.setting.phone',
	components: {
		NavigationComeback, 
		TitleBase, 
		TitleCaption, 
		TextBase, 
		ButtonBase,
		Modal,
		AuthCode,
		TextLabel,
		CountdownTimer,
		ButtonLink,
		AuthPhone
	},
	data() {
		return {
			showModal: false,
			approveCodeStatus: true,
			resendCodeTime: null,
			disable: true,
			code: null,
			phase2: false,
			isStatusPhone: null
		}
	},
	computed: {
		...mapGetters({
			phoneIdent: 'getChooseCountry',
      phoneLth: 'getPhoneLthNumber',
			userTelephone: 'getUserTelephone',
			PhoneCodeConfirm: 'getPhoneCodeConfirm',
			clientBlocking: 'getClientBlocking',
			changePhone: 'getChangePhone',
		}),
		isClientBlocking(){
			return !(this.clientBlocking === null);
		},
	},
	methods: {
		...mapMutations({
			setChangePhone: 'setChangePhone'
		}),
		sendApproveCodeData() {
			console.log('sendApproveCodeData');
			console.log(this.PhoneCodeConfirm);
			if (this.phase3) {
				this.$core.execViaComponent('Setting', 'editPhone', {
					telephone: this.phoneLth.withoutMask,
					// phoneIdent: String(this.phoneIdent.phoneIdent),
					code: this.code
				})
			} else {
				if (this.code === this.PhoneCodeConfirm.code) {
					this.phase2 = true
					this.showModal = false
				}
			}
		},
		resendCode(){
			if (this.phase3) {
				this.$core.execViaComponent('Setting', 'resendCodeEditPhone', this.phoneLth.withoutMask)
			} else {
				this.$core.execViaComponent('Setting', 'codeConfirmPhone')
			}
		},
		changeNumber() {
			this.showModal = true;
			this.resendCodeTime = 60;
			this.$core.execViaComponent('Setting', 'codeConfirmPhone')
		},
		getCode(code) {
			this.disable = false;
			this.code = code

		},
		newNumber() {
			this.$core.execViaComponent('Setting', 'codeEditPhone', {
				telephone: this.phoneLth.withoutMask,
				phoneIdent: String(this.phoneIdent.phoneIdent),
				code: this.code
			})
			this.phase3 = true
			this.showModal = true
		},
		cancelEditPhone() {
			this.$core.execViaComponent('Setting', 'cancelPhoneChange', this.changePhone.id);
			this.setChangePhone({})
		}
	},
	watch: {
		changePhone() {
			this.showModal = false
		},
	}
}
</script>

<style lang="scss" scoped>
.setting-phone-view {
	.facade-title-base {
		text-align: center;
		margin-bottom: 36px;
	}
	.phone {
		color: white;
		margin-bottom: 32px;
	}
	.facade-text-label {
		text-align: center;
		margin: 15px 0;
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
	.cancel {
		color: $red;
		cursor: pointer;
	}
}
</style>