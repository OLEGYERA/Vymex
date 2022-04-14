<template>
	<tab-view :search-placeholder="'Поиск'">
		<template #header-add>
			<header-add v-if="!idUser" :add="false">
				<template #header-title>результат поиска</template>
				<template #header-amount>122 000</template>
			</header-add>
		</template>
		<template #content>
      <div v-if="!idUser">
        <person 
          v-for="(person, key) in persons" 
          :contact="person"
          :key="key" 
          user
          @click.native="setActiveUser(person)"
        />
      </div>
      <router-personal v-else />
		</template>
	</tab-view>
</template>

<script>
import Person from "@/LTE/Singletons/Messenger/facades/Person";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import TabView from '../../Messenger/facades/TabView';
import RouterPersonal from '../RouterPersonal';
import {mapMutations, mapGetters} from 'vuex'

export default {
	name: 'Singleton.Facades.UsersContent',
	components: {Person, HeaderAdd, TabView, RouterPersonal},
	data() {
		return {
			persons: [
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers',
          avatar: '',
          id: 1
        },
        {
          title: 'Дария Шевченко',
          alias: '@lable_kers',
          avatar: '',
          id: 2
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@lable_kers',
          avatar: '',
          id: 3
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@andre_vash',
          avatar: '',
          id: 4
        },
        {
          title: 'Дмитрий Погодин',
          alias: '@dmytr_pogod',
          avatar: '',
          id: 5
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers',
          avatar: '',
          id: 6
        },
        {
          title: 'Андрей Вашуленко',
          alias: '@lable_kers',
          avatar: '',
          id: 7
        },
      ],
		}
	},
  computed: {
    ...mapGetters({
      idUser: 'Users/getId',
    }),
  },
  methods: {
      ...mapMutations({
        setActiveUser: 'Users/setActiveUser',
      }),
    }
}
</script>

<style lang="scss" scoped>
	.facade-header-add {
		margin: 20px 0 12px 0;
	}
</style>