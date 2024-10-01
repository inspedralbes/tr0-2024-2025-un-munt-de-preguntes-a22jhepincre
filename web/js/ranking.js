import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let containerRanking;
let btnHome;


function init(){
    containerRanking = document.querySelector('#container-ranking');
    btnHome = document.querySelector('#btnHome');
}

function getRanking(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=ranking')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let html = ``;
        data['users'].forEach(user => {
            html += `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="me-2" style="border-radius: 100px; width:60px; height: 6 0px; overflow: hidden;">
                                <img src="${user['profile_pic']}" alt="Profile Picture"
                                style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div class="fw-bold fs-4 me-2">
                                ${user['name']}
                            </div>
                            <div class="fw-bold fs-4 me-2">
                            ${user['total_score']}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        containerRanking.innerHTML = html;
    })
}

let initBtnHome = function () {
    btnHome.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
    })
}

document.querySelector('#app').addEventListener("rankingLoaded", function () {
    init();

    getRanking();
    initBtnHome();
});