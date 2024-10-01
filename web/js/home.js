import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnPlay;
let nameInput;
let btnAdminQuestions;
let btnRanking;
let userData;
let btnToProfile;
let containerAdminQuestions;
let containerBtnPlay;
let containerBtnLogin;
let btnLogin;

function init() {
    btnPlay = document.querySelector('#btnPlay');
    nameInput = document.querySelector('#name');
    btnAdminQuestions = document.querySelector('#btnAdminQuestions');
    btnRanking = document.querySelector('#btnRanking');
    userData = document.querySelector('#userData');
    btnToProfile = document.querySelector('#btnToProfile');
    containerAdminQuestions = document.querySelector('#containerAdminQuestions');
    containerBtnPlay = document.querySelector('#containerBtnPlay');
    containerBtnLogin = document.querySelector('#containerBtnLogin');
    btnLogin = document.querySelector('#btnLogin');
}

let initHome = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=getAuthenticate')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.login) {
                //no logeado
                containerBtnPlay.classList.add('d-none')
                containerAdminQuestions.classList.add('d-none')
                containerBtnLogin.classList.remove('d-none');
                userData.innerHTML = ``;
                initBtnLogin();
            }else{
                //logeado
                containerBtnLogin.classList.add('d-none');
                userData.innerHTML = `
                <div class="me-2" style="border-radius: 100px; width:60px; height: 6 0px; overflow: hidden;">
                        <img src="${data['user']['profile_pic']}" alt="Profile Picture"
                            style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="fw-bold text-white fs-4">
                    ${data['user']['name']}
                </div>
                `;

                if(data['user']['role'] !== "admin"){
                    containerAdminQuestions.classList.add('d-none')
                }else{
                    containerAdminQuestions.classList.remove('d-none')
                }
            }

        })
}

let initBtnToProfile = function(){
    btnToProfile.addEventListener('click', function(){
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/profile.html', '../js/profile.js', 'profileLoaded');
    });
}

let initBtnLogin = function(){
    btnLogin.addEventListener('click', function(){
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/login.html', '../js/login.js', 'loginLoaded');
    });
}

let initBtnPlay = function () {
    btnPlay.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/juego.html', '../js/juego.js', 'juegoLoaded');
    })
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
    initBtnAdminQuestions();
    initBtnRanking();
    initHome();
    initBtnToProfile();
});