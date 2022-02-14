<template>
  <div class="container-modal-data">
    <div class="modal-data-main">
      <span class="main-title">{{ data.men }}</span>
      <span class="main-description">{{ data.position }}</span>
      <div class="main-position" :style="{background: backgroundLevel}">{{ data.levelText }}</div>
    </div>
    <div class="modal-data-browse">
      <span class="browse-title">Просматривать</span>
      <checkbox :model="onOffBrowse"
           @onClick="onOffBrowse = !onOffBrowse"/>
    </div>
    <div class="modal-data-edit">
      <span class="edit-title">Редактировать</span>
      <checkbox :model="onOffEdit"
           @onClick="onOffEdit = !onOffEdit"/>
    </div>
  </div>
</template>

<script>
import Checkbox from '@Facade/Input/Checkbox';

export default {
  name: 'ModalData',
  components: {
    Checkbox
  },
  data() {
    return {
      onOffBrowse: true,
      onOffEdit: false,
    }
  },
  props: {
    data: Object
  },
   computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    backgroundLevel() {
      if (this.data.level === 1) return '#D5F1C5'
      if (this.data.level === 2) return '#FEF0BD'
      if (this.data.level === 3) return '#BAE7FF'
      if (this.data.level === 4) return '#F2CBF8'
    }
   }
}
</script>

<style lang="scss" scoped>
.container-modal-data {
  display: flex;
  flex-direction: column;

  .modal-data-main {
    display: inherit;
    width: 100%;
    background: $grey-scale-400;
    border-radius: 16px;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .main-title {
      margin: 5.1% 5.1% 2.6% 5.1%;
      font-weight: 600;
      font-size: rem(28);
      line-height: rem(34);
      text-align: center;
      color: #FFF;
    }

    .main-description {
      font-size: rem(15);
      line-height: rem(20);
      text-align: center;
      color: $grey-scale-200;
      margin-bottom: 1.7%;
    }

    .main-position {
      display: inherit;
      justify-content: center;
      align-items: center;
      padding: 4px 12px;
      max-height: 28px;
      width: 34.4%;
      border-radius: 14px;
      flex: none;
      margin-bottom: 6%;
      font-weight: 600;
      font-size: rem(15);
      line-height: rem(20);
      color: #181F26;
    }
  }

  .modal-data-browse {
    display: inherit;
    justify-content: space-between;
    height: 24px;
    background: $grey-scale-400;
    margin-top: 5.1%;
    border-radius: 8px;
    align-items: center;
    padding: 12px 16px;

    .browse-title {
      font-weight: 600;
      font-size: rem(15);
      line-height: rem(20);
      color: #FFF;
      flex: none;
    }
  }

  .modal-data-edit {
    display: inherit;
    justify-content: space-between;
    height: 24px;
    background: rgba($grey-scale-400, .4);
    margin-top: 1.7%;
    border-radius: 8px;
    align-items: center;
    padding: 12px 16px;

    .edit-title {
      font-size: rem(15);
      line-height: rem(20);
      color: $grey-scale-200;
      flex: none;
    }
  }
}
</style>