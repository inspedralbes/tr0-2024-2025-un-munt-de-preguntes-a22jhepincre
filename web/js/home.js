import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnPlay;
let nameInput;
let btnAdminQuestions;
let btnRanking;
let btnLogOut;

function init() {
    btnPlay = document.querySelector('#btnPlay');
    nameInput = document.querySelector('#name');
    btnAdminQuestions = document.querySelector('#btnAdminQuestions');
    btnRanking = document.querySelector('#btnRanking');
    btnLogOut = document.querySelector('#btnLogOut');
}

let initBtnPlay = function () {
    btnPlay.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/juego.html', '../js/juego.js', 'juegoLoaded');
    })
}

let initBtnLogOut = function () {
    btnLogOut.addEventListener('click', function () {
        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=logout')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "success") {
                    allFunctions.cargarPage(app, '../pages/login.html', '../js/login.js', 'loginLoaded');
                }

            })
    });
}

let initBtnAdminQuestions = function () {
    btnAdminQuestions.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/questions.html', '../js/questions.js', 'questionsLoaded');
    });
}

let initBtnRanking = function () {
    btnRanking.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/ranking.html', '../js/ranking.js', 'rankingLoaded');
    });
}

document.querySelector('#app').addEventListener('homeLoaded', function (event) {
    console.log("home")
    init();
    initBtnPlay();
    initBtnLogOut();
    initBtnAdminQuestions();
    initBtnRanking();
});