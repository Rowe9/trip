<template>
    <div class="home" ref="homeRef">
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box></home-search-box>
        <!-- <home-search-box :hot-suggests="hotSuggests"></home-search-box> -->

        <home-categories></home-categories>

        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar :start-date="'09.22'" :end-date="'09.23'"> </search-bar>
        </div>

        <!-- <home-content></home-content> -->
        <HomeContent></HomeContent>

        <!-- <div class="btn" @click="moreBtnClick()"><button>加载更多</button></div> -->
    </div>
</template>


<script>
export default { name: "home" }
</script>
<script setup>
import { watch } from 'vue'
import useHomeStore from '@/stores/modules/home';
import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue';
import useScroll from '@/hooks/useScroll'
import { ref } from 'vue'
import { computed } from 'vue';
import hyRequest from "@/services/request/index"
import searchBar from '@/components/search-bar/search-bar.vue'
import { onActivated } from 'vue';




// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()




const homeRef = ref()
// 解构：代表是在useScroll里的，这样下面的才能用它
// 这里加上then是返回一个promise，当有结果了之后就会调用then里面的东西
// 而不会使得加载出现数据和到达底部的信号改为false 同时进行
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false

        })
    }
})


// 搜索框显示的控制

// 方法一：
// const isShowSearchBar = ref(false)
// watch("scrollTop", (newTop) => {
//     isShowSearchBar.value = newTop > 100
// })

// 方法二：
// 计算属性有缓存，不会频繁来调用,因此选择下面这方法比较好
// 定义的可响应式数据，依赖另外一个可响应式数据，那么可以使用计算属性
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 350
})

// 跳转回home时，保留原来的位置
onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
})
</script>


<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 60px;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}

// 我的
// .home {
//     padding-bottom: 60px;
//     height: 100vh;
//     overflow-y: auto;
//     box-sizing: border-box;


//     .banner {
//         img {
//             width: 100%;

//         }
//     }

//     .search-bar {
//         position: fixed;
//         z-index: 9;
//         top: 0;
//         left: 0;
//         right: 0;
//         height: 45px;
//         padding: 16px 16px 10px;
//         background-color: #fff;
//     }
// }
</style>