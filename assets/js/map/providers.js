import L from 'leaflet';

const yandex = L.tileLayer(
    '//vec0{s}.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',
    {
        maxZoom: 19,
        attribution:
            "Map data &copy; <a href='http://maps.yandex.ru'>Yandex.Maps</a>",
        subdomains: [1, 2, 3, 4],
        crs: L.CRS.EPSG3395,
    }
);

const cloudmade = L.tileLayer(
    'http://{s}.tile.cloudmade.com/d4fc77ea4a63471cab2423e66626cbb6/997/256/{z}/{x}/{y}.png',
    {
        attribution:
            'Map data &copy; <span class="text-cut" data-cut="[&hellip;]"><a href="http://openstreetmap.org">OpenStreetMap</a>; contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a></span>',
    }
);

const google = L.tileLayer('//mt{s}.googleapis.com/vt?x={x}&y={y}&z={z}', {
    attribution: "Map data &copy; <a href='http://googlemaps.com'>Google</a>",
    detectRetina: false,
    subdomains: [0, 1, 2, 3],
});

const gis = L.tileLayer(
    'http://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}',
    {
        subdomains: [0, 1, 2, 3],
        attribution:
            '<a href="http://www.2gis.ru" target="_blank" title="Программа 2ГИС — Городской Информационный Справочник. Скачивайте бесплатно!">&copy; 2ГИС — Городской Информационный Справочник</a>',
    }
);

const openstreetmap = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
);

export { openstreetmap, yandex, google, gis, cloudmade };
