import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let app;

function init() {
    app = document.querySelector('#app');
}

let verifySession = function () {
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=getAuthenticate')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.login) {
                allFunctions.cargarPage(app, '../pages/register.html', '../js/register.js', 'registerLoaded');
            }else{
                allFunctions.cargarPage(app, '../pages/home.html', '../js/home.js', 'homeLoaded');
            }

        })
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    verifySession();
});
