<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url" alt="">
            </div>
            <div class="info">
                <div class="location">
                    <img src="@/assets/img/home/location.png" alt="">
                    <span class="text">{{ itemData.location }}</span>
                </div>
                <div class="name">{{ itemData.houseName }}</div>
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="price">
                    <div class="new">￥{{ itemData.finalPrice }}</div>
                    <div class="old">￥{{ itemData.productPrice }}</div>
                    <!-- 有些没有价格优惠，如果不存在则不读取 -->
                    <div class="tip">{{ itemData?.priceTipBadge?.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})

const itemScore = computed(() => {
    return Number(props.itemData.commentScore)
})
</script>


<style lang="less" scoped>
.house-item {
    width: 50%;

    .item-inner {
        // position: relative;
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;

        .cover {
            img {
                width: 100%;
            }
        }

        .info {
            padding: 8px 10px;
            padding: 8px 10px;
            color: #666;
            font-size: 12px;

            .location {
                display: flex;
                align-items: center;

                img {
                    width: 12px;
                    height: 12px;
                }

                .text {
                    margin-left: 2px;
                    font-size: 12px;
                    color: #666;
                }
            }



            .name {
                font-size: 14px;
                margin: 5px 0;
                color: #333;
                overflow: hidden;
                // 当文本溢出包含元素时，显示省略号来代表溢出文本，clip是修剪文本
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

            }

            .price {
                display: flex;
                // justify-content: space-between;
                align-items: flex-start;
                margin: 8px 0;

                .new {
                    color: #ff9645;
                    font-size: 14px;
                }

                .old {
                    margin: 0 3px;
                    color: #999;
                    font-size: 12px;
                    text-decoration: line-through;
                }

                .tip {
                    background-image: linear-gradient(270deg, #f66, #ff9f9f);
                    color: #fff;
                    padding: 0 6px;
                    border-radius: 8px;
                }
            }


        }
    }
}
</style>