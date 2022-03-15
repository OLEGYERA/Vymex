<template>
	<tab-view :search-placeholder="'Поиск'">
		<template #header-add>
			<header-add :add="false">
				<template #header-title>результат поиска</template>
				<template #header-amount>122 000</template>
			</header-add>
		</template>
		<template #content>
			<person v-for="(contact, key) in contacts" :contact="contact" :key="key" user />
		</template>
	</tab-view>
</template>

<script>
import Person from "@/LTE/Singletons/Messenger/facades/Person";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import TabView from '../../Messenger/facades/TabView';

export default {
	name: 'Singleton.Facades.UsersContent',
	components: {Person, HeaderAdd, TabView},
	data() {
		return {
			contacts: [
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Дария Шевченко',
          alias: '@lable_kers'
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers'
        },
      ],
		}
	}
}
</script>

<style lang="scss" scoped>
	.facade-header-add {
		margin: 20px 0 12px 0;
	}
</style>