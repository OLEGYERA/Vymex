<template>
  <div v-if="userInfo" class="singleton-users-app" @click.self="close()">
    <sidebar class="users-app-sidebar" @onClose="close()">
			<template #main-header>
				<div class="facade-notifications-header">
					<div class="info">
						<title-sub>Команда</title-sub>
					</div>
				</div>
      </template>
			<template #main-content>
				<worker-content />
      </template>
		</sidebar>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import Sidebar from '@Facade/Navigation/SidebarRight';
import TitleSub from '@Facade/Title/Sub'
import WorkerContent from '../facades/WorkerContent';

export default {
	name: 'vx.structure.singleton.workerInfo',
	components: { Sidebar, TitleSub, WorkerContent },
	computed: {
		...mapGetters({
			userInfo: "Company/getUserInfo",
		}),
	},
	methods: {
		...mapMutations({
			close: 'Company/clearUserInfo',
		}),
	},
}
</script>

<style lang="scss" scoped>
.singleton-users-app {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: rgba($grey-scale-700, 0.8);
  z-index: 3;

  .users-app-sidebar ::v-deep {
    display: flex;
    height: 100%;
    background-color: $grey;
    .sidebar-main {
      width: 372px;
    }
  }
}
</style>