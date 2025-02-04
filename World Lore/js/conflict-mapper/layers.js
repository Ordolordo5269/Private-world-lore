const conflictLayers = {
    colors: {
        nato: '#4A90E2',
        eu: '#003399',
        brics: '#10B981',
        un: '#60A5FA',
        mercosur: '#8B5CF6'
    },

    // Definir las zonas de conflicto
    warZones: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    intensity: 0.9,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [37.5, 49.0] // Este de Ucrania
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.8,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [35.2137, 31.7683] // Israel-Palestina
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.7,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [44.5, 15.5] // Yemen
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.6,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [38.5, 9.0] // Etiopía-Tigray
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.5,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [17.8, 4.0] // Sudán del Sur
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.5,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [45.0, 34.5] // Irak-Kurdistan
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.6,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [69.0, 34.5] // Afganistán
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.4,
                    type: 'war'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [21.7, 6.5] // República Centroafricana
                }
            },
            // Nuevas zonas warm
            {
                type: 'Feature',
                properties: {
                    intensity: 0.7,
                    type: 'warm'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [127.5, 40.0] // Península de Corea
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.8,
                    type: 'warm'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [121.0, 23.5] // Estrecho de Taiwán
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.6,
                    type: 'warm'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [51.5, 25.3] // Tensión Qatar-Arabia Saudita
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.5,
                    type: 'warm'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [-70.0, -18.0] // Tensión Chile-Bolivia
                }
            },
            {
                type: 'Feature',
                properties: {
                    intensity: 0.7,
                    type: 'warm'
                },
                geometry: {
                    type: 'Point',
                    coordinates: [45.0, 43.0] // Tensión en el Cáucaso
                }
            }
        ]
    },

    tradeGates: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    name: 'Suez Canal',
                    importance: 0.9
                },
                geometry: {
                    type: 'Point',
                    coordinates: [32.35, 30.61]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Panama Canal',
                    importance: 0.9
                },
                geometry: {
                    type: 'Point',
                    coordinates: [-79.91, 9.08]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Strait of Malacca',
                    importance: 0.9
                },
                geometry: {
                    type: 'Point',
                    coordinates: [100.2, 3.1]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Strait of Hormuz',
                    importance: 0.9
                },
                geometry: {
                    type: 'Point',
                    coordinates: [56.5, 26.5]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Bab el-Mandeb',
                    importance: 0.8
                },
                geometry: {
                    type: 'Point',
                    coordinates: [43.4, 12.6]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Gibraltar Strait',
                    importance: 0.8
                },
                geometry: {
                    type: 'Point',
                    coordinates: [-5.5, 35.9]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Danish Straits',
                    importance: 0.7
                },
                geometry: {
                    type: 'Point',
                    coordinates: [11.0, 55.7]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Turkish Straits',
                    importance: 0.8
                },
                geometry: {
                    type: 'Point',
                    coordinates: [29.0, 41.0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Strait of Taiwan',
                    importance: 0.8
                },
                geometry: {
                    type: 'Point',
                    coordinates: [121.0, 24.0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Cape of Good Hope',
                    importance: 0.7
                },
                geometry: {
                    type: 'Point',
                    coordinates: [18.5, -34.3]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Strait of Magellan',
                    importance: 0.6
                },
                geometry: {
                    type: 'Point',
                    coordinates: [-70.0, -53.0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    name: 'Northwest Passage',
                    importance: 0.5
                },
                geometry: {
                    type: 'Point',
                    coordinates: [-95.0, 74.0]
                }
            }
        ]
    },

    initializeLayers: (map) => {
        map.on('load', () => {
            // 1. Primero añadimos todas las fuentes
            map.addSource('countries', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
            });

            map.addSource('war-zones', {
                type: 'geojson',
                data: conflictLayers.warZones
            });

            map.addSource('trade-gates', {
                type: 'geojson',
                data: conflictLayers.tradeGates
            });

            // 2. Luego añadimos todas las capas
            map.addLayer({
                id: 'countries-base',
                type: 'fill',
                source: 'countries',
                paint: {
                    'fill-color': 'transparent',
                    'fill-outline-color': 'rgba(255,255,255,0.1)'
                }
            });

            map.addLayer({
                id: 'organization-layer',
                type: 'fill',
                source: 'countries',
                paint: {
                    'fill-color': '#000000',
                    'fill-opacity': 0
                }
            });

            // Trade gates layer
            map.addLayer({
                id: 'trade-gates-layer',
                type: 'circle',
                source: 'trade-gates',
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#3b82f6',
                    'circle-stroke-color': '#3b82f6',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.3
                },
                layout: {
                    'visibility': 'none'
                }
            });

            // 3. Finalmente añadimos los event listeners
            const tradeGateIndicator = document.querySelector('.indicator.trade-gate');
            tradeGateIndicator.addEventListener('click', () => {
                const isActive = tradeGateIndicator.classList.toggle('active');
                map.setLayoutProperty(
                    'trade-gates-layer',
                    'visibility',
                    isActive ? 'visible' : 'none'
                );
            });

            // Event listener para el botón war
            const warIndicator = document.querySelector('.indicator.war');
            warIndicator.addEventListener('click', () => {
                const isActive = warIndicator.classList.toggle('active');
                const visibility = isActive ? 'visible' : 'none';
                
                // Filtrar y mostrar solo zonas de guerra
                map.setFilter('war-circles-outer', ['==', ['get', 'type'], 'war']);
                map.setFilter('war-circles-inner', ['==', ['get', 'type'], 'war']);
                
                map.setLayoutProperty('war-circles-outer', 'visibility', visibility);
                map.setLayoutProperty('war-circles-inner', 'visibility', visibility);
            });

            // Event listener para el botón warm
            const warmIndicator = document.querySelector('.indicator.warm');
            warmIndicator.addEventListener('click', () => {
                const isActive = warmIndicator.classList.toggle('active');
                const visibility = isActive ? 'visible' : 'none';
                
                // Filtrar y mostrar solo zonas warm
                map.setFilter('warm-circles-outer', ['==', ['get', 'type'], 'warm']);
                map.setFilter('warm-circles-inner', ['==', ['get', 'type'], 'warm']);
                
                map.setLayoutProperty('warm-circles-outer', 'visibility', visibility);
                map.setLayoutProperty('warm-circles-inner', 'visibility', visibility);
            });

            // Capas separadas para war y warm
            // Círculos exteriores para war
            map.addLayer({
                id: 'war-circles-outer',
                type: 'circle',
                source: 'war-zones',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0.4, 30,
                        0.9, 70
                    ],
                    'circle-color': 'transparent',
                    'circle-stroke-color': '#ef4444',
                    'circle-stroke-width': 3,
                    'circle-stroke-opacity': 0.4,
                    'circle-blur': 0.5
                },
                layout: {
                    'visibility': 'none'
                },
                filter: ['==', ['get', 'type'], 'war']
            });

            // Círculos interiores para war
            map.addLayer({
                id: 'war-circles-inner',
                type: 'circle',
                source: 'war-zones',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0.4, 25,
                        0.9, 65
                    ],
                    'circle-color': 'transparent',
                    'circle-stroke-color': '#ef4444',
                    'circle-stroke-width': 2,
                    'circle-stroke-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                },
                filter: ['==', ['get', 'type'], 'war']
            });

            // Círculos exteriores para warm
            map.addLayer({
                id: 'warm-circles-outer',
                type: 'circle',
                source: 'war-zones',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0.4, 30,
                        0.9, 70
                    ],
                    'circle-color': 'transparent',
                    'circle-stroke-color': '#f59e0b',
                    'circle-stroke-width': 3,
                    'circle-stroke-opacity': 0.4,
                    'circle-blur': 0.5
                },
                layout: {
                    'visibility': 'none'
                },
                filter: ['==', ['get', 'type'], 'warm']
            });

            // Círculos interiores para warm
            map.addLayer({
                id: 'warm-circles-inner',
                type: 'circle',
                source: 'war-zones',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0.4, 25,
                        0.9, 65
                    ],
                    'circle-color': 'transparent',
                    'circle-stroke-color': '#f59e0b',
                    'circle-stroke-width': 2,
                    'circle-stroke-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                },
                filter: ['==', ['get', 'type'], 'warm']
            });

            // Inicializar los event listeners
            conflictLayers.initializeOrganizationListeners(map);
        });
    },

    initializeOrganizationListeners: (map) => {
        const toggleOrganization = async (organization) => {
            try {
                const response = await fetch('data.json');
                const data = await response.json();
                
                const indicator = document.querySelector(`.indicator.${organization}`);
                const isActive = indicator.classList.toggle('active');
                
                // Resetear todos los filtros primero
                map.setPaintProperty('organization-layer', 'fill-opacity', 0);

                if (isActive) {
                    // 1. Corregir el filtro de organizaciones
                    const members = data.countries
                        .filter(country => 
                            country.diplomacy["International Organizations"]
                                .some(org => org.toLowerCase() === organization)
                        )
                        .map(country => country.country);

                    // 2. Aplicar estilos correctamente
                    map.setPaintProperty('organization-layer', 'fill-color', conflictLayers.colors[organization]);
                    map.setPaintProperty('organization-layer', 'fill-opacity', 0.3);
                    map.setFilter('organization-layer', ['in', ['get', 'ADMIN'], ['literal', members]]);
                }
            } catch (error) {
                console.error('Error loading organization data:', error);
            }
        };

        // 3. Asegurar que los listeners se añaden correctamente
        ['nato', 'eu', 'brics', 'un', 'mercosur'].forEach(org => {
            const element = document.querySelector(`.indicator.${org}`);
            if (element) {
                element.addEventListener('click', () => toggleOrganization(org));
            }
        });
    }
}; 