<template>
  <div class="facade-dropdown-accordion">
    <div class="accordion-header" @click="isActive = !isActive">
      <div class="header-title">
        <title-sub><slot name="title"/></title-sub>
      </div>
      <div class="header-toggle-icon" :turned="isActive">
        <icon-dropdown-arrow/>
      </div>
    </div>
    <div class="accordion-content" v-show="isActive">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import TitleSub from '@Facade/Title/Sub'
  import IconDropdownArrow from '@Icon/DropdownArrow'
  import TableTable from '@Facade/Table/Table'
  import TableCell from '@Facade/Table/Cell'

  import {merge} from 'lodash'

  // eslint-disable-next-line no-unused-vars

  export default {
    name: 'Facades.Dropdown.Accordion',
    props: {

    },
    components: {
      TitleSub,
      IconDropdownArrow,
      TableTable,
      TableCell
    },
    data: () => ({
      isActive: false
    }),
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .facade-dropdown-accordion{
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background-color: $grey-scale-500;
    .accordion-header{
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-radius: 16px;
      transition: .15s all ease-out;
      .facade-title-sub{
        height: 24px;
      }
      .header-toggle-icon{
        .icon-dropdown-arrow{
          height: 16px;
          color: $grey-scale-200;
        }
        &[turned]{
          transform: rotate(180deg);
        }
      }
      &:hover{
        background-color: $grey-scale-400;
      }
    }
    .accordion-content{
      padding: 20px;
    }
  }
</style>