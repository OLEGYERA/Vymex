<template>
  <div class="facade-dropdown-base">
    <div class="dropdown-input">
      <input-base
        :model="inputModel"
        :placeholder="placeholder"
        :mask="mask"
        :img="img && dropdownModel ? dropdownModel.img : ''"
        @onInput="handleInputModel"
        @onFocus="focusStatus(true)"
        @onBlur="focusStatus(false)"
        @onKeyArrowDown="moveCursor(true)"
        @onKeyArrowUp="moveCursor(false)"
        @onKeyEnter="selectByCursor"
        @onKeyTab.prevent="selectByCursor"
        @onKeyDelete="handleDelete"
        :disable-debounce="disableDebounce"
        :disable="disable"
      />
      <icon-dropdown-arrow/>
    </div>
    <div class="dropdown-box">
      <table-table :id="id" :status="isActive" :cell-size="dropdownOpts.cell.size" :cursor="dropdownCursor">
        <template v-if="filterCellData.length !== 0">
          <table-cell
            v-for="(data, key) in filterCellData" :key="key"
            :height="dropdownOpts.cell.height"
            :structure="dropdownOpts.cell.structure"
            :position="dropdownOpts.cell.position"
            :select-cursor="dropdownCursor === key"
            @mousedown.native="selectByClick(key)"
          >
            <template v-for="(value, name) in dropdownOpts.template" v-slot:[name]>
              <template v-if="value === 'img'"><img :src="data[value]" :key="name"></template>
              <template v-else>{{data[value]}}</template>
            </template>
          </table-cell>
        </template>
        <template v-else>
          <table-cell
            :height="dropdownOpts.cell.height"
            :structure="[{error: 'error-title'}]"
            no-touch>
            <template #error>
              {{error}}
            </template>
          </table-cell>
        </template>
      </table-table>
    </div>
  </div>
</template>

<script>
 /* eslint-disable */

  import InputBase from '@/LTE/Facades/Input/Base'
  import IconDropdownArrow from '@Icon/DropdownArrow'
  import TableTable from '@Facade/Table/Table'
  import TableCell from '@Facade/Table/Cell'

  import {merge} from 'lodash'

  // eslint-disable-next-line no-unused-vars

  export default {
    name: 'Facades.Dropdown.Base',
    props: {
      model: {
        type: Object,
        required: false,
      },
      modelObserver: {
        type: String,
        required: true,
      },
      data: {type: Array, required: true},
      placeholder: {
        type: String,
        required: true
      },
      error: {
        type: String,
        default: "Nothing"
      },
      img: Boolean,
      mask: [String, Array],
      opts: {
        type: Object,
        validator: function (opts) {
          if(!opts) return true;
          return (['object'].indexOf(typeof opts.cell) !== -1 &&
            ['object'].indexOf(typeof opts.cell.structure) !== -1 &&
            ['undefined', 'string'].indexOf(typeof opts.cell.position) !== -1 &&
            ['undefined', 'number'].indexOf(typeof opts.cell.size) !== -1 &&
            ['undefined', 'number'].indexOf(typeof opts.cell.height) !== -1 &&
            ['object'].indexOf(typeof opts.template) !== -1);
        }
      },
      disableDebounce: Boolean,
      disable: Boolean
    },
    components: {
      InputBase,
      IconDropdownArrow,
      TableTable,
      TableCell
    },
    created() {
      this.id = this._uid;
      this.dropdownOpts = merge(this.dropdownOpts , this.opts);
    },
    data(){
      return{
        id: null,
        dropdownModel: this.model,
        inputModel: this.model ? this.model[this.modelObserver] : null,
        dropdownOpts: {
          cell: {
            size: 5,
            height: 45
          },
        },
        isActive: false,
        dropdownCursor: 0,
        previouslySelectedData: null,
      }
    },
    computed: {
      filterCellData(){
        if(this.dropdownModel && this.dropdownModel[this.modelObserver] && this.dropdownModel[this.modelObserver] == this.inputModel){
          return [this.dropdownModel].concat(this.data.filter((data) => data[this.modelObserver] != this.inputModel));
        } else if(this.inputModel) {
          return this.data.filter((data) => String(data[this.modelObserver]).toLowerCase().includes(String(this.inputModel).toLowerCase()));
        } else{
          return this.data;
        }
      },
    },
    methods: {
      handleInputModel(_inputModel){
        this.dropdownCursor = 0;
        this.inputModel = _inputModel;
        if(this.dropdownModel && this.inputModel === this.dropdownModel[this.modelObserver]) return;
        this.dropdownModel = null;
      },
      moveCursor(directionDown){
        const cellsLength = this.filterCellData.length - 1;
        if(directionDown){
          this.dropdownCursor += 1;
          if(this.dropdownCursor > cellsLength) this.dropdownCursor = 0
        } else {
          this.dropdownCursor -= 1;
          if(this.dropdownCursor < 0) this.dropdownCursor = cellsLength
        }
      },
      selectByCursor(e = null){
        this.selectingItem(this.dropdownCursor)
        if(e) e.target.blur()
      },
      selectByClick(pointer){
        this.selectingItem(pointer)
      },
      selectingItem(cursorPointer){
        this.dropdownModel = this.filterCellData.length ? this.filterCellData[cursorPointer] : this.previouslySelectedData;
        this.isActive = false; //label of error
        this.$emit('onSelect', this.dropdownModel)
      },
      handleDelete(e){
        if(e.code === 'Backspace' && this.dropdownModel && this.dropdownModel[this.modelObserver]){
          this.inputModel = null;
        }
      },
      focusStatus(status){
        if (status){
          this.isActive = true
          this.$emit('onFocus')
        } else if(this.isActive) {
          this.selectByCursor()
        } else {
          this.$emit('onBlur')
        }
      },
    },
    watch: {
      model(newModel){
        if(newModel !== this.dropdownModel) this.dropdownModel = newModel;
      },
      dropdownModel(newVal, oldVal){
        if(newVal) this.inputModel = newVal[this.modelObserver]
        if(newVal !== oldVal) this.previouslySelectedData = oldVal;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .facade-dropdown-base{
    width: 100%;
    position: relative;
    .dropdown-input{
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      z-index: 0;
      .icon-dropdown-arrow{
        height: min-content;
        position: absolute;
        right: 4px;
        color: #fff;
        z-index: -1;
      }
      .facade-input-base{
        padding-right: 22px;
      }
    }
    .dropdown-box{
      z-index: 2;
      width: 100%;
      position: absolute;
      .facade-table-table{
        background-color: $grey-scale-700;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        overflow: hidden;
      }

      ::v-deep{
        .error-title{
          width: max-content;
          color: $blue;
          font-style: italic;
          font-weight: 400;
          font-size: rem(16);
          line-height: rem(20);
        }
      }
    }
  }
</style>