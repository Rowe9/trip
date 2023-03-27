<template>
    <div class="city top-page">
        <!-- 顶部部分 -->
        <div class="top">
            <!-- 1.搜索框 -->
            <van-search v-model="searchValue" shape="round" placeholder="城市/区域/位置" @search="onSearch"
                @cancel="cancelClick" show-action="true" />

            <!-- 2.tab的切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
                <!-- <van-tab title="国内·港澳台"></van-tab>
            <van-tab title="海外"></van-tab> -->
            </van-tabs>
        </div>


        <!-- 内容部分 -->
        <div class="content">
            <template v-for="(value, key, index) in allCities">
                <city-group v-show="tabActive===key" :group-data="value"></city-group>
            </template>

        </div>

    </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import HYRequest from "@/services/request"
import { getCityAll } from "@/services";
import axios from 'axios';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import cityGroup from './cpns/city-group.vue'

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const cancelClick = () => {
    router.back()
}

// tab切换
const tabActive = ref()


// // // 网络请求：请求城市的数据
// HYRequest.get({
//     url: "/city/all"
// }).then(res => {
//     console.log(res)
// })



// 这个位置发送网络请求有两个缺点：
// 1.如果网络请求太多，那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
// 2.如果页面封装了很多的子组件，子组件需要这些数据，我们必须一步步将数据传递过去（props）
// 网络请求：请求城市的数据
// 去服务器还没拿到数据的时候会返回undefined，为了避免这样在这里加上{}，默认是一个空对象
// const allCity = ref({})
// getCityAll().then(res => {
//     allCity.value = res.data
// })


// // 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)


// 目的：获取选中标签后的数据
// 1.获取正确的key：将tabs中绑定的tabAction正确绑定
// 2.根据key从allCities获取数据后，默认直接获取的数据不是响应式的，所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>


<style lang="less" scoped>
.city {
    // top固定定位

    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    // }

    // .content {
    //     // 顶部设置为固定定位之后，会遮挡下面一些内容，所以设置这个可以避免
    //     padding-top: 98px;
    // }
    .top {
        position: relative;
        z-index: 9;
    }

    .content {
        // 设置下面的高度为整个页面减去上面的高度，在这个范围内滚动
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>