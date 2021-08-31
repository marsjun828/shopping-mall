<template>
  <!-- 导航栏 -->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
  display: flex;
}
.center {
  height: 44px;
  line-height: 44px;
  flex: 1;
  text-align: center;
}
.left,
.right {
  width: 60px;
}
</style>