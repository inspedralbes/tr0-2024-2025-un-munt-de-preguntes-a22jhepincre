import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnHome;

function init(){
    btnHome = document.querySelector('#btnHome');
}

let initBtnHome = function () {
    btnHome.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
    })
}

document.querySelector('#app').addEventListener('profileLoaded', function (event) {
    init();
    initBtnHome();
});