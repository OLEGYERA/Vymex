<template>
  <div v-if="status" class="singleton-users-app" @click.self="close()">
    <sidebar class="users-app-sidebar" @onClose="close()">
			<template #main-header>
				<users-headers />
      </template>
			<template #main-content>
        <users-content />
      </template>
		</sidebar>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import Sidebar from '@Facade/Navigation/SidebarRight';
import UsersHeaders from './facades/UsersHeaders';
import UsersContent from './facades/UsersContent';

export default {
  name: "Singleton.Users.app",
  components: { Sidebar, UsersHeaders, UsersContent },
  computed: {
    ...mapGetters({
      status: "Users/getStatus",
    }),
  },
	methods: {
    ...mapMutations({
      close: 'Users/close',
    }),
  },
};
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