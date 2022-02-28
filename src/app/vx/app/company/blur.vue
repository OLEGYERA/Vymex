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
			</div>
		</div>
	</div>
</template>

<script>
import NavigationComeback from '@Facade/Navigation/Comeback'
import TitleBase from '@Facade/Title/Base'
import TitleCaps from '@Facade/Title/Caps'
import ButtonAdd from '@Facade/Button/Add'

export default {
	name: 'vx.co.founder.blur',
	components: {NavigationComeback, TitleBase, TitleCaps, ButtonAdd}
}
</script>

<style lang="scss" scoped>
	.singleton-blur {
		padding: 0 15px;
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
			}
			&-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>