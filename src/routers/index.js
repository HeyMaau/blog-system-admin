import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import MainPage from "@/components/MainPage";
import LoginPage from "@/components/pages/LoginPage.vue";
import UserList from "@/components/pages/UserPage.vue";
import CategoryPage from "@/components/pages/CategoryPage.vue";
import ArticleCommentPage from "@/components/pages/ArticleCommentPage";
import ArticlePage from "@/components/pages/ArticlePage.vue";
import EditArticle from "@/components/pages/EditArticlePage.vue";
import HomePage from "@/components/HomePage";
import ThinkingPage from "@/components/pages/ThinkingPage";
import ThinkingCommentPage from "@/components/pages/ThinkingCommentPage";

const routes = [
    {
        path: '/', component: MainPage, children: [
            {path: '', component: HomePage},
            {path: 'user', component: UserList},
            {path: 'category', component: CategoryPage},
            {path: 'article/comment', component: ArticleCommentPage},
            {path: 'article', component: ArticlePage},
            {path: 'thinking', component: ThinkingPage},
            {path: 'thinking/comment', component: ThinkingCommentPage}
        ]
    },
    {path: '/login', component: LoginPage},
    {path: '/article/:id', component: EditArticle, name: 'editArticle'}
]

const router = createRouter({
    history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory(),
    routes
})

export default router