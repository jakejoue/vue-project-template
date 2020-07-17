<template>
    <div class="geo-map">
        <div id="map"></div>
        <slot v-if="mapInited" />
    </div>
</template>

<script>
export default {
    unWatch() {
        return { map: null };
    },
    data() {
        return { mapInited: false };
    },
    mounted() {
        // 创建地图对象实例，默认坐标系为经纬度
        const map = new GeoGlobe.Map({
            mapCRS: '4326',
            container: 'map',
        });

        // 添加天地图
        map.on('load', function () {
            const token = 'e90d56e5a09d1767899ad45846b0cefd';
            const layerVtc = new GeoGlobe.TDTLayer('vec_c', token);
            const layerCva = new GeoGlobe.TDTLayer('cva_c', token);
            map.addLayer(layerVtc);
            map.addLayer(layerCva);
        });

        this.map = map;
        this.mapInited = true;
    },
};
</script>

<style lang="less">
.geo-map,
#map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
