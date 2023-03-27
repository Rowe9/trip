<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>

            <template #indicator="{ active, total }">
                <div class="indicator">{{ active }}/{{ swipeData.length }}-{{ total }}</div>
            </template>
        </van-swipe>


    </div>
</template>

<script setup>
const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []

    }
})
</script>


<style lang="less" scoped>
.swipe {
    .swipe-list {
        .item {
            img {
                width: 100%;
            }
        }

        .indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
        }
    }
}
</style>