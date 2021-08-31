<template>
  <div ref="wrapperRef">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapperRef, {
      click: true,
      probeType: this.probeType, // 通过父组件传递过来的probeType的数字来确定是否开启监听滑动坐标
      pullUpLoad: this.pullUpLoad, // 是否开启上拉触发事件
    });

    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // 通过自定义事件将 坐标(position)发送出去
      this.$emit("scroll", position);
    });

    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    // 封装回到顶部的方法
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 完成下拉加载
    finishPullUp() {
      this.scroll.finishPullUp();
    },

    // 执行刷新refresh()
    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 获取当前的scrollY的坐标
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>