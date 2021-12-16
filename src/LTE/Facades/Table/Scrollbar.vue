<template>
  <div class="facade-table-containable" :id="this.ContainableId">
    <vuescroll :ops="vuescrollOptions"><slot/></vuescroll>
  </div>
</template>

<script>
  import vuescroll from "vuescroll";

  export default {
    name: 'Facades.Scrollbar.Base',
    props: {
      ContainableId: String,
      CellSize: Number
    },
    components: {
      vuescroll
    },
    mounted() {
      this.containableDom = document.getElementById(this.ContainableId);
      const containableCellsBox = this.containableDom.getElementsByClassName('__view')[0];
      this.generateDomData()

      this.containableObserver = new MutationObserver(() => this.generateDomData())
      this.containableObserver.observe(containableCellsBox, {childList: true});
    },
    data(){
      return {
        containableDom: null,
        containableObserver: null,
        vuescrollOptions: {
          bar: {
            showDelay: 500,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#1890FF',
            opacity: 1,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: 0,
            size: '6px',
            disable: false
          }
        }
      }
    },
    methods: {
      generateDomData() {
        const containableCells = this.containableDom.getElementsByClassName('facade-table-cell'),
          containableDomLength = containableCells.length;

        if (containableDomLength) {
          const containableChildHeight = containableCells[0].offsetHeight,
            containableHeight = containableChildHeight * (containableDomLength > this.CellSize ? this.CellSize : containableDomLength);
          this.containableDom.style['height'] = `${containableHeight}px`;
        } else {
          this.containableDom.style['height'] = 0;
        }
      }
    },
    destroyed() {
      this.containableObserver.disconnect();
    }
  }
</script>

<style lang="scss" scoped>
  
</style>