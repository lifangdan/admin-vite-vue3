<template>
    <div id="mapChart" ref="echartRef" style="width: 100%;height: 100%;"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import 'echarts-gl';
import { onMounted, ref } from 'vue';
import china from '@/assets/map/json/china.json';

const echartRef = ref(null);
function initMapChart () {
    echartRef.value = echarts.init(document.getElementById('mapChart'));
    echarts.registerMap("china", china)
    const option = {
        series: [{
            tooltip: {
                trigger: 'item'
            },
            zoom:2,
            zlevel: 1,
            roam:false,
            name: 'china',
            type: 'map3D',
            map: 'china',
            regionHeight: 3, //地图厚度
            label: {
                show: true, //是否显示市
                textStyle: {
                    color: "#fff", //文字颜色
                    fontSize: 12, //文字大小
                },
            },
            itemStyle: {
                color:'#06d170', //地图颜色
                // opacity: 0.9, // 透明度
                borderWidth: 1, //分界线宽度
                borderColor: "#fff", //分界线颜色
            },
            groundplane: {
                show: false
            },
            data: [],
            emphasis: {
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: '微软雅黑',
                    },
                },
                itemStyle: {
                    color: '#FAAD15',
                    opacity: 1,
                    borderWidth: 1,
                    borderColor: "#fff",
                },
            },            
        },
        
        
    ],
        // dataRange: {
        //     show: false,
        //     splitList: splitList
        // },
        animation: false
    };
    echartRef.value.setOption(option);
}
onMounted(() => {
    initMapChart();
});
</script>