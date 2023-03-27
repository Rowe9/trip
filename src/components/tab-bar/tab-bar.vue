<!-- 使用vant组件写的 -->

<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path" icon="home-o">
                <span>{{ item.text }}</span>
                    <!-- 当前文件，加入使用了第三方库里面的图标，
            然后想要修改图标的样式，可以参考本文件的做法 -->
                <!-- <template #icon>
                        <img v-if="currentIndex === index" :src="getAssetURL(item.imageActive)" alt="">
                            <img v-else :src="getAssetURL(item.image)" alt="">
                        </template> -->
                </van-tabbar-item>
            </template>


        </van-tabbar>

    </div>
</template>


<script setup>
import tabbarData from '@/assets/data/tabbarData.js'
import { getAssetURL } from '@/utils/load_assets_img'
import { ref } from 'vue'



const currentIndex = ref(0)



</script>
 

<style lang="less" scoped>
.tab-bar {
    // 找到类，对当前类的属性进行重写
    // 但是要除以style上面有一个scoped属性，这个是文件内里有这个类才会生效，有自己的作用域
    // 法一：删掉scoped,这样其他属性也会变成全局的了
    // 法二：给这个类名加上:deep()，会找到子组件的类，让子组件的类也可以生效

    --van-tabbar-item-icon-size: 30px !important;

    :deep(.van-tabbar-item__icon) {
        font-size: 50px;
    }

    img {
        height: 20px;
    }
}
</style>