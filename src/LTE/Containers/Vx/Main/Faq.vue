<template>
  <div class="container-profile-faq">
    <div class="faq-header">
      <title-caps>База знаний</title-caps>
      <title-caps @click.native="faqStatus = !faqStatus" class="faq-hide" >
        <template v-if="faqStatus">Скрыть</template>
        <template v-else>Показать</template>
      </title-caps>
    </div>
    <div class="faq-main" v-show="faqStatus">
      <div class="faq-plate-space" ref="faq-space">
        <div class="plate-space-rails" :style="{transform: `translateX(${scrollData.railPosition}px)`}">

          <div v-for="category in categories" :key="category.id" class="rail-plate-body">
            <plate-faq>
              <template #icon><icon-process/></template>
              <template #title>{{ category.title }}</template>
              <template #description>{{ category.subtitle }}</template>
            </plate-faq>
          </div>

        </div>
      </div>
      <div class="faq-control-panel">
        <button-secondary>Все материалы</button-secondary>
        <div class="scroller-button">
          <icon-arrow-left v-show="railData.left > 0" @click.native="scrollData.railPosition += railData.left"/>
          <icon-arrow-right v-show="railData.right < 0" @click.native="scrollData.railPosition += railData.right"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import TitleCaps from '@Facade/Title/Caps'
  import PlateFaq from '@Facade/Plate/Faq'
  import IconProcess from '@Icon/Colored/Process'
  import ButtonSecondary from '@Facade/Button/Secondary'
  import IconArrowLeft from '@Icon/ArrowLeft'
  import IconArrowRight from '@Icon/ArrowRight'

  export default {
    name: 'Container.Vx.Faq',
    components: {
      TitleCaps,
      PlateFaq,
      IconProcess,
      ButtonSecondary,
      IconArrowLeft,
      IconArrowRight
    },
    mounted() {
      this.generateScrollData();
    },
    data(){
      return {
        faqStatus: true,
        scrollData: {
          overflowWidth: null,
          railPosition: 0,
          plateCount: null,
          plateWidth: null,
        }
      }
    },
    computed: {
      ...mapGetters({ categories: 'getCategories' }),
      railData(){
        if(this.scrollData.overflowWidth){
          let rightOffset = this.scrollData.railPosition + this.scrollData.overflowWidth,
              leftOffset = Math.abs(this.scrollData.railPosition);
          return {
            right: -((rightOffset > this.scrollData.plateWidth) ? this.scrollData.plateWidth : rightOffset),
            left: (leftOffset > this.scrollData.plateWidth) ? this.scrollData.plateWidth : leftOffset,
          }
        }
        return 0;
      },
    },
    methods: {
      generateScrollData(){
        const Rail = this.$refs['faq-space'].getElementsByClassName('plate-space-rails')[0],
              differenceWidths = Rail.clientWidth - this.$refs['faq-space'].clientWidth;
        if(differenceWidths > 0){
          this.scrollData.overflowWidth = differenceWidths
          let positionMatchArr = Rail.style.transform.match(/(-?[0-9.]+)/g);
          this.scrollData.railPosition = positionMatchArr ? Number(positionMatchArr[0]) : 0;
          let Children = Rail.getElementsByClassName('rail-plate-body');
          this.scrollData.plateCount = Children.length;
          this.scrollData.plateWidth = Children[0].offsetWidth;
        } else {
          this.overflowWidth = null
        }
      },

      getCategories() {
        this.$engine.Predictor
          .prepareComponentManually('faq', 'getCategories')
          .runPredictedData();
      }
    },

    beforeMount() {
      this.getCategories();
    }
  }
</script>

<style lang="scss" scoped>
  .container-profile-faq{
    width: 100%;
    padding: 16px 0;
    box-sizing: border-box;
    border-radius: 16px;
    background-color: $grey-scale-500;
    .faq-header{
      display: flex;
      padding: 8px 20px;
      justify-content: space-between;
      align-items: center;
      .faq-hide{
        color: $blue;
        cursor: pointer;
      }
    }
    .faq-main{
      height: 152px;
      overflow: hidden;
      .faq-plate-space{
        width: 100%;
        display: flex;
        padding: 12px 0;
        overflow: hidden;
        .plate-space-rails{
          display: flex;
          padding: 0 14px;
          transition: .3s transform ease-in;
          box-sizing: border-box;
          .rail-plate-body{
            width: 100%;
            min-width: 290px;
            .facade-plate-faq{
              width: calc(100% - 12px);
              margin: 0 6px;
            }
            &:last-child{
              .facade-plate-faq{
                margin-right: 0;
              }
            }
          }
        }
      }
      .faq-control-panel{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        .scroller-button{
          display: flex;
          align-items: center;
          color: #fff;
          .icon {
            cursor: pointer;
          }
          .icon-arrow-left{
            margin-right: 20px;
          }
        }
      }
    }

  }
</style>