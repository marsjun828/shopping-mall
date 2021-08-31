<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
// import TabBarItem from "../tabbar/TabBarItem";
export default {
  name: "TabBar",
  // TabBarItem,
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background: #f6f6f6;
  position: fixed;
  z-index: 1000;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
</style>