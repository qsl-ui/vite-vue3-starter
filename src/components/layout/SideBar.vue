<template>
  <el-scrollbar class="scroll">
    <div class="system-logo">
      <div class="system-icon" @click="onClickMenu">
        <img src="@/assets/image/system-logo.png" alt="" />
      </div>
      <div v-if="!isCollapse" class="system-info">
        <p>MRP太空系统 <i class="icon-menu el-icon-s-fold" @click="onClickMenu"></i></p>
        <span>梦嘉统一登录平台</span>
      </div>
    </div>

    <el-menu
      :collapse="isCollapse"
      mode="vertical"
      :default-active="$route.path"
      :default-openeds="['/system', '/user']"
      router
      class="menu"
      :style="{ width: isCollapse ? '88px' : '240px' }"
    >
      <sidebar-item v-for="(item, index) in menu" :key="index" :item="item"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SideBar',
  components: {
    SidebarItem
  },
  filters: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('menu', ['isCollapse', 'menu'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations('menu', ['TOGGLE_MENU', 'SET_MENU']),
    // 点击菜单按钮
    onClickMenu() {
      this.TOGGLE_MENU(!this.isCollapse)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/style/mixin.scss';

.menu {
  position: relative;
  width: 240px;
  height: calc(100% - 150px);
  box-sizing: border-box;
  /*padding: 8px 0 0 12px;*/
  background-color: #efeff4;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  cursor: pointer;
  transition: width 200ms;
}

.system-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 33px;
  margin-bottom: 20px;
  .system-icon {
    width: 39px;
    height: 39px;
    margin-right: 8px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .icon-menu {
    color: #555a6f;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
  }

  .system-info {
    text-align: left;

    p {
      font-size: 18px;
      color: #212937;
      font-weight: 400;
      margin: 0;
      white-space: nowrap;
    }

    span {
      font-size: 10px;
      color: #91949f;
      position: relative;
      top: -5px;
    }
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
