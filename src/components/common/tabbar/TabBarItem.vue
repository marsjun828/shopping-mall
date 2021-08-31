<template>
  <div class="tab-bar-item" @click="itemClick">
    <template v-if="!isActive">
      <slot name="item-icon"></slot>
    </template>
    <template v-else>
      <slot name="item-icon-active"></slot>
    </template>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activeColor: {
      type: String,
      default: "#428cff",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // 当前的活跃的路由的path和我点击获取的link是否相等： 不相等即为不活跃 false | 相等即为活跃 true
      return this.$route.path.indexOf(this.link) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  cursor: pointer;
}
.tab-bar-item img {
  width: 26px;
  height: 26px;
  vertical-align: middle;
  margin-top: 2px;
}
</style>