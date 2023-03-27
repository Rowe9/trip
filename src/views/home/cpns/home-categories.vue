<template>
    <div class="categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
</div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)


</script>


<style lang="less" scoped>
.categories {
    display: flex;
    // 设置为页面不滚动，只滚动当前盒子
    overflow-x: auto;
    padding: 0 10px;
    height: 80px;
    margin-top: 8px;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    .item {
        // 将默认为1的压缩改为不压缩。
        flex-shrink: 0;
        width: 70px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 32px;
            height: 32px;
        }

        .text {
            font-size: 12px;
            margin-top: 8px;
        }
    }
}
</style>