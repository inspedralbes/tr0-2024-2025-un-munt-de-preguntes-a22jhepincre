import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let app;

function init() {
    app = document.querySelector('#app');
}

let verifySession = function () {
    allFunctions.cargarPage(app, '../pages/home.html', '../js/home.js', 'homeLoaded');
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    verifySession();
});
