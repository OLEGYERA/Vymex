<template>
  <modal-substrate :status="isActive">
    <div class="modal-table-component">
      <header class="modal-table-header">
        <icon-arrow-left @click.native="modalClose" touch/>
        <h2 class="table-header-title"><slot name="table-header-title"/></h2>
      </header>
      <div class="modal-table-content">
        <modal-table-cell v-if="search" :group="[{search: 'table-search'}]" :position="'full'" noTouch>
          <template #search>
            <input-search placeholder="Поиск страны" @onSearch="modalSearch"/>
          </template>
        </modal-table-cell>

        <slot name="table-cells"/>
      </div>
    </div>
  </modal-substrate>

</template>

<script>
  import ModalSubstrate from '@/components/modal/substrate'
  import IconArrowLeft from '@/components/icon/arrow-left'
  import ModalTableCell from '@/components/modal/table-cell'
  import InputSearch from '@/components/input/search'

  export default {
    name: 'modal.table.component',
    props: {
      status: Boolean,
      search: Boolean
    },
    components: {
      ModalSubstrate,
      IconArrowLeft,
      ModalTableCell,
      InputSearch
    },
    mounted () {
      // this.handleDebouncedScroll = debounce(this.handleScroll, 100);
      // window.addEventListener('scroll', this.handleDebouncedScroll);
    },
    data(){
      return {
        isActive: false,
        handleTimeout: null
      }
    },
    methods: {
      modalClose(){
        this.$emit('onCLose')
      },
      modalSearch(inputData){
        this.$emit('onSearchTable', inputData)
      }
    },
    watch: {
      status(to){
        this.isActive = to
      }
    },
    beforeDestroy () {
      // window.removeEventListener('scroll', this.handleDebouncedScroll);
    },
  }
</script>

<style lang="scss" scoped>
  .modal-table-component{
    position: relative;
    width: 100%;
    height: 100%;
    .modal-table-header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 30px;
      background-color: $grey-scale-500;
      box-shadow: 0 3px 12px rgba(0, 0, 0, .5);
      .icon-arrow-left{
        position: absolute;
        left: 30px;
      }
      .table-header-title{
        color: #fff;
        margin: 0;
        font-size: 22px;
        line-height: 30px;
        font-weight: 600;
      }
    }
    .modal-table-content{
      padding: 60px 15px 0;
      overflow-y: scroll;
      height: 100%;
      ::v-deep .modal-table-cell{
         .table-search{
          width: 100%;
        }
      }
    }
  }

</style>