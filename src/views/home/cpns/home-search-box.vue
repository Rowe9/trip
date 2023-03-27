<template>
    <div class="search-box">

        <!-- 位置信息 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期范围 -->
        <div class="section date-range" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>

                </div>
                <div class="stay">共{{ stayDays }}晚</div>

            </div>

            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>

                </div>
            </div>
        </div>

        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" type="range" color="#ff9854" :round="false"
            :show-confirm="false" />

        <!-- 价格人数的选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="section hot-suggests ">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <span class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">{{
                    item.tagText.text }}</span>
            </template>
        </div>

        <!-- 开始搜索按钮 -->
        <div class="section search-button" @click="searchBtnClick()">
            <div class="btn">开始搜索</div>
        </div>


        <!-- 分类 -->


    </div>
</template>

<script setup>






import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city';
import useMainStore from '@/stores/modules/main'
import { storeToRefs } from 'pinia';
import useHomeStore from '@/stores/modules/home';
import { formatMonthDay, getDiffDays } from '@/utils/format_date'

// defineProps({
//     hotSuggests: {
//         type: Array,
//         default: () => []
//     }
// })



const router = useRouter()
// 位置、城市
const cityClick = () => {
    router.push("/city")
}


const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功：", res)
    }), err => {
        console.log("获取位置失败：", err)
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
}

// 当前城市
// 这样写之后currentCity才能用，指明是cityStore里面的currentCity
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期范围的处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

// const startDateStr = ref(formatMonthDay(nowDate))
// const endDateStr = ref(formatMonthDay(newDate))
const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))

// 共几晚的设置
const stayDays = ref(getDiffDays(startDate.value, endDate.value))

// 日历默认不显示，得要点击日期范围的时候显示（设置监听）
const showCalendar = ref(false)

// 这里传入的参数value是一个date数组，可以到官网查看
const onConfirm = (value) => {
    // 1.设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]

    // startDate.value = formatMonthDay(selectStartDate)
    // endDate.value = formatMonthDay(selectEndDate)
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate

    stayDays.value = getDiffDays(selectStartDate, selectEndDate)


    // 2.点击确认后隐藏日历
    showCalendar.value = false
}


const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 监听按钮的点击
const searchBtnClick = () => {
    router.push({
        path: "/search",
        query: {
            // 以下startDate等都是一个对象，需要取到里面的值
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
}
</script>


<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%;
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 2px;
            color: #666;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}

// .search-box {
//     --van-calendar-popup-height: 100%;
// }

// .location {
//     display: flex;
//     align-items: center;
//     height: 44px;
//     padding: 0 20px;

//     .city {
//         flex: 1;
//         color: #333;
//         font-size: 14px;
//     }

//     .position {
//         width: 74px;

//         .text {
//             position: relative;
//             top: 2px;
//             color: #666;
//             font-size: 12px;
//         }

//         img {
//             margin-left: 8px;
//             width: 18px;
//             height: 18px;

//         }
//     }
// }

// .search-box {
//     --van-calendar-popup-height: 100%;
// }

// .section {
//     display: flex;
//     height: 44px;
//     flex-wrap: wrap;
//     align-items: center;
//     padding: 0 20px;
//     color: #999;

//     .start {
//         flex: 1;
//         display: flex;
//         height: 44px;
//         align-items: center;
//     }

//     .end {
//         min-width: 30%;
//         padding-left: 20px;
//     }

//     .date {
//         display: flex;
//         flex-direction: column;

//         .tip {
//             font-size: 12px;
//             color: #999;

//         }

//         .time {
//             margin-top: 3px;
//             color: #333;
//             font-size: 15px;
//             font-weight: 500;
//         }
//     }
// }


// .date-range {
//     height: 44px;

//     .stay {
//         flex: 1;
//         text-align: center;
//         font-size: 12px;
//         color: #666;
//     }
// }

// .hot-suggests {
//     margin: 10px 0;
//     // 自动来设计自己的高度，不受section的影响
//     // 因为hot-suggests也设置了Section的高度，会影响开始搜索按钮上移
//     height: auto;

//     .item {
//         padding: 4px 8px;
//         margin: 3px;
//         border-radius: 14px;
//         font-size: 12px;

//     }
// }

// .search-button {
//     .btn {
//         width: 342px;
//         height: 38px;
//         max-height: 50px;
//         font-weight: 500;
//         font-size: 18px;
//         line-height: 38px;
//         text-align: center;
//         border-radius: 20px;
//         color: #fff;
//         background-image: var(--theme-linear-gradient);
//     }
// }
</style>