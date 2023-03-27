<!-- 热门、A\B\C等等 -->
<template>
    <div class="city-group">

        <van-index-bar :sticky="false" :index-list="indexList">
            <!-- 热门部分 -->
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
                </template>
            </div>
            <!-- 各种城市部分 -->
            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)" />
                </template>
            </template>
        </van-index-bar>




    <!-- <template v-for="(group, index) in groupData.cities" :key="index">
            <div class="group-item">
                标题ABCD部分
                <h2>标题：{{ group.group }}</h2>
                <div class="list">
                各个地区名字部分
                    <template v-for="(city, indey) in group.cities" :key="indey">
                        <div class="city">{{ city.cityName }}</div>
                    </template>
                </div>
            </div>
            </template> -->
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city';

const router = useRouter()

// 定义props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

// 动态的索引
const indexList = computed(() => {
    // 注意这里要加上props，而不是直接获取到groupData
    const list = props.groupData.cities.map(item => item.group)
    // 在数组的开头加上一个#号
    list.unshift("#")
    return list
})

// 监听城市的点击
const cityStore = useCityStore()
const cityClick = (city) => {
    // 选中当前城市：方案一：使用事件总线。方案二：使用store，store的作用是存储数据
    cityStore.currentCity = city
    // 返回上一级
    router.back()
}
</script>


<style lang="less" scoped>
.list {
    display: flex;
    // 换行
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
    }
}
</style>