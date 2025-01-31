class ConflictMapper {
    constructor() {
        this.map = null;
        this.initialize();
    }

    initialize() {
        mapboxgl.accessToken = conflictMapConfig.mapboxToken;
        
        this.map = new mapboxgl.Map({
            container: 'conflict-map',
            style: conflictMapConfig.style,
            ...conflictMapConfig.initialView,
            projection: 'mercator',
            pitch: 0,
            bearing: 0,
            attributionControl: false  // Deshabilitar los controles de atribución
        });

        // Inicializar capas
        conflictLayers.initializeLayers(this.map);
    }

    show() {
        document.getElementById('conflict-map').style.display = 'block';
        this.map.resize();
    }

    hide() {
        document.getElementById('conflict-map').style.display = 'none';
    }
}

// Inicializar el mapa de conflictos
const conflictMapper = new ConflictMapper();

// Actualizar la función startConflictMap
function startConflictMap() {
    const frontPage = document.getElementById('front-page');
    const countryMapElement = document.getElementById('map');
    const conflictMapContainer = document.getElementById('conflict-map-container');
    const returnButton = document.getElementById('return-home');
    const searchBar = document.getElementById('country-search');
    
    frontPage.style.opacity = '0';
    frontPage.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        frontPage.style.display = 'none';
        countryMapElement.style.display = 'none';
        conflictMapContainer.style.display = 'block';
        returnButton.style.display = 'flex';
        searchBar.style.display = 'none';
        conflictMapper.show();
    }, 500);
}

document.querySelector('.return-home-button').addEventListener('click', () => {
    const frontPage = document.getElementById('front-page');
    const countryMapElement = document.getElementById('map');
    const conflictMapContainer = document.getElementById('conflict-map-container');
    const returnButton = document.getElementById('return-home');
    
    frontPage.style.display = 'flex';
    frontPage.style.opacity = '1';
    countryMapElement.style.display = 'none';
    conflictMapContainer.style.display = 'none';
    returnButton.style.display = 'none';
}); 