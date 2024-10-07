import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let result;
let totalPoints;
let btnHome;
let btnHomeHandler;
let btnRetryGame;
let btnRetryGameHandler;
let time;
let namePlayer;
let profilePic;
let btnCarouselIndicators;
let containerCarouselIndicators;

function init(){
    result = document.querySelector('#result');
    totalPoints = document.querySelector('#totalPoints');
    btnHome = document.querySelector('#btnHome');
    btnRetryGame = document.querySelector('#btnRetryGame');
    time = document.querySelector('#time');
    namePlayer = document.querySelector('#namePlayer');
    profilePic = document.querySelector('#profilePic');
    btnCarouselIndicators = document.querySelector('#btnCarouselIndicators');
    containerCarouselIndicators = document.querySelector('#containerCarouselIndicators');
}

let getResults = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=results')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        profilePic.src = data['user']['profile_pic'];
        result.textContent = data['nAnswersCorrect'] + "/" + data['nQuestions'];
        totalPoints.textContent = data['totalPoints'];
        time.textContent = (data['diff']*1000)+"ms";
        namePlayer.textContent = data['user']['name'];
        let testResults = data['testResults'];

        testResults.forEach((test, key) => {
            let res = ``;
            test.respostes.forEach((resposta, key)=>{
                if(test.verify == "correcta"){
                    res += 
                    `
                        <div class="col-lg-6 col-12 mb-lg-4 mb-2">
                            <button class="btn w-100 ms-10 me-10 ${resposta.id == test.selected ? 'btn-success':'btn-primary'}">
                                ${resposta.resposta}
                            </button>
                        </div>
                        
                    `;
                }else{
                    res += 
                    `
                        <div class="col-lg-6 col-12 mb-lg-4 mb-2">
                            <button class="btn w-100 ms-10 me-10 ${resposta.id == test.selected ? 'btn-danger':'btn-primary'}">
                                ${resposta.resposta}
                            </button>
                        </div>
                        
                    `;
                }
                
            });

            btnCarouselIndicators.innerHTML += 
            `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${key}" class="${key == 0 ? 'active':''} text-primary"
                     ${key == 0 ? 'aria-current="true"':''} aria-label="Slide ${key}" style="${test.verify == "correcta" ? 'background-color:#198754':'background-color:#dc3545'}"></button>
            `;

            containerCarouselIndicators.innerHTML += 
            `
            <div class="carousel-item w-100 ${key == 0 ? 'active':''} containerCarousel" >
                <div class="carousel-caption">
                  <div class="w-100 h-100 text-center">
                        <p class="fs-4 fw-bold text-black">
                            ${test.pregunta}
                        </p>
                    </div>
                    <div class="row">
                        ${res}
                    </div>
                </div>
            </div>
            `;
        });
    })
}
btnHomeHandler = function(){
    allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
}

let initBtnHome = function(){
    btnHome.addEventListener('click', btnHomeHandler)
}

btnRetryGameHandler = function(){
    allFunctions.cargarPage(document.querySelector('#app'), '../pages/juego.html', '../js/juego.js', 'juegoLoaded');
}

let initBtnRetryGame = function(){
    btnRetryGame.addEventListener('click', btnRetryGameHandler)
}

document.querySelector('#app').addEventListener("finishLoaded", function () {
    init();

    getResults();
    initBtnHome();
    initBtnRetryGame();
});