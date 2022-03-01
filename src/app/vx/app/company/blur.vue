<template>
	<div class="singleton-blur">
		<navigation-comeback @onClick="$router.push({name: 'vx.co.founder'})"/>
		<title-base>Выдать долю</title-base>
		<div class="blur-content-wrapp">
			<div class="blur-content">
				<div class="blur-content-head">
					<title-caps>Получатель доли</title-caps>
					<button-add />
				</div>
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
			<button-base class="blur-resource-button" :disable="true">Выдать долю</button-base>
		</div>
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
		ButtonBase
	},
	data() {
		return {
			available: 74,
			share: null
		}
	},
	computed: {
		remainder() {
			let result = this.available - this.share
			return result < 0 ? 0 : result
		}
	}
}
</script>

<style lang="scss" scoped>
	.singleton-blur {
		padding: 15px;
		max-width: 795px;
		margin: 10px auto;

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