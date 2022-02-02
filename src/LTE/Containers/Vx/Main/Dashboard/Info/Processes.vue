<template>
  <div class="container-dashboard-processes">
    <widgets-header @hide-item="hideItem"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="processes-body"
         v-for="(process, i) in data.data"
         :key="i">
      <div class="body-title-process">{{ process.titleProcess }}</div>
      <div class="body-date">
        <img :src="require('@/assets/img/icons/calendar-grey.svg')"/>
        <div class="date-title-date">{{ process.titleDate }}</div>
        <img :src="require('@/assets/img/icons/change.svg')"/>
      </div>
      <div class="body-border"></div>
    </div>
    <div class="processes-footer">Смотреть все</div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";

export default {
  name: "Processes",
  methods: {
    hideItem() {
      this.$emit('hide-item', this.data.name)
    },
  },
  components: {
    WidgetsHeader
  },
  props: {
    data: Object,
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-processes {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .processes-body {
    display: flex;
    flex-direction: column;
    margin-bottom: 4%;

    .body-title-process {
      height: auto;
      font-size: rem(15);
      line-height: rem(20);
      color: #FFF;
      margin-bottom: 2%;
    }

    .body-date {
      display: flex;

      .date-title-date {
        font-size: rem(12);
        line-height: rem(16);
        color: $grey-scale-200;
        margin: 0 2%;
      }
    }

    .body-border {
      border-bottom: $grey-scale-400 solid 1px;
      margin-top: 2%;
    }
  }

  .processes-footer {
    height: 20px;
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(20);
    color: $blue;
    margin-top: 1%;
  }
}

</style>

