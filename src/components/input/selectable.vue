<template>
  <div class="input-selectable">
    <input-base
      :input-model="inputBaseModel"
      :symbol-back="inputBaseSymbolBackToggle"
      mask-pattern="+####"
      :placeholder="placeholder"
      @onFocus="focusStatus(true)"
      @onBlur="focusStatus(false)"
      @onInput="updateInputBaseModel"
      @onKeyArrowDown="moveCursor(true)"
      @onKeyArrowUp="moveCursor(false)"
      @onKeyEnter="selectByCursor"
      @onKeyTab="selectByCursor"
    />

    <modal-dropdown
      :status="isActive"
      :dropdown-cursor="dropdownCursor"
      :dropdown-items="filterSelectableItems"
      position="start"
      @onClick="selectByClick"
    />
  </div>
</template>

<script>
  import InputBase from '@/components/input/base'
  import ModalDropdown from '@/components/modal/dropdown'

  export default {
    name: 'input.selectable.component',
    props: {
      placeholder: String,
      SelectableItems: Array,
      SelectableItem: [Object, Boolean]
    },
    components: {
      InputBase,
      ModalDropdown
    },
    created() {
      this.selectedItem = this.SelectableItem
    },
    data(){
      return {
        isActive: false,
        inputBaseSymbolBackToggle: false,
        inputBaseModel: '+380',
        dropdownCursor: 0,
        selectedItem: null,
      }
    },
    computed: {
      filterSelectableItems(){
        let filteredData;
        if(this.inputBaseModel) {
          filteredData = this.SelectableItems.filter((country)=>{
            return country.value.toLowerCase().includes(this.inputBaseModel.toLowerCase())
          })
        } else{
          filteredData = this.SelectableItems;
        }
        return filteredData.slice(0, 5)
      },
    },
    methods: {
      updateInputBaseModel(inputed){
        this.selectedItem = null
        this.inputBaseModel = inputed
        this.dropdownCursor = 0

        if(this.filterSelectableItems.length === 0)
          this.inputBaseSymbolBackToggle = !this.inputBaseSymbolBackToggle
      },
      moveCursor(directionDown){
        if(directionDown){
          this.dropdownCursor += 1;
          if(this.dropdownCursor > 4) this.dropdownCursor = 0
        } else {
          this.dropdownCursor -= 1;
          if(this.dropdownCursor < 0) this.dropdownCursor = 4
        }
      },
      selectByCursor(){
        return this.selectingItem(this.dropdownCursor)
      },
      selectByClick(pointer){
        return this.selectingItem(pointer)
      },
      selectingItem(cursorPointer){
        let dropdownItems = this.filterSelectableItems;
        if(dropdownItems.length){
          this.selectedItem = dropdownItems[cursorPointer]
          this.$emit('onSelect', this.selectedItem)
          return true
        } else {
          return false
        }
      },
      focusStatus(status){
        if (status){
          this.isActive = true
          this.$emit('onFocus')
        } else {
          setTimeout(() => {
            this.isActive = status
            this.selectByCursor()
            this.$emit('onBlur')
          }, 200)
        }
      },
    },
    watch: {
      SelectableItem(to){
        if(to !== this.selectedItem) this.selectedItem = to;
      },
      selectedItem(newVal){
        if(newVal)
          this.inputBaseModel = newVal.value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-selectable{
    position: relative;
  }
</style>