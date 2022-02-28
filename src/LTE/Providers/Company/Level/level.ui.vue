<template>
	<div class="level" :class="[level, {'tiny': tiny}]">
		<title-caps v-if="!tiny" class="color-level">{{levelText.name}}</title-caps>
		<title-caps v-if="!tiny" class="color-level">{{levelText.number}}</title-caps>
	</div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps"
export default {
  name: "Providers.Company.Level.Ui",
	components: {TitleCaps},
	props: {
		level: {
			type: String,
			default: 'four'
		},
		tiny: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		levelText() {
			let result = {
				name: '',
				number: ''
			};
			switch(this.level) {
				case 'one': 
					result.name = 'СЕО'; 
					result.number = '1 УР.';
					break;
				case 'two': 
					result.name = 'СМО';
					result.number = '2 УР.';
					break;
				case 'four': 
					result.name = 'Исполнитель'
					result.number = '4 УР.';
					break;
				case 'co-founder': 
					result.name = 'Cоучредитель'
					result.number = '100%';
			}
			return result
		}
	}
};
</script>

<style lang="scss" scoped>
	.level {
		display: flex;
    justify-content: space-between;
		padding: 10px 12px;
		margin-bottom: 10px;
		border-radius: 4px;
		cursor: pointer;

		&.tiny {
			width: 24px;
			height: 24px;
			box-sizing: border-box;
			margin: 0 auto 10px auto;
		}

		&:last-child{
			margin-bottom: 0
		}

		&.one {
			background: $su-level-1
		}
		&.two {
			background: $su-level-2
		}
		&.three {
			background: $su-level-3
		}
		&.four {
			background: $su-level-4;
		}
		&.co-founder {
			border: 4px solid $blue;
			& .color-level {
				color: white;
			}

			&.tiny {
				border-radius: 8px;
				padding: 12px;
			}
		}
		& .color-level {
			color: $grey-scale-700
		}
	}
</style>