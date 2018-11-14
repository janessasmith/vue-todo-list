import Vue from 'vue' // 引用vue文件
import Router from 'vue-router' // 引用vue路由模块，并赋值给变量Router
import TodoList from '@/components/TodoList' // TodoList.vue模版，并赋值给变量TodoList，这里“@”相当于“../”

Vue.use(Router) // 使用路由

export default new Router({
  routes: [ // 进行路由配置，规定“/”引入到TodoList组件
    {
      path: '/',
      name: 'TodoList',
      component: TodoList // 注册TodoList组件
    }
  ]
})
