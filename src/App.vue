<template>
    <div class="app">
        <!-- <keep-alive includes="home">
            <router-view></router-view>
        </keep-alive> -->

        <!-- 现在建议这样写 -->
        <router-view v-slot="props">
            <keep-alive include="home">
                <component :is="props.Component"></component>
            </keep-alive>
        </router-view>

        <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
        <loading></loading>
    </div>
</template>

<script setup>
import TabBar from './components/tab-bar/tab-bar01.vue'
import { useRoute } from 'vue-router'
import loading from '@/components/loading/loading.vue'
const route = useRoute()

let arr = ["1", "2", "3"]
let b = arr.filter((item, index, a) => {
    return item + 1
})
console.log(b)
</script>


<style lang="less" scoped></style>