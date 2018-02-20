import L from 'leaflet';
import $ from 'jquery';
import Marker from './map/marker';

import {
    yandex as tileLayer,
    // cloudmade as tileLayer,
    // gis as tileLayer,
    // google as tileLayer,
    // openstreetmap as tileLayer
} from './map/providers';

$(() => {
    let $maps = $('.b-map');

    $.each($maps, (i, el) => {
        let lat = el.getAttribute('data-lat'),
            lng = el.getAttribute('data-lng'),
            zoom = el.getAttribute('data-zoom');

        let crs = L.CRS.EPSG3857;
        if (tileLayer.options.crs) {
            crs = tileLayer.options.crs;
        }

        let map = L.map(el, {
            zoomControl: true,
            scrollWheelZoom: false,
            crs: crs,
        }).setView([lat, lng], zoom);
        tileLayer.addTo(map);

        map.zoomControl.setPosition('topright');

        let redMarker = Marker.icon({
            markerColor: '#6BA45E',
        });

        L.marker([lat, lng], {
            icon: redMarker,
        })
            // .bindPopup('Null Island!')
            .addTo(map);
    });
});
