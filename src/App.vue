<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {getCookie, setCookie} from "./utils/cookie-util.ts";
import {COOKIE_KEY_HAS_CLOSED_BROWSER} from "./utils/constants.js";

let hasClosedBrowserFlag = getCookie(COOKIE_KEY_HAS_CLOSED_BROWSER);
if (hasClosedBrowserFlag == null) {
  localStorage.removeItem('token')
  setCookie(`${COOKIE_KEY_HAS_CLOSED_BROWSER}=false`)
}
</script>

<style>
#app {
  height: 100%;
}
</style>
