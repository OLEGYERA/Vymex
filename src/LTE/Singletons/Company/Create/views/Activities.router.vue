<template>
  <div class="activities-router-view">
    <title-caps>Направления</title-caps>
    <dropdown-accordion v-for="(activityDir, activityKey) in activities" :key="activityKey">
      <template #title>{{ activityDir.title }} <plate-counter :counter="getGroupActivityCounter(activityDir.activities)" non-zero/></template>
      <template #content>
        <div class="content-space">
          <plate-checkbox
            v-for="(activity, key) in activityDir.activities" :key="key"
            :title="activity.title" :model="matchActivity(activity.id)"
            :disable="!matchActivity(activity.id) && checkedActivities.length > 2"
            @onChecked="switchCheckedActivities([$event, activity.id])"/>
        </div>
      </template>

    </dropdown-accordion>
    <div class="button-row">
      <button-base :disable="checkedActivities.length === 0" @onClick="next()">Далее</button-base>
    </div>
  </div>
</template>


<script>
/*eslint-disable*/
import TitleCaps from '@Facade/Title/Caps'
import DropdownAccordion from '@Facade/Dropdown/Accordion'
import PlateCounter from '@Facade/Plate/Counter'
import PlateCheckbox from '@Facade/Plate/Checkbox'
import ButtonBase from '@Facade/Button/Base'

import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Singleton.Company.Create.Views.Activities.Router',
  components: {TitleCaps, DropdownAccordion, PlateCounter, PlateCheckbox, ButtonBase},
  mounted() {
    if(!this.activities.length) this.$core.execViaComponent('Company', 'activities');
  },
  computed: {
    ...mapGetters({
      activities: 'Company/getActivities',
      checkedActivities: 'Company/getCheckedActivities',
    })
  },
  methods: {
    ...mapMutations({
      switchCheckedActivities: 'Company/switchCheckedActivities',
    }),
    matchActivity(id) {
      return this.checkedActivities.indexOf(id) !== -1;
    },
    getGroupActivityCounter(dirGroup) {
      if(this.checkedActivities.length === 0) return 0;
      let counter = 0;
      console.log(dirGroup)
      dirGroup.forEach(activity => {if(this.checkedActivities.indexOf(activity.id) !== -1) counter++})
      return counter;
    },
    next(){
      this.$emit('onNext');
    }
  }
}
</script>

<style lang="scss" scoped>
  .activities-router-view{
    .facade-title-caps{
      padding-left: 20px;
      margin-bottom: 12px;
    }

    .facade-dropdown-accordion{
      margin-bottom: 12px;
    }
    .content-space{
      display: flex;
      flex-wrap: wrap;
      .facade-plate-checkbox{
        width: calc(50% - 12px);
        margin-right: 24px;
        &:nth-child(2n){
          margin-right: 0;
        }
        &:nth-child(n + 3){
          margin-top: 16px;
        }
      }
    }

    .button-row{
      display: flex;
      justify-content: flex-end;
      margin-top: 36px;
      .facade-button-base{
        width: 220px;
      }
    }
  }
</style>