<template>
    <div class="tab-bar">

        <!-- 设置了这个点击就能切换到对应页面了 -->
        <!-- <router-link to="/home">首页</router-link>
                        <router-link to="/favor">收藏</router-link>
                        <router-link to="/order">订单</router-link>
                        <router-link to="/message">消息</router-link> -->
        <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(index, item)">
                <img v-if="currentIndex === index" :src="getAssetURL(item.imageActive)" alt="">
                <img v-else :src="getAssetURL(item.image)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
</div>
</template>


<script setup>




import tabbarData from '@/assets/data/tabbarData.js'
import { getAssetURL } from '@/utils/load_assets_img'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentIndex = ref(0)

const router = useRouter()
function itemClick(index, item) {
    currentIndex.value = index
    router.push(item.path)

}

</script>
 

<style lang="less" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    border-top: 1px solid #f3f3f3;
    background-color: #fff;


    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 36px
        }

        .text {
            font-size: 12px;
            margin-top: 2px;
        }

        &.active {
            color: var(--primary-color)
        }
    }
}
</style>