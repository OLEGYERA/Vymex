<template>
  <div class="facade-table-containable" :id="`table-containable-${this.id}`">
    <vuescroll :ops="vuescrollOptions"><slot/></vuescroll>
  </div>
</template>

<script>
  import vuescroll from "vuescroll";

  export default {
    name: 'Facades.Table.Scrollbar',
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      status: {
        type: Boolean,
        required: true
      },
      cellSize: Number,
      position: Number,
    },
    components: {vuescroll},
    mounted() {
      this.containableDom = document.getElementById(`table-containable-${this.id}`)
      this.panelDom = this.containableDom.getElementsByClassName('__panel')[0];
      this.viewDom = this.panelDom.getElementsByClassName('__view')[0]
      this.cellsDom = this.viewDom.getElementsByClassName('facade-table-cell');
      this.generateDomData()

      this.containableObserver = new MutationObserver(() => this.generateDomData())
      this.containableObserver.observe(this.viewDom, {childList: true});
    },
    data(){
      return {
        containableDom: null,
        panelDom: null,
        viewDom: null,
        cellsDom: null,

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
        this.panelDom.scrollTop = 0;
        const containableDomLength = this.cellsDom.length;
        if (containableDomLength) {
          const containableChildHeight = this.cellsDom[0].offsetHeight,
                containableHeight = containableChildHeight * (containableDomLength > this.cellSize ? this.cellSize : containableDomLength);
          this.containableDom.style['height'] = `${containableHeight}px`;
        } else {
          this.containableDom.style['height'] = 0;
        }
      },
      scrollbarByKey(dropdownCursor){
        const panelPosition = this.panelDom.scrollTop,
          panelHeight = this.panelDom.offsetHeight,
          cellHeight = this.cellsDom[0].offsetHeight;

        let currentCellPosition = dropdownCursor * cellHeight;
        if(currentCellPosition >= panelHeight + panelPosition){
          this.panelDom.scrollTop = currentCellPosition;
        } else {
          this.panelDom.scrollTop = currentCellPosition - (dropdownCursor % this.cellSize) * cellHeight;
        }
      }
    },
    watch: {
      status(){
        this.generateDomData()
      },
      position(cursor){
        this.scrollbarByKey(cursor)
      },
    },
    destroyed() {
      this.containableObserver.disconnect();
    }
  }
</script>
