<template>
  <div class="router-personal-view">
    <div class="main-info">
			<div class="header-title">{{`${userInfo.name} ${userInfo.lastname}`}}</div>
			<div class="photo">
        <avatar :logo="logo" colorCode="4" />
      </div>
			<title-caption class="units-area">
				Занимает структурные ед.:
				<span v-for="unit in units" :key="unit.id">
					<span class="level" :class="`level-${unit.level}`">{{unit.name}}</span>
				</span>
			</title-caption>
			<div class="info-block">
        <div class="user-info" @click="copy(userInfo.alias)">
          <div class="icon-info"><icon-mail /></div>
          <div class="info-text-group">
            <text-base>{{ userInfo.alias }}</text-base>
            <title-caption>Имя пользователя VYMEX</title-caption>
          </div>
          <icon-copy />
        </div>
				<div class="user-info" @click="copy(userInfo.telephone)">
          <div class="icon-info"><icon-phone /></div>
          <div class="info-text-group">
            <text-base>{{ userInfo.telephone }}</text-base>
            <title-caption>Телефон</title-caption>
          </div>
          <icon-copy />
        </div>
				<div class="user-info" @click="copy(userInfo.employmentDate)">
          <div class="icon-info"><icon-date /></div>
          <div class="info-text-group">
            <text-base>{{ userInfo.employmentDate }}</text-base>
            <title-caption>Начало работы</title-caption>
          </div>
          <icon-copy />
        </div>
        <title-sub>
          <button-base>Написать</button-base>
        </title-sub>
      </div>
		</div>
	</div>
</template>

<script>
import Avatar from "@Facade/Image/Avatar";
import TextBase from "@Facade/Text/Base";
import TitleCaption from "@Facade/Title/Caption";
import IconMail from "@Icon/Mail";
import IconPhone from "@Icon/Phone";
import IconDate from "@Icon/Date";
import IconCopy from "@Icon/Copy";
import ButtonBase from "@Facade/Button/Base";
import TitleSub from "@Facade/Title/Sub";

import { mapGetters } from 'vuex'

export default {
	name: 'vx.structure.facade.workerContent',
	components: {Avatar, TextBase, TitleCaption, IconMail, IconCopy, ButtonBase, TitleSub, IconPhone, IconDate},
	computed: {
		...mapGetters({
			userInfo: 'Company/getUserInfo',
			units: 'Company/getUnits'
		}),
		logo: function () {
      if (this.userInfo.avatar) {
        return this.userInfo.avatar
      } else if (this.userInfo.name && this.userInfo.lastname) {
        return this.userInfo.name[0]+this.userInfo.lastname[0]
      } else {
        return ''
      }
    }
	},
	methods: {
		clearUser() {
			console.log('clearUser');
		},
    copy(text) {
      navigator.clipboard.writeText(text)
      this.$notify({text: 'Скопировано в буфер обмена', type: 'success', duration: 3000, speed: 500})
    }
	}
}
</script>

<style lang="scss" scoped>
.header-title {
	white-space: nowrap;
	font-weight: 600;
	font-size: rem(17);
	line-height: rem(17);
	color: #FFF;
	margin: 4% 0 0 4%;
}

.facade-text-base {
	color: #fff;
}

.level {
	color: $grey;
	padding: 2px 8px;
	border-radius: 32px;
	margin-left: 4px;
}
.level-1 {
	background: $su-level-1;
}
.level-2 {
	background: $su-level-2;
}
.level-3 {
	background: $su-level-3;
}
.level-4 {
	background: $su-level-4;
}

.units-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: $grey-scale-500;
	border-radius: 16px;
	margin: 0 20px;
	padding: 12px;
	& span {
		margin-top: 8px;
	}
}



.router-personal-view {
  width: 100%;
  height: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden;
  .main-info {
    height: 100%;
    overflow-y: scroll;
    .container-vx-name {
      margin-bottom: 36px;
    }
    .photo {
      margin: 35px auto 32px;
      height: 120px;
      width: 120px;
    }
    .facade-image-avatar ::v-deep {
      .color {
        font-size: 24px;
      }
    }
    .info-block {
      padding: 0 20px;
      height: calc(100vh - 407px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .user-info {
      display: flex;
      position: relative;
      padding: 12px 0;
      border-bottom: $grey-scale-400 solid 1px;
      cursor: pointer;
      .icon-info {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: inherit;
        justify-content: center;
        align-items: center;
        background-color: rgba(24, 144, 255, 0.2);
      }
      .icon-copy {
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
      }
      .icon {
        height: 16px;
        width: 16px;
        color: $blue;
      }
    }
    .user-info:hover {
      .icon-copy {
        display: block;
      }
    }
  }
}
</style>