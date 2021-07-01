<template>
  <el-submenu :index="item.path" v-if="item.children">
    <template slot="title">
      <i :class="['icon', item.meta.icon]"></i>
      <!--      <c-icon class="icon" :icon="item.meta.icon"></c-icon>-->
      <span>{{ item.meta.title }}</span>
    </template>
    <sidebar-item v-for="(child, i) in item.children" :key="i" :item="child"></sidebar-item>
  </el-submenu>
  <el-menu-item :index="item.path" v-else-if="!item.hidden">
    <i v-if="item.meta.icon" :class="['icon', item.meta.icon]"></i>
    <!--    <c-icon v-if="item.meta.icon" class="icon" :icon="item.meta.icon"></c-icon>-->
    <span>{{ item.meta.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss">
.el-tooltip__popper.is-dark .icon {
  width: 30px;
  height: 30px;
  margin-right: 18px;
}

.menu.el-menu {
  .el-menu {
    background-color: #efeff4;
  }
  & > .el-menu-item,
  .el-submenu__title {
    height: 42px;
    line-height: 42px;
    padding-bottom: 10px;
  }
  .el-menu-item,
  .el-submenu__title {
    color: #555a6f;
    font-size: 14px;
  }
  .icon {
    margin-right: 11px;
    margin-left: 10px;
    font-size: 18px;
  }
  .icon-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #2842c8;
    margin-right: 11px;
  }
  .el-submenu .el-menu-item {
    padding-left: 60px !important;
  }
  .el-menu-item.is-active,
  .el-submenu.is-active {
    background-color: #fff;
    color: #2842c8;
    &:focus {
      background-color: #fff;
    }
    &:hover {
      background-color: #fff;
    }
  }
  & > .el-menu-item:hover,
  .el-submenu__title:hover {
    background-color: inherit;
    color: #2842c8;
    .icon {
      color: #2842c8;
    }
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: transparent;
    }
  }
  .el-submenu.is-active .el-submenu__title {
    background-color: #efeff4;
  }
  .el-menu.el-menu--inline {
    .el-menu-item {
      &:focus {
        background-color: transparent;
      }
      &:hover {
        background-color: transparent;
        color: #2842c8;
        transition: transform 0.1s linear;
      }
      &.is-active {
        color: #2842c8;
        font-weight: bold;
        padding-left: 40px !important;
        background-color: #fff;
        margin-right: -2px;
        &:before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #2842c8;
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
