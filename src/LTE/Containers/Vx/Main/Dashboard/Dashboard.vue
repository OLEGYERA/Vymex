<template>
  <div class="dashboard">
    <structure/>
    <resources/>
    <result/>
    <costs/>
    <resources-c-e/>
    <calendar/>
    <processes/>
    <tasks/>
    <co-queues/>
    <team/>
    <control-center/>
  </div>
</template>

<script>
import Structure from "@/LTE/Containers/Vx/Main/Dashboard/Info/Structure";
import Resources from "@/LTE/Containers/Vx/Main/Dashboard/Info/Resources";
import Result from "@/LTE/Containers/Vx/Main/Dashboard/Info/Result";
import Costs from "@/LTE/Containers/Vx/Main/Dashboard/Info/Costs";
import ResourcesCE from "@/LTE/Containers/Vx/Main/Dashboard/Info/ResourcesCE";
import Calendar from "@/LTE/Containers/Vx/Main/Dashboard/Info/Calendar";
import Processes from "@/LTE/Containers/Vx/Main/Dashboard/Info/Processes";
import Tasks from "@/LTE/Containers/Vx/Main/Dashboard/Info/Tasks";
import CoQueues from "@/LTE/Containers/Vx/Main/Dashboard/Info/CoQueues";
import Team from "@/LTE/Containers/Vx/Main/Dashboard/Info/Team";
import ControlCenter from "@/LTE/Containers/Vx/Main/Dashboard/Info/ControlCenter";

export default {
  name: "Dashboard",
  components: {
    Structure,
    Resources,
    Result,
    Costs,
    ResourcesCE,
    Calendar,
    Processes,
    Tasks,
    CoQueues,
    Team,
    ControlCenter,
  },
}
</script>

<style lang="scss" scoped>

.dashboard {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 12px auto;
  grid-gap: 24px;
  display: grid;
}
</style>