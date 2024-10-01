import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnPlay;
let nameInput;
let btnAdminQuestions;
let btnRanking;
let btnLogOut;
let userData;
let btnToProfile;
let containerAdminQuestions;

function init() {
    btnPlay = document.querySelector('#btnPlay');
    nameInput = document.querySelector('#name');
    btnAdminQuestions = document.querySelector('#btnAdminQuestions');
    btnRanking = document.querySelector('#btnRanking');
    btnLogOut = document.querySelector('#btnLogOut');
    userData = document.querySelector('#userData');
    btnToProfile = document.querySelector('#btnToProfile');
    containerAdminQuestions = document.querySelector('#containerAdminQuestions');
}

let initHome = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=getAuthenticate')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.login) {
                //no logeado
                userData.innerHTML = ``;
            }else{
                //logeado
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
    initHome();
    initBtnToProfile();
});