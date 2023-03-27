// tab-control的滚动监听
// 首页页面底部拉到底部加载
// 其他页面的滚动监听，如favor需要的话

import { onUnmounted, onMounted, ref } from 'vue';
import useHomeStore from '@/stores/modules/home';
// 节流函数
import { throttle } from 'underscore'

const homeStore = useHomeStore()

// export default function useScroll(reachBottomCB) {
//     // 监听window窗口的滚动
//     // 1.当我们离开这个页面时，移除监听。
//     // 2.如果别的页面也进行类似的监听，会书写重复的代码，因此需要封装到另一个hook里
//     const scrollListenerHandler = () => {
//         // clientHeight是整个页面的高度，scrollTop是翻滚上去的页面的多少，scrollHeight是整个可翻滚页面的长度
//         const clientHeight = document.documentElement.clientHeight
//         const scrollTop = document.documentElement.scrollTop
//         const scrollHeight = document.documentElement.scrollHeight
//         if (scrollHeight - scrollTop <= clientHeight) {
//             // 拉取更多数据
//             console.log("滑动到底部了")
//             homeStore.fetchHouseListData()
// 先判断一下有没有这个函数，在调用这个回调函数
//             if (reachBottomCB) reachBottomCB()
//         }
//     }

//     onMounted(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     })

//     onUnmounted(() => {
//         window.removeEventListener("scroll", scrollListenerHandler)
//     })
// }


export default function useScroll(elRef) {
    let el = window
    const isReachBottom = ref(false)
    // 拿出来声明好，才可以return出去给别的地方用
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    // 监听window窗口的滚动
    // 1.当我们离开这个页面时，移除监听。
    // 2.如果别的页面也进行类似的监听，会书写重复的代码，因此需要封装到另一个hook里


    // 节流
    const scrollListenerHandler = throttle(() => {
        if (el === window) {
            // clientHeight是整个页面的高度，scrollTop是翻滚上去的页面的多少，scrollHeight是整个可翻滚页面的长度
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }

        // console.log("监听到滚动")
        if (clientHeight.value + scrollTop.value >= (scrollHeight.value - 1)) {
            // 拉取更多数据
            // console.log("滑动到底部了")
            isReachBottom.value = true
        }
    }, 100)
    onMounted(() => {
        if (elRef) el = elRef.value


        el.addEventListener("scroll", scrollListenerHandler)
    })

    onUnmounted(() => {
        el.removeEventListener("scroll", scrollListenerHandler)
    })

    return { isReachBottom, clientHeight, scrollHeight, scrollTop }
}