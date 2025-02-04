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

// Una vez que el DOM esté cargado, configuramos el toggle de la pestaña derecha
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-right-tab');
    const rightTab = document.getElementById('conflict-right-tab');
    if (toggleBtn && rightTab) {
        toggleBtn.addEventListener('click', () => {
            rightTab.classList.toggle('open');
            if (rightTab.classList.contains('open')) {
                // Cada vez que se abre la pestaña, se carga el feed de noticias
                loadNewsFeed();
            }
        });
    }
});

// Función para cargar el feed de noticias desde NewsAPI.org
function loadNewsFeed() {
    const url = 'https://newsapi.org/v2/top-headlines?q=foreign&apiKey=293aef4458c249c29d718a7664779a30';
    console.log("Cargando noticias desde:", url);
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.articles;
            console.log("Artículos recibidos:", articles);
            let html = "";
            articles.forEach(article => {
                html += `<div class="news-item">
                            <h4>${article.title}</h4>
                            <p>${article.description ? article.description : ""}</p>
                            <a href="${article.url}" target="_blank">Leer más</a>
                         </div>`;
            });
            if (!articles.length) {
                html = "<p>No se han encontrado noticias.</p>";
            }
            document.getElementById("news-feed-right-tab").innerHTML = html;
        })
        .catch(error => {
            console.error("Error al cargar noticias:", error);
            document.getElementById("news-feed-right-tab").innerHTML = "<p>Error al cargar noticias.</p>";
        });
} 