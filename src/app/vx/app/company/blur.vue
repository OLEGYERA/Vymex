<template>
	<div class="singleton-blur">
		<navigation-comeback @onClick="$router.push({name: 'vx.co.founder'})"/>
		<title-base>Выдать долю</title-base>
		<div class="blur-content-wrapp">
			<div class="blur-content">
				<div class="blur-content-head">
					<title-caps>Получатель доли</title-caps>
					<button-add v-if="!shareRecipients.id" @click.native="show()" />
				</div>
				<person
					v-if="shareRecipients.id"
					class="blue-person"
          :contact="shareRecipients"
					user
					@click.native="deleteUser()"
				/>
				<div class="blur-content-item">
					<icon-process />
					<title-caption class="title-caption">Распоряжение долей компании</title-caption>
					<div class="blur-list">
						<title-caption>У вас доступно для выдачи</title-caption>
						<title-semi>{{available}}%</title-semi>
					</div>
					<div class="blur-list">
						<title-caption>Ваш остаток после выдачи</title-caption>
						<title-semi :class="{'remainder': remainder !== available}">
							{{remainder}}%
						</title-semi>
					</div>
				</div>
				<input-base placeholder="Предложить долю" mask="###" @onInput="share = $event" :model="share" labeled />
			</div>
		</div>
		<div class="blur-resource-buttons">
			<button-secondary class="blur-resource-button">Отмена</button-secondary>
			<button-base 
				@click.native="showModal = true"
				class="blur-resource-button" 
				:disable="validIssueShare"
			>
				Выдать долю
			</button-base>
		</div>
		<modal :status="showModal" @onClose="showModal = false" @onOk="addUser">
			<template #title>Подтвердите передачу доли</template>
			<template #content>
				<attention />
				<title-caps class="modal-caps">Получит доли</title-caps>
				<person
					class="blue-person"
          :contact="shareRecipients"
					user
				/>
				<info-card-share :share="share" />
			</template>
			<template #button-accept>Подтвердить</template>
		</modal>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback'
import TitleBase from '@Facade/Title/Base'
import TitleCaps from '@Facade/Title/Caps'
import ButtonAdd from '@Facade/Button/Add'
import IconProcess from '@Icon/Process'
import TitleCaption from '@Facade/Title/Caption'
import TitleSemi from '@Facade/Title/Semi'
import InputBase from '@Facade/Input/Base'
import ButtonSecondary from "@Facade/Button/Secondary"
import ButtonBase from "@Facade/Button/Base"

import {mapGetters, mapMutations} from 'vuex'
import Person from '@/LTE/Singletons/Messenger/facades/Person'
import Modal from "@Facade/Modal/Base";
import Attention from '@/LTE/Singletons/Users/facades/Attention'
import InfoCardShare from '@/LTE/Singletons/Users/facades/InfoCardShare'

export default {
	name: 'vx.co.founder.blur',
	components: {
		NavigationComeback, 
		TitleBase, 
		TitleCaps, 
		ButtonAdd, 
		IconProcess, 
		TitleCaption, 
		TitleSemi,
		InputBase,
		ButtonSecondary,
		ButtonBase,
		Person,
		Modal,
		Attention,
		InfoCardShare
	},
	data() {
		return {
			available: 74,
			share: null,
			showModal: false
		}
	},
	methods: {
		...mapMutations({
			show: 'Users/show',
			deleteUser: 'Users/deleteUser',
			setIssuedShares: 'Users/setIssuedShares'
		}),
		addUser() {
			console.log('add');
			this.showModal = false
			this.deleteUser
			this.$router.push({name: 'vx.co.founder'})
			this.setIssuedShares({
				...this.shareRecipients,
				share: this.share
			})
		}
	},
	computed: {
		...mapGetters({
			shareRecipients: 'Users/shareRecipients'
		}),
		remainder() {
			let result = this.available - this.share
			return result < 0 ? 0 : result
		},
		validIssueShare() {
			return !this.shareRecipients.id
				|| !this.share
				|| this.share == 0
				|| this.share > this.available
		}
	}
}
</script>

<style lang="scss" scoped>
	.singleton-blur {
		padding: 15px;
		max-width: 795px;
		margin: 10px auto;

		& .modal-caps {
			margin: 28px 0 16px 0 ;
		}

		& .facade-title-base {
			text-align: center;
			margin-bottom: 35px;
		}

		& .blur-content {
			max-width: 468px;
			margin: 0 auto;
			
			&-wrapp {
				background: $grey-scale-500;
				border-radius: 16px;
				padding: 55px;
				margin-bottom: 35px;
			}
			&-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24px;
			}
			&-item {
				background: $grey-scale-400;
				padding: 16px 12px;
				border-radius: 24px;
				text-align: center;
				margin-bottom: 24px;
			}

			& .blur-list {
				background: $grey-scale-300;
				border-radius: 12px;
				padding: 12px;
				text-align: left;
				margin-bottom: 4px;
			}

			& .blue-person {
				transition: .3s;
				&:hover {
					filter: brightness(0.6);
				}
			}

			.icon-process {
				margin-bottom: 8px;
			}

			.facade-title-caption {
				margin-bottom: 4px;
			}

			.title-caption {
				margin-bottom: 16px;
			}
		}

		.blur-resource-buttons {
      display: flex;
      justify-content: space-between;
      .blur-resource-button {
        width: 222px;
      }
      .facade-button-base::v-deep {
        font-size: 15px;
        &[disable] {
          background-color: $grey-scale-400;
        }
      }
    }

		.remainder {
			color: $secondary-yellow;
		}
	}
</style>