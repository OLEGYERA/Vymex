<template>
  <div class="container-dashboard-resources-c-e">
    <widgets-header @hide-item="hideItem"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="resources-c-e-body">
      <span class="body-title">Последние</span>
      <div class="body-content">
        <div class="content-item"
             v-for="(file, i) in data.data"
             :key="i">
          <img :src="file.picture"/>
          <span class="item-text">{{ file.file }}</span>
          <div class="item-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "@Container/Vx/Main/Dashboard/facades/WidgetsHeader";
export default {
  name: "ResourcesCE",
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
.container-dashboard-resources-c-e {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .resources-c-e-body {
    display: inherit;
    flex-direction: column;

    .body-title {
      font-weight: 600;
      font-size: rem(12);
      line-height: rem(16);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: $grey-scale-200;
      margin-bottom: 1%;
    }

    .body-content {
      display: inherit;
      flex-direction: column;

      .content-item {
        margin-top: 3%;

        .item-text {
          color: #FFF;
          font-size: rem(12);
          line-height: rem(16);
          margin-left: 2%;
        }

        .item-border {
          border-bottom: #313D49 solid 1px;
          margin-top: 2%;
        }
      }
    }
  }
}

</style>

