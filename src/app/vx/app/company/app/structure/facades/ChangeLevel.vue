<template>
  <div class="facade-change-alert">
    <div class="change-alert-container">
      <span class="change-alert-title">Тип структурной еденицы</span>
      <div class="change-alert-container-view" @click="actionListStatus = !actionListStatus">
        <span class="change-alert-text">
					{{getCreateLevel ? `${getCreateLevel}й уровень` : 'Выберите тип'}}
				</span>
				<div class="action-list"	v-if="actionListStatus">
					<div 
						v-for="lev in levels" 
						:key="lev.value" 
						@click="setCreateLevel(lev.value)"
						:class="['level', lev.class]"
					>
						<title-sub>{{lev.value}}й уровень</title-sub>
						<checkbox :model="getCreateLevel == lev.value" :viewType="2"/>
					</div>
				</div>
        <div class="change-alert-header-menu">
          <dropdown-arrow
						class="change-alert-select-icon"
						:class="{active: actionListStatus}"
					/>
        </div>
      </div>
    </div>
    <div class="action-list-outside" v-if="actionListStatus" @click="actionListStatus = false"></div>
    <div class="change-alert-border"></div>
  </div>
</template>

<script>
import DropdownArrow from "@Icon/DropdownArrow";
import Checkbox from "@Facade/Input/Checkbox";
import TitleSub from "@Facade/Title/Sub";
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'vx.structure.facade.changeLevel',
	components: {DropdownArrow, Checkbox, TitleSub},
  data() {
    return {
      actionListStatus: false,
			levels: [
				{value: 2, class: 'two'},
				{value: 3, class: 'three'},
				{value: 4, class: 'four'}
			],
    }
  },
	computed: {
		...mapGetters({
			getCreateLevel: 'getCreateLevel'
		})
	},
	methods: {
		...mapMutations({
			setCreateLevel: 'setCreateLevel'
		})
	}
}
</script>

<style lang="scss" scoped>
.facade-change-alert {
  display: flex;
  flex-direction: column;

  .change-alert-container {
    display: inherit;
    flex-direction: column;

    .change-alert-title {
      font-size: rem(12);
      line-height: rem(16);
      margin: 2px 0;
      color: $grey-scale-200;
    }

    .change-alert-container-view {
      display: inherit;
      justify-content: space-between;
			position: relative;
			cursor: pointer;

      .change-alert-text {
        font-size: rem(15);
        line-height: rem(20);
        color: #FFFFFF;
        margin: 2px 0;
      }

      .change-alert-select-icon {
        color: #FFF;
				&.active {
					transform: rotate(180deg);
				}
      }

      .change-alert-header-menu {
        position: relative;

        .facade-modal-action-list {
          position: absolute;
          bottom: 8px;
          z-index: 1;
          right: 110px;
          transform: translateY(100%);
        }
      }
    }
  }

  .change-alert-border {
    width: 100%;
    height: 1px;
    background: $grey-scale-300;
    margin: 7px 0;
  }
}
.action-list-outside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: auto;
}
.action-list {
	position: absolute;
  top: 30px;
	padding: 24px 12px;
	background: $grey-scale-700;
	box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
	border-radius: 8px;
	width: 100%;
	z-index: 3;
}
.level {
	display: flex;
	justify-content: space-between;
	border-radius: 8px;
	padding: 12px 16px;
	margin-bottom: 8px;

	& .facade-title-sub {
		color: $grey-scale-500;
	}
	&.two {
		background: $su-level-2;
	}
	&.three {
		background: $su-level-3;
	}
	&.four {
		background: $su-level-4;
	}
}
</style>