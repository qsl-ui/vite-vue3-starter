<template>
  <el-container class="app-layout">
    <el-aside class="aside" style="width: auto !important">
      <sidebar />
    </el-aside>

    <el-container class="container">
      <el-header class="header" height="100px">
        <navbar />
      </el-header>
      <el-main class="content" style="padding: 0px">
        <el-scrollbar class="scroll" id="mainScroll">
          <!--页面标签-->
          <div class="page-tag">{{ $route.meta.title }}</div>
          <section class="page-container">
            <transition name="fade-transform" mode="out-in">
              <router-view :key="key" />
            </transition>
          </section>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './SideBar'
import NavBar from './NavBar'

export default {
  name: 'Layout',
  components: {
    sidebar: SideBar,
    navbar: NavBar
  },
  filters: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.app-layout {
  .scroll {
    z-index: 4;
  }
}
</style>

<style scoped lang="scss">
.app-layout {
  width: 100%;
  height: 100vh;
  min-width: 1360px;

  .aside {
    position: relative;
    z-index: 9;
    background-color: #efeff4;

    // 去掉滚动条
    &::-webkit-scrollbar {
      width: 0;
      background-color: transparent;
    }
  }

  .header {
    background-color: #fff;
    padding: 0;
    z-index: 10;
  }
  .container {
    overflow: hidden;
    z-index: 8;
    .content {
      position: relative;
      z-index: 4;
      background-color: #fff;
      padding: 34px 0 0 0;

      .scroll {
        box-sizing: border-box;

        .page-container {
          box-sizing: border-box;
          padding: 0 40px;
        }
      }
    }
  }
}

.page-tag {
  color: #333a3f;
  font-size: 24px;
  font-weight: bold;
  margin: 26px 40px 20px 40px;
}
</style>
