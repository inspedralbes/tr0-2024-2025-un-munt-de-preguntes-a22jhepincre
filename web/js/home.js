let btnPlay;
let nameInput;


function init() {
    btnPlay = document.querySelector('#btnPlay');
    nameInput = document.querySelector('#name')
}

let initBtnPlay = function () {
    btnPlay.addEventListener('click', function () {
        fetch('/DAW2/PR0/PR0/back/server.php?route=addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': nameInput.value
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = "juego.php";
                // cargarNewPage('juego.php')
            })
            .catch(error => console.error('Error:', error));
    })
}

// Función para cargar un script de forma dinámica
function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = function () {
        console.log('Script loaded successfully');
        // Despacha el evento después de que el script haya sido completamente cargado
        let event = new Event("SPAContentLoaded", { bubbles: true });
        dispatchEvent(event);
    };
    document.body.appendChild(script);
}

// Sobreescribir el contenido de la página y cargar el script
function cargarNewPage(newHtml) {
    fetch(newHtml)
        .then(response => response.text()) // Obtener el contenido de juego.php como texto
        .then(html => {
            // Sobreescribir el contenido principal
            document.querySelector('#content').innerHTML = html;

            // Cargar el script del juego.js después de insertar el HTML
            loadScript('../js/juego.js'); // Asegúrate de que la ruta a juego.js sea correcta
        })
        .catch(error => console.error('Error al cargar el juego:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    initBtnPlay();
});