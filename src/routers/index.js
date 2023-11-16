import VueRouter from "vue-router";
import Vue from "vue";

import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage";
import UserList from "@/components/UserList";
import CategoryPage from "@/components/pages/CategoryPage.vue";
import ArticleCommentPage from "@/components/pages/ArticleCommentPage";
import ArticleList from "@/components/ArticleList";
import EditArticle from "@/components/EditArticle";
import HomePage from "@/components/HomePage";
import ThinkingPage from "@/components/pages/ThinkingPage";
import ThinkingCommentPage from "@/components/pages/ThinkingCommentPage";

if (process.env.NODE_ENV !== 'production') {
    Vue.use(VueRouter)
}

const routes = [
    {
        path: '/', component: MainPage, children: [
            {path: '', component: HomePage},
            {path: 'user', component: UserList},
            {path: 'category', component: CategoryPage},
            {path: 'article/comment', component: ArticleCommentPage},
            {path: 'article', component: ArticleList},
            {path: 'thinking', component: ThinkingPage},
            {path: 'thinking/comment', component: ThinkingCommentPage}
        ]
    },
    {path: '/login', component: LoginPage},
    {path: '/article/:id', component: EditArticle, name: 'editArticle'}
]

const router = new VueRouter({
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
    routes
})

export default router