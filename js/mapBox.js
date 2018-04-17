//VARIABLES DE MAPA
var ZOOM_DEFECTO = 11;
var LATITUD_DEFECTO = -4.015393, LONGITUD_DEFECTO = -79.201864;
var INFO_WINDOWS = '', MARCADOR;
var LIST_MAPS = [];
var DRAW_POLIGON, PANELLOAD;
function cargarMapa(panelLoad, id) {
    PANELLOAD = panelLoad;
    setTimeout(function () {
        mapboxgl.accessToken = TOKEN_MAPBOX;
        var lat = (getCookie('LATITUD') === 0) ? LATITUD_DEFECTO : getCookie('LATITUD');
        var lng = (getCookie('LONGITUD') === 0) ? LONGITUD_DEFECTO : getCookie('LONGITUD');
        LIST_MAPS[id] = new mapboxgl.Map({
            container: id, // container id
            style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
            center: [lng, lat], // starting position [lng, lat]
            zoom: ZOOM_DEFECTO, // starting zoom
            "light": {
                "anchor": "viewport",
                "color": "white",
                "intensity": 0.4
            }
        });
        LIST_MAPS[id].addControl(new mapboxgl.NavigationControl());

        if (panelLoad !== 0)
            switch (panelLoad.xtype) {
                case 'plaza':
                case 'parqueadero':
                    addClickPoint(LIST_MAPS[id], panelLoad);
                    break;
                case 'ciudad':
                case 'zona':
                case 'sector':
                case 'zona_habilitada':
                    addDrawPoligon(LIST_MAPS[id], panelLoad);
                    break;
            }

        // Add geolocate control to the map.
        LIST_MAPS[id].addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
        LIST_MAPS[id].loadImage('img/sistema/sistema_logo.png', function (error, image) {
            if (error)
                throw error;
            LIST_MAPS[id].addImage('plaza', image);
        });
        panelLoad.query('[region=east]')[0].on('resize', function (eventObject, element) {
            LIST_MAPS[id].resize();
        });
        LIST_MAPS[id].MARCADOR = '';
        LIST_MAPS[id].LIST_MARCADORES = [];
    }, 200);
}
function centrar(MAPA, lat, lng, zoom) {
    MAPA.setCenter([lng, lat]);
    if (zoom) {
        MAPA.setZoom(zoom);
    } else {
        MAPA.setZoom(ZOOM_DEFECTO);
    }

}
function graficarMarcador(MAPA, lat, lng, data, zoom) {
    if (zoom < 0) {
        zoom = 17;
    }
//    centrar(MAPA, lat, lng, zoom);
//    var el = document.createElement('div');
//    el.className = 'marker fa fa-map-marker';
    MAPA.MARCADOR = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(MAPA);
    if (data) {
        var popup = new mapboxgl.Popup({offset: 25}).setHTML(data);
        MAPA.MARCADOR.setPopup(popup).addTo(MAPA);
    }
    MAPA.LIST_MARCADORES.push(MAPA.MARCADOR);
}

function agregarPopup(MAPA, data) {
    var popup = new mapboxgl.Popup({offset: 25}).setHTML('<div class="fa fa-user"></div> ' + data.nombre + '<br><div class="fa fa-calendar"></div> ' + Ext.Date.format(new Date(data.fecha), 'Y-m-d') + '<br>' + '<div class="fa fa-clock-o"></div> ' + Ext.Date.format(new Date(data.fecha), 'H:i:s'));
    MAPA.MARCADOR.setPopup(popup).addTo(MAPA);
}

function addClickPoint(MAPA, panelLoad, oneClick) {
    MAPA.on('click', function (e) {
        if (MAPA.MARCADOR) {
            MAPA.MARCADOR.remove();
        }
        var zoom_click = MAPA.getZoom();
        graficarMarcador(MAPA, e.lngLat.lat, e.lngLat.lng);
        centrar(MAPA, e.lngLat.lat, e.lngLat.lng, zoom_click);
        panelLoad.down('form').down('[name=latitud]').setValue(e.lngLat.lat);
        panelLoad.down('form').down('[name=longitud]').setValue(e.lngLat.lng);
        if (oneClick) {
            deleteClickEvent(MAPA);
        }
    });
}

function addDrawPoligon(MAPA, panelLoad) {
    deleteClickEvent(MAPA);
    MAPA.POLIGON = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            trash: true
        }
    });
    MAPA.addControl(MAPA.POLIGON);
    MAPA.on('draw.create', function (e) {
        updateArea(e, panelLoad, MAPA);
    });
    MAPA.on('draw.delete', function (e) {
        updateArea(e, panelLoad, MAPA);
    });
    MAPA.on('draw.update', function (e) {
        updateArea(e, panelLoad, MAPA);
    });
}

function updateArea(e, panelLoad, MAPA) {
    var data = MAPA.POLIGON.getAll();
    if (data.features.length > 0) {
        var coordenadasString = getCoordenadasArray(data.features[0].geometry.coordinates[0]);
        var coordenadasArray = getCoordenadasString(coordenadasString, 'lnglat', MAPA, false);
        var coordenadasFormat = getCoordenadasArray(coordenadasArray);
        panelLoad.down('form').down('[name=limites]').setValue(null);
        panelLoad.down('form').down('[name=limites]').setValue(coordenadasFormat);
    } else {
        panelLoad.down('form').down('[name=limites]').setValue(null);
    }
}

function graficarPoligono(coordenadas, MAPA) {
    if (coordenadas !== null && coordenadas !== '') {
        var listCoordenadas = getCoordenadasString(coordenadas, 'lnglat', MAPA, true);
        var geometryObj = {coordinates: [listCoordenadas], type: "Polygon"};
        MAPA.POLIGON.add(geometryObj);
    }
}

function getCoordenadasString(coordenadas, format, MAPA, boolCentrar) {
    var listCoordenadas = [];
    if (coordenadas && coordenadas !== '') {
        coordenadas = coordenadas.split(';');
        for (var i = 0; i < coordenadas.length; i++) {
            var latLong = coordenadas[i].split(',');
            var lat = parseFloat(latLong[0]);
            var lng = parseFloat(latLong[1]);
            if (format === 'latlng') {
                listCoordenadas[i] = [parseFloat(lat), parseFloat(lng)];
            } else if (format === 'lnglat') {
                listCoordenadas[i] = [parseFloat(lng), parseFloat(lat)];
            }
        }
        if (boolCentrar) {
            centrar(MAPA, lat, lng, 14);
        }
        return listCoordenadas;
    }
}

function getCoordenadasArray(coordenadas) {
    var puntos = coordenadas;
    var listaPuntos = [];
    for (var i in puntos) {
        listaPuntos[i] = puntos[i].toString();
    }
    return listaPuntos.join(';');
}

function limpiarMapa(MAPA) {
    if (MAPA.LIST_MARCADORES) {
        if (MAPA.LIST_MARCADORES.length > 0) {
            for (var i in MAPA.LIST_MARCADORES) {
                MAPA.LIST_MARCADORES[i].remove();
            }
        }
    }
    limpiarPoligono(MAPA);
    centrar(MAPA, LATITUD_DEFECTO, LONGITUD_DEFECTO);
}

function limpiarPoligono(MAPA) {
    if (MAPA.POLIGON) {
        MAPA.POLIGON.deleteAll();
    }
}


function deleteClickEvent(MAPA, id) {
    if (MAPA._listeners.click) {
        for (var i in MAPA._listeners.click) {
            if (MAPA._listeners.click[i].name === '' || MAPA._listeners.click[i].name === id) {
                MAPA._listeners.click.splice(i, 1);
            }
        }
    }
}
//FUCNION PARA GRAFICAR LINEAS
function graficarRuta(MAPA, coordenadas) {
    MAPA.setZoom(15);
    limpiarRuta(MAPA, "route");
    MAPA.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": coordenadas
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": COLOR_SISTEMA,
            "line-width": 8
        }
    });
}
function limpiarRuta(MAPA, ID) {
    var LAYER = MAPA.getLayer(ID);
    if (LAYER !== undefined) {
        MAPA.removeLayer(ID);
        MAPA.removeSource(ID);
    }
}

//GRAFCAR POLIGONO EN MAPA
function drawLayerPoligon(geometryObj, MAPA, id, text, color) {
    MAPA.addLayer({
        'id': id,
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': geometryObj
        },
        'paint': {
            'fill-color': color,
            'fill-outline-color': color,
            'fill-opacity': 0.5
        }
    });
}

function cleanLayerPoligon(MAPA, ID) {
    var LAYER = MAPA.getLayer(ID);
    if (LAYER !== undefined) {
        MAPA.removeLayer(ID);
        MAPA.removeSource(ID);
    }
}

//GRAFCAR CAPA DE PUNTOS EN MAPA
function drawLayerPoints(coordenadas, MAPA) {
    var pointsObj = {features: coordenadas, type: "FeatureCollection"};
    MAPA.addLayer({
        "id": "puntosPlazas",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": pointsObj
        },
        "layout": {
            "icon-image": "plaza",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
            "icon-size": 0.5
        }
    });
}

//GRAFCAR CAPA DE POLIGONOS EN MAPA
function drawLayerPoligons(coordenadas, MAPA) {
    MAPA.addLayer({
        'id': 'poligonosZonas',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': coordenadas
                }
            }
        },
        'layout': {},
        'paint': {
            'fill-color': '#006600',
            'fill-opacity': 0.5
        }
    });
}