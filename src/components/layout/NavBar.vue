<template>
  <div class="navbar-box">
    <div class="navbar-search">
      <el-input placeholder="Search..." v-model="searchContent">
        <template slot="prepend">
          <div class="icon" @click="onClickSearch"></div>
        </template>
      </el-input>
    </div>
    <div class="navbar-right">
      <el-badge :value="0" :hidden="true" :max="99" class="item">
        <i class="icon-notification el-icon-message-solid"></i>
      </el-badge>

      <!--头像-->
      <div class="avatar-wrapper">
        <div class="image-box">
          <img :src="userInfo.avatar" alt="" v-if="userInfo.avatar" />
          <img :src="require('@/assets/image/icon/icon-default-avatar.png')" alt="" v-else />
        </div>
      </div>
      <!--用户名-->
      <el-dropdown>
        <div class="user-info">
          <span class="name">{{ userInfo.username }}</span>
          <span class="status"><i class="dot"></i> 在线</span>
        </div>
        <i class="el-icon-arrow-down icon-right"></i>
        <el-dropdown-menu>
          <el-dropdown-item :command="0">
            <s-confirm-box
              type="warning"
              text="确定要退出登录吗？"
              content=""
              @confirm="handleLogout"
            >
              <span class="logout">退出登录</span>
            </s-confirm-box>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { logout } from '@/network/api/api-base'
import ConfirmBox from '@/components/ConfirmBox'

export default {
  name: 'NavBar',
  components: {
    's-confirm-box': ConfirmBox
  },
  filters: {},
  props: {},
  data() {
    return {
      searchContent: ''
    }
  },
  computed: {
    ...mapState('menu', ['isCollapse']),
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickSearch() {},

    // 退出登录
    handleLogout() {
      logout()
        .then((res) => {
          if (res.code === 200) {
            let _url = window.location.origin
            window.location.href = res.data + '?redirect_url=' + _url
          }
        })
        .catch((e) => {
          this.$ErrorMessage(e.msg || '')
        })
    }
  }
}
</script>

<style lang="scss">
.navbar-search {
  .el-input {
    height: 40px;
    width: 360px;

    input {
      width: 300px;
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 5px 10px;
      color: #000;
      height: 40px;
      font-size: 18px;
      font-weight: 300;
    }

    .el-input-group__prepend {
      background-color: transparent;
      border: none;
    }
  }
}

.navbar-right {
  .el-badge__content {
    padding: 0 4.5px;
    height: 14px;
    line-height: 14px;
    background-color: #fb4444;
  }
}
</style>

<style scoped lang="scss">
@import '~@/assets/style/mixin.scss';

.navbar-box {
  display: flex;
  justify-content: space-between;
  height: 96px;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(230, 231, 236, 0.4);

  .navbar-search {
    height: 100%;
    padding: 0 15px;
    @include flex-center;
    cursor: pointer;

    .icon {
      width: 20px;
      height: 20px;
      background-size: 20px !important;
      background: url(~@/assets/image/icon/icon-nav-search-normal.png) 0 0 no-repeat;

      &:hover {
        background: url(~@/assets/image/icon/icon-nav-search-hover.png) 0 0 no-repeat;
      }
    }
  }

  .navbar-right {
    margin-top: 20px;
    margin-right: 50px;

    .avatar-wrapper {
      display: inline-block;
      margin-left: 50px;
      margin-right: 10px;
      position: relative;
      top: 5px;

      .image-box {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .icon-notification {
    color: #b7b9c5;
    font-size: 24px;
    position: relative;
    top: -10px;
  }

  .user-info {
    display: inline-block;
    cursor: pointer;
    user-select: none;

    .name {
      font-size: 16px;
      color: #212937;
      display: block;
    }

    .status {
      color: #91949f;
      font-size: 12px;

      .dot {
        display: inline-block;
        background-color: #6adbaa;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
  }

  .icon-right {
    position: relative;
    top: -10px;
    color: #555a6f;
    font-size: 10px;
    margin-left: 15px;
  }
}
</style>
