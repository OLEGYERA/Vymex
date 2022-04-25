<template>
  <div class="task-other-view">
    <modal-task-list-ui/>
  </div>
</template>

<script>
  import {ModalTaskListUi} from '@Providers'

  export default {
    name: 'vx.co.task.other.view',
    components: {
      ModalTaskListUi
    }
  }
</script>
