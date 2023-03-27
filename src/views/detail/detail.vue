<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control ref="tabControlRef" :titles=names v-if="showTabControl" @tabItemClick="tabClick"
            class="tabs"></tab-control>

        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />

        <div class="main" v-if="mainPart" v-memo=[mainPart]>
            <!-- 轮播图 -->
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
            <!-- 方法一：加上问号。法二：v-if判断 -->
            <!-- <detail-swipe  :swipe-data="mainPart?.topModule?.housePicture?.housePics"></detail-swipe> -->

            <!-- 轮播图下的详细信息 -->
            <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"></detail-infos>

            <!-- 房屋设施信息等 -->
            <div class="facility">
                <detail-facility name="设施" :ref="getSectionRef"
                    :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
            </div>

            <!-- 房东信息 -->
            <div class="landlord">
                <detail-landlord name="房东" :ref="getSectionRef"
                    :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
            </div>


            <!-- 热门评论 -->
            <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"></detail-comment>

            <!-- 须知 -->
            <detail-notice name="须知" :ref="getSectionRef"
                :order-rules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>

            <!-- 地图 -->
            <detail-map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>


            <!-- 价格说明 -->
            <detail-intro :priceIntro="mainPart.introductionModule"></detail-intro>



        </div>

        <!-- 底部 -->
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">去哪儿旅途，永无止境！</div>
        </div>

        <!-- 预定当前房源 -->

        <detail-order :price="price">

        </detail-order>




    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from "@/services/modules/detail"
import { ref, computed, watch } from 'vue'
import DetailSwipe from './cpns/detail-swipe.vue'
import DetailInfos from './cpns/detail-infos.vue'
import DetailFacility from './cpns/detail-facility.vue'
import DetailLandlord from './cpns/detail-landlord.vue'
import DetailComment from './cpns/detail-comment.vue'
import DetailNotice from './cpns/detail-notice.vue'
import DetailMap from './cpns/detail-map.vue'
import DetailIntro from './cpns/detail-intro.vue'
import DetailOrder from './cpns/detail-order.vue'
import TabControl from '@/components/tab-control/tab-control.vue'
import useScroll from '@/hooks/useScroll'

import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
const route = useRoute()
const router = useRouter()
const houseId = route.params.id








// 发送网络请求获取数据
// 拿一个变量来存储数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)

const price = computed(() => detailInfos.value?.currentHouse)

getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})


const onClickLeft = () => {
    router.back()
}

// tab-control相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    return scrollTop.value >= 300
})



const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)//传入对象，返回属性名，也就是"房东”“须知”等等
})
// 绑定一个函数，给每个组件，这样就可以获取对应的位置
// 利用上面绑定的ref传递过来的value值，value就是元素，元素就是组件，value.$el就是组件的根元素
const getSectionRef = (value) => {
    if (!value) return
    // 从元素当中获取它的name属性
    const name = value.$el.getAttribute("name")
    // 用name来作为key，组件的根元素来作为他的值
    sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    // 点击既可跳转滚动到对应位置   
    const key = Object.keys(sectionEls.value)[index]//不懂
    const el = sectionEls.value[key]//不懂
    let distance = el.offsetTop
    // 也就是索引=0的时候，不减去44
    if (index !== 0) {
        distance = distance - 44
    }
    isClick = true
    currentDistance = distance

    detailRef.value.scrollTo({
        top: distance,
        // top: landlordRef.value.$el.offsetTop - 44,
        behavior: "smooth"

    })
}


const tabControlRef = ref()
// 页面滚动，滚动时匹配对应的tabControl的index
watch(scrollTop, (newValue) => {
    // let distance = el.offsetTop
    // if (currentDistance === distance) {
    if (newValue === currentDistance) {
        isClick = false
    }
    // 如果是通过点击的，那么就不执行滚动时匹配对应的tabControl的index
    if (isClick) return
    // 获取所有区域的offsetTop
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)//map传入一个函数，els里面的每一个元素分别调用每一个map的回调函数后的值
    // values是一个数组


    // 根据newValue匹配想要的索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44) {
            index = i - 1
            break
        }
    }
    // console.log(index)打印滚动页面时，位置对应的index
    // 控制滑动位置和tabControl相互匹配
    // 拿到currentIndex的值将他改变
    // 将我们tabControl的index传递带个tabControl组件，调用里面的函数setCurrentIndex
    tabControlRef.value?.setCurrentIndex(index)

})
</script>


<style lang="less" scoped>
.detail {

    padding-bottom: 40px;

    .tabs {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 120px;

        img {
            width: 123px;
        }

        .text {
            margin-top: 12px;
            font-size: 12px;
            color: #7688a7;
        }


    }
}
</style>