<template>
    <l-map :center="center" :zoom="zoom" class="map" ref="map" @update:zoom="zoomUpdated"
        @update:center="centerUpdated">
        <l-tile-layer :url="url">
        </l-tile-layer>
        <l-marker :key="marker.id" :lat-lng="marker.coordinates">
            <l-icon ref="icon">
                <img src="@/assets/pin.png" />
            </l-icon>
        </l-marker>
    </l-map>
</template>

<script>
    import 'leaflet/dist/leaflet.css';
    import {
        LMap,
        LTileLayer,
        LMarker,
        LIcon
    } from 'vue2-leaflet';

    export default {
        name: "Map",
        props: {
            coordonnees : []
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LIcon,
        },
        data() {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                center: [49.114910, 6.178810],
                zoom: 15,
                marker: {
                    id: 1,
                    coordinates: [49.114910, 6.178810]
                },
            }
        },
        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom;
                console.log(this.markers)
            },
            centerUpdated(center) {
                this.center = center;
            },
        },
        created() {
            let posLong = this.coordonnees[1]
            let posLat = this.coordonnees[0]

            let coord = [posLong, posLat]

            this.marker.coordinates = coord
            this.center = coord
        }
    }
</script>

<style>
    .map {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
</style>