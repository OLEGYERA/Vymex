<template>
  <div class="create-unit">
		<navigation-comeback @onClick="$router.push({name: 'vx.structure'})"/>
		<title-base>Создание С.Е.</title-base>
		<div class="create-content-wrapp">
			<div class="create-content">
				<change-level />
				<div v-if="getCreateLevel" class="create-level">
					<div class="create-level_head">
						<icon-info/>
						<div>Созданная структрурная единица будет непосредственно подчинятся выбранному руководителю.</div>
					</div>
					<div :class="['level', {'two': getCreateLevel == 2}, {'three': getCreateLevel == 3}, {'four': getCreateLevel == 4}]">
						<title-sub>{{getCreateLevel}}й уровень</title-sub>
						<div class="info">Обязательное для заполнения поле для {{getCreateLevel}}го уровня исполнителя</div>
					</div>
				</div>
				<input-base
					:model="jobTitle"
					placeholder="Название должности с.е." 
				/>
				<div class="create-row">
					<title-caps>Назначить исполнителей в с.е.</title-caps>
					<button-add />
				</div>
				<div class="create-row">
					<title-caps>Назначить руководителя</title-caps>
					<button-add />
				</div>
			</div>
		</div>
		<div class="create-resource-buttons">
			<button-secondary 
				class="create-resource-button" 
				@onClick="$router.push({name: 'vx.co.founder'})"
			>
				Отмена
			</button-secondary>
			<button-base 
				class="create-resource-button" 
				:disable="true"
			>
				Создать С.Е.
			</button-base>
		</div>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback'
import TitleBase from '@Facade/Title/Base'
import ButtonSecondary from "@Facade/Button/Secondary"
import ButtonBase from "@Facade/Button/Base"
import ChangeLevel from '../facades/ChangeLevel'
import InputBase from "@Facade/Input/Base";
import ButtonAdd from '@Facade/Button/Add'
import TitleCaps from '@Facade/Title/Caps'
import TitleSub from "@Facade/Title/Sub";
import { mapGetters } from 'vuex'

export default {
	name: 'vx.structure.createUnit',
	components: {
		NavigationComeback, 
		TitleBase, 
		ButtonSecondary, 
		ButtonBase, 
		ChangeLevel, 
		InputBase, 
		ButtonAdd,
		TitleCaps,
		TitleSub
	},
	data() {
		return {
			jobTitle: ''
		}
	},
	computed: {
		...mapGetters({
			getCreateLevel: 'getCreateLevel'
		})
	},
}
</script>

<style lang="scss" scoped>
.create-unit {
	padding: 15px;
	max-width: 795px;
	margin: 10px auto;

	& .facade-title-base {
		text-align: center;
		margin-bottom: 35px;
	}
	.create-content {
		max-width: 468px;
		margin: 0 auto;

		&-wrapp {
			background: $grey-scale-500;
			border-radius: 16px;
			padding: 55px;
			margin-bottom: 35px;
		}
	}

	.create-level {
		padding: 20px 8px 8px;
		background: #313D49;
		border-radius: 8px;
		&_head {
			display: flex;
			font-size: rem(12);
			color: #fff;
		}
		& .icon {
			margin-right: 8px;
		}
		.level {
			border-radius: 8px;
			padding: 16px 20px;
			margin-top: 20px;
			&.two {
				background: $su-level-2;
			}
			&.three {
				background: $su-level-3;
			}
			&.four {
				background: $su-level-4;
			}

			& .facade-title-sub {
				color: $grey-scale-500;
			}
			& .info {
				font-size: rem(12);
				color: $grey-scale-300;
			}
		}
	}

	.create-resource-buttons {
		display: flex;
		justify-content: space-between;
		.create-resource-button {
			width: 222px;
		}
		.facade-button-base::v-deep {
			font-size: 15px;
			&[disable] {
				background-color: $grey-scale-400;
			}
		}
	}
	.create-row {
		display: flex;
		justify-content: space-between;
		margin-top: 24px;
	}
}
</style>