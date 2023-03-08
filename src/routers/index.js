import VueRouter from "vue-router";
import Vue from "vue";

//引入组件
import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserList from "@/components/UserList";
import CategoryList from "@/components/CategoryList";
import CommentList from "@/components/CommentList";
import ArticleList from "@/components/ArticleList";
import EditArticle from "@/components/EditArticle";

if (process.env.NODE_ENV !== 'production') {
    Vue.use(VueRouter)
}

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/', component: MainPage, children: [
            {path: 'user', component: UserList},
            {path: 'category', component: CategoryList},
            {path: 'comment', component: CommentList},
            {path: 'article', component: ArticleList}
        ]
    },
    {path: '/login', component: LoginPage},
    {path: '/article/:id', component: EditArticle, name: 'editArticle'}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = new VueRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    routes// `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
    if (to.path !== "/login") {
        let token = sessionStorage.getItem('token');
        if (token == null || token.length === 0) {
            next('/login')
        }
    }
    next()
})

export default router
// 现在，应用已经启动了！