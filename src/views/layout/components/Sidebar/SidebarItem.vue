<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden&&item.children">

        <router-link
          v-if="item.children && item.children.length === 1 && !item.children[0].children && item.meta.title === item.children[0].meta.title"
          :to="item.path + '/' + item.children[0].path"
          :key="item.children[0].name"
          >
          <el-menu-item :index="item.path + '/' + item.children[0].path" class="submenu-title-noDropdown">
            <span v-if="item.children[0].meta && item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
          </template>

          <template v-for="child in item.children">
            <sidebar-item
              class="nest-menu"
              v-if="child.children && child.children.length > 0 && !child.meta.isFather"
              :routes="[child]"
              :key="child.path"
            ></sidebar-item>
            <!-- 是否需要分组 -->
            <!-- <el-menu-item-group v-if="child.meta.isFather" :key="child.name">
              <template slot="title">{{ child.meta.title }}</template>
              <router-link :to="item.path + '/' + item1.path" :key="index" v-for="(item1, index) in child.children">
                <el-menu-item :index="item.path + '/' + item1.path">
                  <span v-if="child.meta && child.meta.title">{{ item1.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group> -->
            <router-link v-if="!child.meta.isFather && !child.meta.hideInMenu" :to="item.path + '/' + child.path" :key="child.name">
              <el-menu-item :index="item.path + '/' + child.path">
                <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
// XXX: 左边菜单栏(新房/消费借吧申请管理)太长，将原来14号字体设置成13号。
.el-menu-item {
  font-size: 13px;
}
</style>
