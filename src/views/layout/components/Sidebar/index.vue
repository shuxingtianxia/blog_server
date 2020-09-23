<template>
  <div>
    <!-- 左边导航栏logo -->
    <img
      class="bar-img"
      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=267690508,3242002294&fm=26&gp=0.jpg"
      alt=""
      width="50px"
      height="50px"
    />
    <el-menu
      mode="vertical"
      :default-active="$route.path"
      :unique-opened="true"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routers"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
// import img_404 from '@/assets/404_images/404.png'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
// import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar']),
    routers() {
      console.log(this.$route.path)
      console.log(this.$router.options.routes)
      return this.$router.options.routes
    }
  }
}
</script>
<style lang="scss" scoped>
.bar-img {
  display: block;
  margin: 50px auto 0;
}
#app {
  // 主体区域
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 200px;
  } // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 200px !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background-color: #304156;
    a {
      display: inline-block;
      width: 100%;
    }
    .el-menu {
      border: none;
      width: 100%;
    }
  }
  .hideSidebar {
    .sidebar-container,
    .sidebar-container .el-menu {
      width: 200px !important;
      // overflow: inherit;
    }
    .main-container {
      margin-left: 36px;
    }
  }
  .hideSidebar {
    .submenu-title-noDropdown {
      padding-left: 10px !important;
      position: relative;
      .el-tooltip {
        padding: 0 10px !important;
      }
      span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
        opacity: 0;
        display: inline-block;
      }
      &:hover {
        span {
          display: block;
          border-radius: 3px;
          z-index: 1002;
          width: 140px;
          height: 56px;
          visibility: visible;
          position: absolute;
          right: -145px;
          text-align: left;
          text-indent: 20px;
          top: 0px;
          background-color: blue !important;
          opacity: 1;
        }
      }
    }
    .el-submenu {
      & > .el-submenu__title {
        padding-left: 10px !important;
        & > span {
          display: none;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
      .nest-menu {
        .el-submenu__icon-arrow {
          display: block !important;
        }
        span {
          display: inline-block !important;
        }
      }
    }
  }
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: 180px !important;
    background-color: blue !important;
    &:hover {
      background-color: blue !important;
    }
  }
  .el-menu--collapse .el-menu .el-submenu {
    min-width: 180px !important;
  }
}
</style>
