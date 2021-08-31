<template>
  <div>
    <!-- tab-bar组件 -->
    <tab-bar>
      <!-- 每个tab-bar组件中填充tab-bar-item组件到slot中 -->
      <tab-bar-item link="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item link="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/category_active.svg"
          alt=""
        />
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item link="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/shopping_cart.svg" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/shopping_cart_active.svg"
        />
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item link="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/profile_active.svg"
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
