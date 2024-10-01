import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnHome;
let btnLogOut;

function init(){
    btnHome = document.querySelector('#btnHome');
    btnLogOut = document.querySelector('#btnLogOut');
}

let initBtnHome = function () {
    btnHome.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
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

document.querySelector('#app').addEventListener('profileLoaded', function (event) {
    init();
    initBtnHome();
    initBtnLogOut();
});