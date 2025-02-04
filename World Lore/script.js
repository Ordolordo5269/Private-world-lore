mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzb29kIiwiYSI6ImNtNWNtMmd4dzJlZmQybXFyMGJuMDFxemsifQ.t4UlHVJhUi9ntjG5Tiq5_A';

// Variables globales para los mapas
let countryMap = null;
let conflictMap = null;

/**
 * Inicializa y configura el mapa principal con Mapbox
 * @returns {Object} Instancia del mapa configurado
 */
const initializeMap = () => {
    // Limpiar el contenedor para asegurar que esté vacío
    document.getElementById('map').innerHTML = "";
    // Inicializar el mapa de países
    countryMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        maxBounds: [[-180, -85], [180, 85]],
        pitchWithRotate: false,
        dragRotate: false
    });

    countryMap.addControl(new mapboxgl.NavigationControl({
        showCompass: false,
        visualizePitch: false
    }), 'bottom-right');

    // Limpiar el contenedor del mapa de conflictos antes de inicializarlo
    document.getElementById('conflict-map').innerHTML = "";
    conflictMap = new mapboxgl.Map({
        container: 'conflict-map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        maxBounds: [[-180, -85], [180, 85]],
        pitch: 0,
        bearing: 0,
        projection: 'mercator' // Proyección 2D
    });

    conflictMap.addControl(new mapboxgl.NavigationControl({
        showCompass: false,
        visualizePitch: false
    }), 'bottom-right');

    return countryMap;
};

/**
 * Agrega una capa interactiva de países al mapa con eventos de interacción
 * @param {Object} map - Instancia del mapa donde se agregará la capa
 */
const addCountryLayer = (map) => {
    let selectedCountry = null;

    map.on('load', () => {
        map.addSource('countries', {
            type: 'geojson',
            data: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        });

        map.addLayer({
            id: 'country-layer',
            type: 'fill',
            source: 'countries',
            paint: {
                'fill-color': '#4ca1af',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.3,
                    0.1
                ],
                'fill-outline-color': '#4ca1af'
            }
        });

        map.addLayer({
            id: 'country-borders',
            type: 'line',
            source: 'countries',
            paint: {
                'line-color': '#4ca1af',
                'line-width': 1,
                'line-opacity': 0.3
            }
        });

        map.addLayer({
            id: 'country-highlight',
            type: 'fill',
            source: 'countries',
            paint: {
                'fill-color': '#4ca1af',
                'fill-opacity': 0.4,
                'fill-outline-color': '#4ca1af'
            },
            filter: ['==', 'ADMIN', '']
        });

        map.addLayer({
            id: 'country-glow',
            type: 'line',
            source: 'countries',
            paint: {
                'line-color': '#4ca1af',
                'line-width': 3,
                'line-blur': 3,
                'line-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.8,
                    0
                ]
            }
        });

        let hoveredStateId = null;

        map.on('mousemove', 'country-layer', (e) => {
            if (e.features.length > 0) {
                if (hoveredStateId !== null) {
                    map.setFeatureState(
                        { source: 'countries', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = e.features[0].id;
                map.setFeatureState(
                    { source: 'countries', id: hoveredStateId },
                    { hover: true }
                );
                map.getCanvas().style.cursor = 'pointer';
            }
        });

        map.on('mouseleave', 'country-layer', () => {
            if (hoveredStateId !== null) {
                map.setFeatureState(
                    { source: 'countries', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = null;
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'country-layer', (e) => {
            const bounds = turf.bbox(e.features[0]);
            
            map.fitBounds(bounds, {
                padding: 50,
                duration: 1000,
                essential: true,
                easing: function (t) {
                    return t * (2 - t);
                }
            });

            selectedCountry = e.features[0].properties.ADMIN;
            map.setFilter('country-highlight', ['==', 'ADMIN', selectedCountry]);
            showCountryInfo(selectedCountry);
        });

        map.setFog({
            'color': 'rgb(15, 23, 42)',
            'high-color': 'rgb(15, 23, 42)',
            'horizon-blend': 0.2,
            'space-color': 'rgb(15, 23, 42)',
            'star-intensity': 0.6
        });
    });
};

/**
 * Implementa la funcionalidad de búsqueda de países en el mapa
 * @param {Object} map - Instancia del mapa donde se realizará la búsqueda
 */
const searchCountry = (map) => {
    const searchInput = document.getElementById('country-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const country = data.countries.find(c => c.country.toLowerCase().includes(query));
                if (country) {
                    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
                        .then(response => response.json())
                        .then(geojson => {
                            const countryFeature = geojson.features.find(feature => feature.properties.ADMIN === country.country);
                            if (countryFeature) {
                                const bounds = turf.bbox(countryFeature);
                                map.fitBounds(bounds, {
                                    padding: 50,
                                    duration: 1000
                                });
                                showCountryInfo(country.country);
                                map.setFilter('country-highlight', ['==', 'ADMIN', country.country]);
                            }
                        });
                }
            });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.querySelector(".toggle-sidebar");
    const closeButton = document.querySelector(".close-button");
    const sectionToggles = document.querySelectorAll(".section-toggle");
    const searchBar = document.querySelector(".search-bar");

    function toggleSidebar() {
        sidebar.classList.toggle("open");
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleSidebar);
    }
    if (closeButton) {
        closeButton.addEventListener("click", toggleSidebar);
    }

    sectionToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const submenu = toggle.nextElementSibling;
            toggle.classList.toggle("active");
            if (toggle.classList.contains("active")) {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            } else {
                submenu.style.maxHeight = 0;
            }

            sectionToggles.forEach((otherToggle) => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove("active");
                    otherToggle.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allItems = document.querySelectorAll(".submenu li");

            allItems.forEach((item) => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    document.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && !toggleButton.contains(e.target) && sidebar.classList.contains("open")) {
            toggleSidebar();
        }
    });

    document.querySelectorAll(".submenu li").forEach(item => {
        item.addEventListener("click", () => {
            const country = item.textContent;
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const countryData = data.countries.find(c => c.country === country);
                    if (countryData) {
                        document.querySelector('.country-title').textContent = `${countryData.country} - ${countryData.continent}`;
                        document.getElementById('country-info-title').textContent = `${countryData.country} - ${countryData.continent}`;
                    }
                })
                .catch(error => console.error('Error loading country data:', error));
        });
    });
});

/**
 * Muestra la información detallada de un país en el sidebar
 * @param {string} country - Nombre del país a mostrar
 */
const showCountryInfo = (country) => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const countryData = data.countries.find(c => c.country === country);
            if (countryData) {
                updateSidebarContent(countryData);
                document.querySelector('.country-title').textContent = `${countryData.country} - ${countryData.continent}`;
                document.querySelector('.sidebar').classList.add('open');
            }
        })
        .catch(error => console.error('Error loading country data:', error));
};

/**
 * Actualiza el contenido del sidebar con la información del país seleccionado
 * @param {Object} countryData - Datos del país a mostrar
 */
const updateSidebarContent = (countryData) => {
    const sections = {
        economy: [
            { label: "GDP", value: countryData.economy.GDP },
            { label: "GDP per Capita", value: countryData.economy["GDP per Capita"] },
            { label: "Inflation", value: countryData.economy.Inflation },
            { label: "Currency", value: countryData.economy.Currency },
            { label: "Imports", value: countryData.economy["Major Imports"].join(", "), type: "chart-imports" },
            { label: "Exports", value: countryData.economy["Major Exports"], type: "chart-exports" }
        ],
        politics: [
            { label: "Political System", value: countryData.politics["Political System"] },
            { label: "Democracy Index", value: countryData.politics["Democracy Index"] },
            { label: "Political Parties", value: countryData.politics["Political Parties"].join(", ") },
            { label: "Ideological Spectrum", value: countryData.politics["Ideological Spectrum"].join(", ") }
        ],
        population: [
            { label: "Population Density", value: countryData.population["Population Density"] },
            { label: "Urban/Rural Distribution", value: countryData.population["Urban/Rural Distribution"] },
            { label: "HDI", value: countryData.population.HDI },
            { label: "Healthcare Access", value: countryData.population["Healthcare Access"] },
            { label: "Education Access", value: countryData.population["Education Access"] }
        ],
        diplomacy: [
            { label: "Key Allies", value: countryData.diplomacy["Key Allies"].join(", ") },
            { label: "International Organizations", value: countryData.diplomacy["International Organizations"].join(", ") },
            { label: "Rivals", value: countryData.diplomacy.Rivals.join(", ") }
        ]
    };

    Object.entries(sections).forEach(([section, data]) => {
        const content = document.querySelector(`[data-section="${section}"] + .submenu .submenu-content`);
        if (content) {
            content.innerHTML = data.map(item => {
                if (item.type === "chart-exports") {
                    return `
                        <div class="chart-section">
                            <h3 class="chart-title">
                                <span class="chart-icon">📈</span>
                                Exports Overview
                            </h3>
                            <li class="chart-container">
                                <canvas id="exportsChart"></canvas>
                            </li>
                        </div>
                    `;
                }
                if (item.type === "chart-imports") {
                    return `
                        <div class="chart-section">
                            <h3 class="chart-title">
                                <span class="chart-icon">📊</span>
                                Imports Overview
                            </h3>
                            <li class="chart-container">
                                <canvas id="importsChart"></canvas>
                            </li>
                        </div>
                    `;
                }
                return `
                    <li>
                        <span class="label">${item.label}:</span>
                        <span class="value">${item.value}</span>
                    </li>
                `;
            }).join('');
            
            if (section === "economy") {
                const exportsData = countryData.economy["Major Exports"];
                createExportsChart(exportsData);
                const importsData = countryData.economy["Major Imports"].map(item => ({ name: item, percentage: "10%" }));
                createImportsChart(importsData);
            }
        }
    });
};

/**
 * Crea un gráfico circular para mostrar las exportaciones del país
 * @param {Array} exportsData - Datos de exportaciones a visualizar
 */
const createExportsChart = (exportsData) => {
    const ctx = document.getElementById('exportsChart').getContext('2d');
    
    const totalPercentage = exportsData.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
    const otherPercentage = 100 - totalPercentage;

    const chartData = [
        ...exportsData.map(item => ({ name: item.name, value: parseFloat(item.percentage) })),
        { name: 'Other', value: otherPercentage }
    ];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.map(item => item.name),
            datasets: [{
                data: chartData.map(item => item.value),
                backgroundColor: [
                    '#4E79A7', '#F28E2B', '#E15759', 
                    '#76B7B2', '#59A14F', '#EDC949', '#AF7AA1'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#dcdcdc',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.raw}%`
                    },
                    bodyColor: '#dcdcdc',
                    titleColor: '#4ca1af',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            }
        }
    });
};

/**
 * Crea un gráfico circular para mostrar las importaciones del país
 * @param {Array} importsData - Datos de importaciones a visualizar
 */
const createImportsChart = (importsData) => {
    const ctx = document.getElementById('importsChart').getContext('2d');
    
    const totalPercentage = importsData.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
    const otherPercentage = 100 - totalPercentage;

    const chartData = [
        ...importsData.map(item => ({ name: item.name, value: parseFloat(item.percentage) })),
        { name: 'Other', value: otherPercentage }
    ];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.map(item => item.name),
            datasets: [{
                data: chartData.map(item => item.value),
                backgroundColor: [
                    '#4E79A7', '#F28E2B', '#E15759', 
                    '#76B7B2', '#59A14F', '#EDC949', '#AF7AA1'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#dcdcdc',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.raw}%`
                    },
                    bodyColor: '#dcdcdc',
                    titleColor: '#4ca1af',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            }
        }
    });
};

// Inicializar la aplicación
const map = initializeMap();
addCountryLayer(map);
searchCountry(map);

function startCountryExploration() {
    const frontPage = document.getElementById('front-page');
    const countryMapElement = document.getElementById('map');
    const conflictMapElement = document.getElementById('conflict-map');
    const returnButton = document.getElementById('return-home');
    
    frontPage.style.opacity = '0';
    frontPage.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        frontPage.style.display = 'none';
        countryMapElement.style.display = 'block';
        conflictMapElement.style.display = 'none';
        returnButton.style.display = 'flex';
        countryMap.resize();
    }, 500);
}

function startConflictMap() {
    const frontPage = document.getElementById('front-page');
    const countryMapElement = document.getElementById('map');
    const conflictMapElement = document.getElementById('conflict-map');
    const returnButton = document.getElementById('return-home');
    
    frontPage.style.opacity = '0';
    frontPage.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        frontPage.style.display = 'none';
        countryMapElement.style.display = 'none';
        conflictMapElement.style.display = 'block';
        returnButton.style.display = 'flex';
        conflictMap.resize();
    }, 500);
}

function returnToFrontPage() {
    const frontPage = document.getElementById('front-page');
    const countryMapElement = document.getElementById('map');
    const conflictMapElement = document.getElementById('conflict-map');
    
    frontPage.style.display = 'flex';
    frontPage.style.opacity = '0';
    
    requestAnimationFrame(() => {
        frontPage.style.opacity = '1';
        frontPage.style.transition = 'opacity 0.5s ease';
    });
    
    countryMapElement.style.display = 'none';
    conflictMapElement.style.display = 'none';
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
    
    if (countryMap.getLayer('country-highlight')) {
        countryMap.setFilter('country-highlight', ['==', 'ADMIN', '']);
    }
}

