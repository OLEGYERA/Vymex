<template>
	<div class="setting-confidentiality-view">
		<navigation-comeback @onClick="$router.push({name: 'vx.setting'})"/>
		<title-base>Конфиденциальность</title-base>
		<div class="profile-confidentiality-box">
			<title-caps>Настроить видимость контактов</title-caps>
			<plate-setting @click.native="$router.push({name: 'vx.setting.confidentiality.phone'})">
				<template #icon><icon-phone/></template>
				<template #title>Телефон</template>
				<template #additional><text-base class="contact">Мои контакты</text-base></template>
			</plate-setting>
			<plate-setting @click.native="$router.push({name: 'vx.setting.confidentiality.mail'})">
				<template #icon><icon-letter/></template>
				<template #title>E-mail</template>
				<template #additional><text-base class="contact">Мои контакты</text-base></template>
			</plate-setting>
			<title-caps>Пароль</title-caps>
			<plate-setting>
				<template #icon><icon-edit/></template>
				<template #title>Изменить пароль</template>
			</plate-setting>
			<title-caps>Блокировка</title-caps>
			<plate-setting disable>
				<template #icon><icon-confidential/></template>
				<template #title>Код-пароль</template>
			</plate-setting>
			<title-caps>Сеансы и устройства</title-caps>
			<plate-setting @click.native="$router.push({name: 'vx.setting.confidentiality.active-sessions'})">
				<template #icon><icon-mobile/></template>
				<template #title>Активные сеансы</template>
			</plate-setting>
		</div>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback'
import TitleBase from '@Facade/Title/Base'
import TitleCaps from '@Facade/Title/Caps'
import PlateSetting from '@Facade/Plate/Setting'
import TextBase from '@Facade/Text/Base'
import IconConfidential from '@Icon/Confidential'

export default {
	name: 'vx.setting.confidentiality',
	components: {NavigationComeback, TitleBase, TitleCaps, PlateSetting, TextBase, IconConfidential}
}
</script>

<style lang="scss" scoped>
	.setting-confidentiality-view {
		.facade-title-base{
      text-align: center;
      margin-bottom: 36px;
    }
		& .facade-title-caps {
			padding: 24px 20px 10px;
		}
		.profile-confidentiality-box{
      width: 100%;
      box-sizing: border-box;
      border-radius: 16px;
      background-color: $grey-scale-500;
			.contact {
        color: $blue;
      }
			.facade-plate-setting {
				transition: .2s all linear;
				cursor: pointer;
				padding: 0 20px;

				&:hover{
					background-color: $grey-scale-400;
				}
			}
    }
		.icon-edit {
			color: $blue;
		}
		.icon-confidential {
			color: $grey-scale-200 !important;
		}
	}
</style>