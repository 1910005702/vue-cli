<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
    <a-layout-sider
      theme="dark"
      v-model="collapsed"
      :trigger="null"
      collapsible
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <div>
        <a-menu
          :inlineIndent="inlineIndent"
          :defaultSelectedKeys="[$route.path]"
          :openKeys="openKeys"
          mode="inline"
          :inline-collapsed="collapsed"
          @openChange="onOpenChange"
          @click="menuClick"
        >
          <!-- 菜单遍历的开始 -->
          <template v-for="item in routes">
            <template v-if="!item.hidden">
              <!-- 如果当前遍历项没有children，视为子菜单项，注意所有的key都是path用于路由跳转，以及当前选中记录 -->
              <a-menu-item v-if="item.redirect" :key="item.children[0].path">
                <a-icon :type="item.children[0].icon" />
                <span>{{ item.children[0].name }}</span>
              </a-menu-item>
              <!-- 否则视为子菜单，传入菜单信息并且运用下面定义的函数式组件 -->
              <sub-menu v-else :key="item.path" :menu-info="item" />
            </template>
          </template>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Menu } from "ant-design-vue";
import { mapGetters } from "vuex";
// 定义函数式组件
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children.length" :key="menuInfo.path+'/'+item.path">
            <a-icon  :type="item.icon" />
            <span>{{ item.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true 此项必须被定义
  isSubMenu: true,
  props: {
    // 解构a-sub-menu的属性
    ...Menu.SubMenu.props,
    // 接收父级传递过来的菜单信息
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
export default {
  data() {
    return {
      // 菜单缩进
      inlineIndent: 12,
      // 默认不折叠
      collapsed: false,
      // 全部顶级父节点,用来控制所有父级菜单只展开其中的一项，可用遍历菜单信息进行赋值
      rootSubmenuKeys: ["sub1", "sub2", "sub3"],
      // 展开的父菜单项
      openKeys: [],
      // 选中的子菜单项
      defaultSelectedKeys: [this.$route.path],
      // 菜单信息，可从后台获取
      list: [
        {
          key: "1",
          title: "项目信息管理",
          path: "/infomationManage",
          icon: "iconfont icon-information",
        },
        {
          key: "2",
          title: "安全信息管理",
          path: "/safeInfoManage",
          icon: "iconfont icon-anquan",
          children: [
            {
              key: "2.1",
              title: "安全风险管理",
              path: "/safeRisk",
              icon: "",
              children: [
                {
                  key: "2.1.1",
                  title: "风险分类管理",
                  path: "/riskClassifyManage",
                  icon: "",
                },
                {
                  key: "2.1.2",
                  title: "分类辨识",
                  path: "/classifyIdentity",
                  icon: "",
                },
              ],
            },
          ],
        },
        {
          key: "3",
          title: "质量信息管理",
          path: "/qualityInfoManage",
          icon: "iconfont icon-zhiliang",
          children: [
            {
              key: "3.1",
              title: "质量控制点管理",
              path: "/controlPointManage",
              icon: "",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["routes"]),
  },
  created() {
    // 将从缓存中取出openKeys
    const openKeys = window.sessionStorage.getItem("openKeys");
    if (openKeys) {
      // 存在即赋值
      this.openKeys = JSON.parse(openKeys);
    }
    console.log(this.routes);
  },
  methods: {
    // 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
    menuClick({ item, key, keyPath }) {
      console.log(item, key, keyPath);
      // 获取到当前的key,并且跳转
      this.$router.push({
        path: key,
      });
    },
    onOpenChange(openKeys) {
      // 将当前打开的父级菜单存入缓存中
      window.sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
      //  控制只打开一个
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
  // 注册局部组件
  components: {
    "sub-menu": SubMenu,
  },
};
</script>
<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>