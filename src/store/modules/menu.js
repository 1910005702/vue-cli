import { routes } from '@/router'
import Layout from '@/layout/index.vue'
const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, route) => {
      state.addroutes = route
      state.routes = route.concat(routes)
    },
    RESET_ROUTES(state, route) {
      state.addroutes = []
      state.routes = []
    }
  },
  actions: {
    GenerateRoutes({ commit }, name) {
      return new Promise(resolve => {
        let router_data = [];
        // 向后端请求路由数据
        if (name === 'admin') {
          router_data = [
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": "mail",
                  "id": 1.1,
                  "menuType": 0,
                  "name": "首页",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'home/index',
                  "path": "/home",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "",
              "id": 1,
              "menuType": 0,
              "name": "首页",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/",
              "filePath": '',
              "redirect": '/home',
              "component": "Layout",
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 1.1,
                  "menuType": 0,
                  "name": "测试1",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index1',
                  "path": "index1",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 1.2,
                  "menuType": 0,
                  "name": "测试2",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index2',
                  "path": "index2",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "mail",
              "id": 1,
              "menuType": 0,
              "name": "用户",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/sub1",
              "component": "Layout"
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 2.1,
                  "menuType": 0,
                  "name": "测试3",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index3',
                  "path": "index3",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "mail",
              "id": 2,
              "menuType": 0,
              "name": "菜单",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/sub2",
              "component": "Layout"
            }
          ];
        } else if (name === 'admin123') {
          router_data = [
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": "mail",
                  "id": 1.1,
                  "menuType": 0,
                  "name": "首页",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'home/index',
                  "path": "/home",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "",
              "id": 1,
              "menuType": 0,
              "name": "首页",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/",
              "filePath": '',
              "redirect": '/home',
              "component": "Layout",
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 3.1,
                  "menuType": 0,
                  "name": "测试4",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index4',
                  "path": "index4",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 3.2,
                  "menuType": 0,
                  "name": "测试5",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index5',
                  "path": "index5",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "mail",
              "id": 1,
              "menuType": 0,
              "name": "用户",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/sub3",
              "component": "Layout"
            },
          ]
        }
        const accessedRoutes = filterAsyncRouter(router_data);
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
};
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  // console.log(asyncRouterMap)
  return asyncRouterMap.filter(route => {
    // console.log(route.component)
    // console.log(Layout)
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === ' ') {
        route.component = loadView(route.filePath)
        // console.log(loadView(route.path))
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve)
}
export default permission;