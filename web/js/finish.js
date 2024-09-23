import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let result;
let totalPoints;
let btnHome;
let btnHomeHandler;
let btnRetryGame;
let btnRetryGameHandler;


function init(){
    result = document.querySelector('#result');
    totalPoints = document.querySelector('#totalPoints');
    btnHome = document.querySelector('#btnHome');
    btnRetryGame = document.querySelector('#btnRetryGame');
}

let getResults = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=results')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        result.textContent = data['nAnswersCorrect'] + "/10";
        totalPoints.textContent = data['totalPoints'];
    })
}
btnHomeHandler = function(){
    allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
}

let initBtnHome = function(){
    btnHome.addEventListener('click', btnHomeHandler)
}

btnRetryGameHandler = function(){
    allFunctions.cargarPage(document.querySelector('#app'), '../pages/juego.html', '../js/juego.js', 'juegoLoaded');
}

let initBtnRetryGame = function(){
    btnRetryGame.addEventListener('click', btnRetryGameHandler)
}

document.querySelector('#app').addEventListener("finishLoaded", function () {
    init();

    getResults();
    initBtnHome();
    initBtnRetryGame();
});