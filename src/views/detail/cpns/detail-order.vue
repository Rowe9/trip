<template>
    <div class="order">

        <div class="chat">
            <div class="icon"><van-icon name="chat-o" /></div>
            <div class="text">聊天</div>
        </div>

        <div class="price">
            <div class="finalPrice">￥{{ price.finalPrice }}</div>
            <div class="unit">{{ price.priceMark }}</div>
            <div class="productPrice">￥{{ `￥` + price.productPrice }}</div>
        </div>

        <div class="orderCurrent">
            <div class="icon"><van-icon name="completed" /></div>
            <div class="text">预定当前房源</div>
        </div>

    </div>
</template>

<script setup>


const props = defineProps({
    price: {
        type: Object,
        default: () => ({})
    }
})




</script>


<style lang="less" scoped>
.order {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    // justify-content: center;
    height: 55px;
    background-color: #fff;
    z-index: 999;


    .chat {
        // flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 0 10px;
        border-right: 1px solid #666;

        font-size: 15px;

        .icon {}

        .text {}

    }


    .price {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;

        .finalPrice {
            flex: 1;
            color: var(--van-primary-color);
            font-size: 18px;
            padding-right: 5px;
        }

        .unit {
            margin: 0 6px;
        }

        .productPrice {
            text-decoration: line-through;
            color: #666;
            font-size: 14px;


        }
    }

    .orderCurrent {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 54px;
        background-color: var(--van-primary-color);
        font-size: 16px;
        color: #fff;

        .icon {
            padding-left: 20px;
            padding: 5px;
        }

        .text {
            padding-right: 20px;
        }
    }

}
</style>