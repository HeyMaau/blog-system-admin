import VueRouter from "vue-router";
import Vue from "vue";

//引入组件
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";

Vue.use(VueRouter)

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {path: '/', component: MainPage},
    {path: '/login', component: LoginPage}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = new VueRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    routes// `routes: routes` 的缩写
})

export default router
// 现在，应用已经启动了！