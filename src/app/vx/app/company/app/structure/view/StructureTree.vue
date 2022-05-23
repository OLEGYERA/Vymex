<template>
	<div ref="structureHeight" :key="`key-${big}`">
		<div class="structure" v-for="str in data" :key="str.id" :class="{'big': big}">
			<div class="lev line empty" v-for="(l, idx) in levelCont(str.level)" :key="idx">
				<div 
					v-if="childLength >= 2 && data.indexOf(str) && idx == 0" 
					:style="{height: curvedPHeight(data.indexOf(str))}" 
					class="curved-c"
				>
				</div>
			</div>
			<div class="lev" :class="[classLevel(str.level), {'line': str.children && str.children.length}, {'empty': !str.name}]">
				<span class="workers-count" v-if="str.level === 4"><span>{{str.workersCount}}</span></span>
				<span class="avatar" v-else>{{str.userName && str.userName[0]}}{{str.userLastname && str.userLastname[0]}}</span>
				{{str.name}}
				<div v-if="str.children && str.children.length >= 2" class="curved-p"></div>
				<div 
					v-if="childLength >= 2 && data.indexOf(str) && !levelCont(str.level)" 
					:style="{height: curvedPHeight(data.indexOf(str))}" 
					class="curved-c"
				>
				</div>
			</div>
			<structure :level="str.level" :bigLine="bigLine" v-if="str.children" :childLength="str.children.length" :data="str.children" />
		</div>
	</div>
</template>

<script>

export default {
	name: 'structure',
	props: {
		childLength: Number,
		big: {
			type: Boolean,
			default: false
		},
		bigLine: {
			type: Number,
			default: 0
		},
		level: {
			type: Number
		},
		data: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			structureHeight: 0,
		}
	},
	mounted() {
		this.structureHeight = this.$refs.structureHeight.offsetHeight
	},
	methods: {
		curvedPHeight(index) {
			if (index === this.data.length - 1) {
				let removeHeight = 0
				if (this.data[this.data.length - 1].children?.length) {
					removeHeight = 35 * (this.data[this.data.length - 1].children.length - 1)
				}
				return  this.structureHeight - this.bigLine - 58 - removeHeight + 'px'
			} else {
				return '17px'
			}
		},
		classLevel(lev) {
			switch (lev) {
				case 1:
					return 'one'
				case 2:
					return 'two'
				case 3:
					return 'three'
				case 4:
					return 'four'
				default: return 'zero'
			}
		},
		levelCont(lev) {
			if (lev && this.level) {
				return lev - this.level - 1
			} else {
				return false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.wrapp {
	position: relative;
}
.structure {
	display: flex;
	&.big {
		& .lev {
			padding: 6px;
			font-size: 15px;
			width: 279px;
			height: 52px;
			flex-shrink: 0;
		}
		.avatar {
			width: 40px;
			height: 40px;
		}
		.curved-p {
			bottom: 8px
		}
		.curved-c {
			bottom: 26px;
		}

		.workers-count {
			width: 24px;
			height: 24px;
			border-radius: 8px;
			& span {
				display: inline;
			}
		}
	}
}
.avatar {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
  margin-right: 4px;
	// box-shadow: 0 0 3px #ccc;
}
.lev {
	padding: 2px;
	width: 104px;
	border-radius: 32px;
	font-size: 7px;
	margin:  0 40px 14px 0;
	position: relative;
	box-sizing: border-box;
	height: 24px;
	display: flex;
	align-items: center;

	&.line {
		&::after {
			content: '';
			border: 1px solid #4A5A6A;
			width: 40px;
			position: absolute;
			right: -42px;
			bottom: 50%;
		}
	}
	&.empty {
		&::before {
			content: '';
			border: 1px solid #4A5A6A;
			width: 100%;
			position: absolute;
			right: 0px;
			bottom: 50%;
		}
	}
}

.curved-p {
	position: absolute;
	right: -22px;
	bottom: -7px;
	height: 17px;
	color: #4A5A6A;
	width: 20px;
	border-top: 2px solid;
	border-right: 2px solid;
	border-radius: 0 20px 0 0;
}
.curved-c {
	position: absolute;
	left: -20px;
	bottom: 12px;
	// height: 16px;
	color: #4A5A6A;
	width: 18px;
	border-bottom: 2px solid;
	border-left: 2px solid;
	border-radius: 0 0 0 20px;
}

.zero {
	background: $blue;
	& .avatar {
		background: linear-gradient(135deg, $blue 0%, white 100%);
	}
}

.one {
	background: $su-level-1;
	& .avatar {
		background: linear-gradient(135deg, $su-level-1 0%, white 100%);
	}
}
.two {
	background: $su-level-2;
	& .avatar {
		background: linear-gradient(135deg, $su-level-2 0%, white 100%);
	}
}
.three {
	background: $su-level-3;
	& .avatar {
		background: linear-gradient(135deg, $su-level-3 0%, white 100%);
	}
}
.four {
	background: $su-level-4;
	& .avatar {
		background: linear-gradient(135deg, $su-level-4 0%, white 100%);
	}
}

.workers-count {
	background: rgba($grey-scale-700, 0.2);
	border-radius: 1px;
	margin: 0 4px 0 8px;
	width: 8px;
	height: 8px;
	color: #FFF;
	display: flex;
  align-items: center;
  justify-content: center;
	& span {
		display: none;
	}
}
</style>