import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let app;

function init() {
    app = document.querySelector('#app');
    allFunctions.cargarPage(app, '../pages/finish.html', '../js/finish.js', 'finishLoaded');
}


document.addEventListener("DOMContentLoaded", function() {
    init();
    
});
