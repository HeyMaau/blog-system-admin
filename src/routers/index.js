import VueRouter from "vue-router";
import Vue from "vue";

import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserList from "@/components/UserList";
import CategoryList from "@/components/CategoryList";
import CommentList from "@/components/CommentList";
import ArticleList from "@/components/ArticleList";
import EditArticle from "@/components/EditArticle";
import HomePage from "@/components/HomePage";

if (process.env.NODE_ENV !== 'production') {
    Vue.use(VueRouter)
}

const routes = [
    {
        path: '/', component: MainPage, children: [
            {path: '', component: HomePage},
            {path: 'user', component: UserList},
            {path: 'category', component: CategoryList},
            {path: 'comment', component: CommentList},
            {path: 'article', component: ArticleList}
        ]
    },
    {path: '/login', component: LoginPage},
    {path: '/article/:id', component: EditArticle, name: 'editArticle'}
]

const router = new VueRouter({
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        let token = sessionStorage.getItem('token');
        if (token == null || token.length === 0) {
            next('/login')
        }
    }
    next()
})

export default router