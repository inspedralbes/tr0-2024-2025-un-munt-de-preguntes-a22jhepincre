import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let result;
let totalPoints;
let btnHome;
let btnHomeHandler;
let btnRetryGame;
let btnRetryGameHandler;
let time;
let namePlayer;
let profilePic;

function init(){
    result = document.querySelector('#result');
    totalPoints = document.querySelector('#totalPoints');
    btnHome = document.querySelector('#btnHome');
    btnRetryGame = document.querySelector('#btnRetryGame');
    time = document.querySelector('#time');
    namePlayer = document.querySelector('#namePlayer');
    profilePic = document.querySelector('#profilePic');
}

let getResults = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=results')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        profilePic.src = data['user']['profile_pic'];
        result.textContent = data['nAnswersCorrect'] + "/" + data['nQuestions'];
        totalPoints.textContent = data['totalPoints'];
        time.textContent = (data['diff']*1000)+"ms";
        namePlayer.textContent = data['user']['name'];
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