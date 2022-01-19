<template>
  <div class="app-api">
    <div class="predata-group">
      <input-base
        :model="componentName"
        @onInput="componentName = $event"
        labeled
        placeholder="Название компонента"
      /><input-base
        :model="componentMethod"
        @onInput="componentMethod = $event"
        labeled
        placeholder="Название метода"
      />
    </div>
    <div class="data-group">
      <div class="data-cell" v-for="(data, index) in dataGroup" :key="index">
        <dropdown-base
          placeholder="Тип данных"
          :model="data.type"
          model-observer="title"
          :data="typeData"
          :opts="typeDataOpts"
          error="Тип данных не обнаружен"
          @onSelect="data.type = $event"
          disable-debounce
        />
        <input-base
          :model="data.input"
          @onInput="data.input = $event"
          labeled
          placeholder="Название метода"
        />
        <div class="delete-cell" v-if="index !== 0" @click="deleteCell(index)">
          <icon-error/>
        </div>
      </div>
      <button-secondary @click.native="createNewCell">Добавить Поле</button-secondary>
    </div>
    <button-base :disable="!isEmitEnable" @onClick="emitData">Получить результат</button-base>
  </div>
</template>


<script>
  /*eslint-disable*/
  import InputBase from '@Facade/Input/Base'
  import ButtonBase from '@Facade/Button/Base'
  import DropdownBase from '@Facade/Dropdown/Base'
  import ButtonSecondary from '@Facade/Button/Secondary'
  import IconError from '@Icon/Error'


  export default {
    name: 'app.vx.api',
    components: {
      InputBase,
      ButtonBase,
      DropdownBase,
      ButtonSecondary,
      IconError
    },
    data(){
      return {
        componentName: null,
        componentMethod: null,
        dataGroup: [{type: {title: 'String'}, input: null}],
        typeData: [{title: 'String'}, {title: 'Number'}],
        typeDataOpts: {
          cell: {
            structure: [{value: 'title-item'}],
            position: 'center',
          },
          template: {
            value: 'title',
          }
        }
      }
    },
    computed: {
      isEmitEnable(){
        return this.componentName && this.componentName.length > 0 && this.componentMethod && this.componentMethod.length > 0
      }
    },
    methods: {
      createNewCell(){
        this.dataGroup.push({type: {title: 'String'}, input: null})
      },
      deleteCell(cellIndex){
        if (this.dataGroup[cellIndex]) {
          this.dataGroup.splice(cellIndex, 1);
        }
      },
      emitData(){
        this.$core.predictor.ManualProcess('api', 'testApi',
            {name: this.componentName, method: this.componentMethod, data: this.dataGroup})

      }
    }
  }
</script>


<style lang="scss" scoped>
  .app-api{
    width: 600px;
    margin: 0 auto;
    position: relative;
    .predata-group{
      display: flex;
      margin-bottom: 30px;
      .facade-input-base{
        &:first-child{
          margin-right: 20px;
        }
      }
    }
    .data-group{
      margin-bottom: 30px;
      .data-cell{
        display: flex;
        margin-bottom: 30px;
        .facade-dropdown-base{
          width: 35%;
          margin-right: 20px;
        }
        .delete-cell{
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          margin-left: 20px;
          color: $red;
          border-radius: 6px;
          background-color: $red-opacity-2;
        }
      }
    }

  }
</style>