<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="navbar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlRef1"
      :class="{ tabTop: isTabTop }"
      v-show="isTabTop"
    />

    <!-- 使用Better-Scroll插件 | 传递probe-tyep="3"来表示监听滑动坐标 | 使用自定义事件执行contentScroll方法-->
    <scroll
      class="wrapper"
      ref="wrapperRef"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMoreGoods"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <!-- 推荐 -->
      <recommend-view :recommends="recommends" />
      <!-- 特点卖品 -->
      <feature-view />
      <!-- 选项卡控制 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlRef2"
      />
      <!-- 商品列表 -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 回到顶部 | 组件上使用监听事件不要使用.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "components/common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [], // 轮播图
      recommends: [], // 推荐
      // 商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop", // 默认显示的商品数据
      isShowBackTop: false, // 默认隐藏回到顶部的元素
      tabOffsetTop: 0, // tab-control距离顶部的距离
      isTabTop: false, // tab-control是否置顶
      scrollY: 0, // 当前scroll距离顶部的距离
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 获取Home的多个数据
    this.getHomeMultidata();

    // 获取Home的商品数据 | 获取默认加载的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 执行防抖动函数
    const refresh = debounce(this.$refs.wrapperRef.refresh, 100);
    // Home.vue一挂载就得监听事件总线的方法
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // 根据选项卡的index展示不同的goods数据
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControlRef1.currentIndex = index;
      this.$refs.tabControlRef2.currentIndex = index;
    },
    backClick() {
      // 使用$refs获取某一个组件的引用执行里面的methods方法
      this.$refs.wrapperRef.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 子组件传来的坐标的y坐标来判断是否显示 回到顶部图标
      this.isShowBackTop = Math.abs(position.y) > 1000;

      //
      this.isTabTop = Math.abs(position.y) > this.tabOffsetTop - 44;
    },
    loadMoreGoods() {
      // 加载更多商品
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      // swiper图片加载完成
      this.tabOffsetTop = this.$refs.tabControlRef2.$el.offsetTop;
    },

    /**
     * 发送网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; // 每次请求的数据都是当前page + 1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;

        // 完成加载商品数据后完成下拉事件
        this.$refs.wrapperRef.finishPullUp();
      });
    },
  },
  // 当前路由活跃时触发
  activated() {
    // 跳到离开时的位置
    this.$refs.wrapperRef.scroll.scrollTo(0, this.scrollY, 0);
    this.$refs.wrapperRef.refresh();
  },
  // 当前路由不活跃时触发
  deactivated() {
    // 离开时保存离开时候的位置
    this.scrollY = this.$refs.wrapperRef.getScrollY();
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.navbar {
  background: var(--color-tint);
  color: white;
}
.wrapper {
  height: calc(100% - 49px);
  overflow: hidden;
}
.tabTop {
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>