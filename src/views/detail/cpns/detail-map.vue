<template>
    <div class="map">
        <detail-section title="查看周边" more-text="查看更多周边信息">
            <div class="baidu" ref="mapRef"></div>

        </detail-section>
    </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
    position: {
        type: Object,
        default: (() => { })
    }

})





// ，setup只是在create和created之间的，为了确保百度地图挂载，将它放在onMounted里面
const mapRef = ref()
onMounted(() => {
    const map = new BMapGL.Map(mapRef.value);// 创建地图实例 
    const point = new BMapGL.Point(props.position.longitude, props.position.latitude);  // 创建点坐标 
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    // 加上大头针
    const marker = new BMapGL.Marker(point);
    map.addOverlay(marker);
})


</script>


<style lang="less" scoped>
.baidu {
    height: 250px;
}
</style>