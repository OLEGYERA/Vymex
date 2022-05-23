<template>
  <table class="structure-table">
		<thead>
			<tr>
				<td><title-caption>Имя</title-caption></td>
				<td><title-caption>Должность</title-caption></td>
				<td><title-caption>Добавлен</title-caption></td>
				<td><title-caption>Телефон</title-caption></td>
			</tr>
		</thead>
		<template v-for="worker in activeCompany.workers">
		<tbody class="lev_one" :key="worker.id" v-if="worker.unitLevel === 1">
			<tr>
				<td>
					<div class="wrapp-first-td">
						<div class="avatar">{{worker.name[0]}}{{worker.lastname[0]}}</div>
						<text-base class="title">{{worker.name}} {{worker.lastname}}</text-base>
					</div>
				</td>
				<td>
					<div class="position">
						<title-caption>{{worker.unitName}}</title-caption>
					</div>
				</td>
				<td>
					<text-base class="title">12 Октября 2020</text-base>
				</td>
				<td>
					<text-base class="title">+380 63 678 94 54</text-base>
				</td>
			</tr>
			<tr class="gap"></tr>
		</tbody>
		</template>
		<template v-for="worker in activeCompany.workers">
			<tbody class="lev_two" :key="worker.id" v-if="worker.unitLevel === 2">
				<tr>
					<td>
						<div class="wrapp-first-td">
							<div class="avatar">{{worker.name[0]}}{{worker.lastname[0]}}</div>
							<text-base class="title">{{worker.name}} {{worker.lastname}}</text-base>
						</div>
					</td>
					<td>
						<div class="position">
							<title-caption>{{worker.unitName}}</title-caption>
						</div>
					</td>
					<td>
						<text-base class="title">12 Октября 2020</text-base>
					</td>
					<td>
						<text-base class="title">+380 63 678 94 54</text-base>
					</td>
				</tr>
				<tr class="gap"></tr>
			</tbody>
		</template>
		<template v-for="worker in activeCompany.workers">
			<tbody class="lev_three" :key="worker.id" v-if="worker.unitLevel === 3">
				<tr>
					<td>
						<div class="wrapp-first-td">
							<div class="avatar">{{worker.name[0]}}{{worker.lastname[0]}}</div>
							<text-base class="title">{{worker.name}} {{worker.lastname}}</text-base>
						</div>
					</td>
					<td>
						<div class="position">
							<title-caption>{{worker.unitName}}</title-caption>
						</div>
					</td>
					<td>
						<text-base class="title">1 Августа 2021</text-base>
					</td>
					<td>
						<text-base class="title">+380 63 678 94 54</text-base>
					</td>
				</tr>
				<tr class="gap"></tr>
			</tbody>
		</template>
		<template v-for="worker in activeCompany.workers">
			<tbody class="lev_four" :key="worker.id" v-if="worker.unitLevel === 4">
				<tr class="wrapp-four" @click="show === worker.id ? show = null : show = worker.id">
					<td colspan="4">
						<div class="wrapp-four_inside">
							<title-caps class="four-count">1</title-caps>
							<text-base class="title">Финансовые менеджеры</text-base>
							<icon-arrow-right :size="12" :class="{'active': show === worker.id}" />
						</div>
					</td>
				</tr>
				<template v-if="show === worker.id">
					<tr>
						<td>
							<div class="wrapp-first-td">
								<div class="avatar">{{worker.name[0]}}{{worker.lastname[0]}}</div>
								<text-base class="title">{{worker.name}} {{worker.lastname}}</text-base>
							</div>
						</td>
						<td>
							<div class="position">
								<title-caption>{{worker.unitName}}</title-caption>
							</div>
						</td>
						<td>
							<text-base class="title">1 Августа 2021</text-base>
						</td>
						<td>
							<text-base class="title">+380 63 678 94 54</text-base>
						</td>
					</tr>
				</template>
			</tbody>
		</template>
	</table>
</template>

<script>
import TitleCaption from "@Facade/Title/Caption";
import TextBase from "@Facade/Text/Base";
import TitleCaps from "@Facade/Title/Caps";
import IconArrowRight from '@Icon/ArrowRight'
import { mapGetters } from 'vuex';

export default {
	name: 'vx.structure.table',
	components: {TitleCaption, TextBase, TitleCaps, IconArrowRight},
	data() {
		return {
			show: null
		}
	},
	computed: {
		...mapGetters({
			activeCompany: 'Company/getActiveCompany'
		}),
	}
}
</script>

<style lang="scss" scoped>
.structure-table {
	width: 100%;
	border-spacing: 1px 2px;

	thead {
		& td {
			padding-bottom: 32px;
		}
	}

	tbody {
		position: relative;
		background: $grey-scale-500;

		.facade-text-base {
			color: white;
		}

		& td {
			padding: 8px;
			&:first-child {
				border-radius: 8px 0 0 8px;
			}
			&:last-child {
				border-radius: 0 8px 8px 0;
			}
		}

		&::before {
			content: '';
			width: 100%;
			height: 4px;
			position: absolute;
			top: -5px;
			border-radius: 2px;
		}
		&::after {
			position: absolute;
			top: -21px;
			border-radius: 2px;
			padding: 2px 8px;
			font-size: 13px;
		}
	}

	.lev_one {
		& .avatar {
			border-color: $su-level-1;
			background: linear-gradient(135deg, $su-level-1 0%, white 100%);
		}
		& .position {
			background: $su-level-1;
		}

		&::before {
			background: $su-level-1;
		}
		&::after {
			content: '1 ур.';
			background: $su-level-1;
		}
	}

	.lev_two {
		& .avatar {
			border-color: $su-level-2;
			background: linear-gradient(135deg, $su-level-2 0%, white 100%);
		}
		& .position {
			background: $su-level-2;
		}

		&::before {
			background: $su-level-2;
		}
		&::after {
			content: '2 ур.';
			background: $su-level-2;
		}
	}

	.lev_three {
		& .avatar {
			border-color: $su-level-3;
			background: linear-gradient(135deg, $su-level-3 0%, white 100%);
		}
		& .position {
			background: $su-level-3;
		}

		&::before {
			background: $su-level-3;
		}
		&::after {
			content: '3 ур.';
			background: $su-level-3;
		}
	}

	.lev_four {
		& .avatar {
			border-color: $su-level-4;
			background: linear-gradient(135deg, $su-level-4 0%, white 100%);
		}
		& .position {
			background: $su-level-4;
		}

		&::before {
			background: $su-level-4;
		}
		&::after {
			content: '4 ур.';
			background: $su-level-4;
		}
	}

	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		font-size: 13px;
		margin-right: 17px;
    position: relative;

		&::before {
			content: '';
			width: 1px;
			height: calc(100% + 18px);
			background: $grey;
			position: absolute;
			right: -8px;
		}
	}
	.wrapp-first-td {
		display: flex;
		align-items: center;
	}
	.position {
		padding: 2px 8px;
		border-radius: 32px;
		display: inline-block;
		& .facade-title-caption {
			color: $grey;
		}
	}

	.gap {
		height: 30px;
	}

	.wrapp-four {
		& td {
			border-radius: 8px !important;
			cursor: pointer;
		}
		&_inside {
			display: flex;
		}
	}
	.icon-arrow-right {
		color: $grey-scale-200;
		margin-top: 3px;
    margin-left: auto;
		&.active {
			transform: rotate(-90deg);
		}
	}
	.four-count {
    background: $su-level-4;
    border-radius: 8px;
    width: 24px;
    height: 24px;
    border: 1px solid rgba(255, 255, 255, 0.15);
		color: $grey-scale-400;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 25px;
	}
}
</style>