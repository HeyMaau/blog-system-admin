import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import MainPage from "@/components/MainPage.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import UserList from "@/components/pages/UserPage.vue";
import CategoryPage from "@/components/pages/CategoryPage.vue";
import ArticleCommentPage from "@/components/pages/ArticleCommentPage.vue";
import ArticlePage from "@/components/pages/ArticlePage.vue";
import EditArticle from "@/components/pages/EditArticlePage.vue";
import HomePage from "@/components/pages/HomePage.vue";
import ThinkingPage from "@/components/pages/ThinkingPage.vue";
import ThinkingCommentPage from "@/components/pages/ThinkingCommentPage.vue";
import AudioPage from "@/components/pages/AudioPage.vue";
import FriendLinkPage from "@/components/pages/FriendLinkPage.vue";
import AppManagePage from "@/components/pages/AppManagePage.vue";

const routes = [
    {
        path: '/', component: MainPage, children: [
            {path: '', component: HomePage},
            {path: 'user', component: UserList},
            {path: 'category', component: CategoryPage},
            {path: 'article/comment', component: ArticleCommentPage},
            {path: 'article', component: ArticlePage},
            {path: 'thinking', component: ThinkingPage},
            {path: 'thinking/comment', component: ThinkingCommentPage},
            {path: 'audio', component: AudioPage},
            {path: 'friend_link', component: FriendLinkPage},
            {path: 'app', component: AppManagePage}
        ]
    },
    {path: '/login', component: LoginPage},
    {path: '/article/:id', component: EditArticle, name: 'editArticle'}
]

const router = createRouter({
    history: import.meta.env.PROD ? createWebHistory() : createWebHashHistory(),
    routes
})

export default router
