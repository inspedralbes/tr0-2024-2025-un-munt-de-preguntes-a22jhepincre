import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let containerQuestion;
let containerAnswers;
let indice;
let respostes;
let multiplicador;
let btnDiscardOptions;
let btnDiscardQuestion;
let btnReloadAnotherQuestion;

function init() {
    containerQuestion = document.querySelector('#containerQuestion');
    containerAnswers = document.querySelector('#containerAnswers');
    indice = 0;
    respostes = [];
    btnDiscardOptions = document.querySelector('#btnDiscardOptions');
    btnDiscardQuestion = document.querySelector('#btnDiscardQuestion');
    btnReloadAnotherQuestion = document.querySelector('#btnReloadAnotherQuestion');

}

let cargarQuestion = function (indice) {
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=pregunta')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data['status']){
                containerQuestion.textContent = data['preguntas'].pregunta;
                containerAnswers.innerHTML = ``;
                let answersHtml = ``;
                data['preguntas'].respostes.forEach(resposta => {
                    answersHtml += `
                    <div class="col-lg-5 col-12 mb-lg-4 mb-2">
                    <button class="btn btn-primary btn-lg w-75 py-10 btnOpcion" data-option-id="${resposta.id}">${resposta.resposta}</button>
                </div>`
                });
    
                containerAnswers.innerHTML = answersHtml;
    
                let btnsOption = document.querySelectorAll('.btnOpcion');;
    
                btnsOption.forEach((btnOpcion) => {
                    btnOpcion.addEventListener('click', function () {
                        // verify(this.dataset.optionId)
                        pushResposta(this.dataset.optionId);
                        cargarQuestion(indice)
                    });
                })
    
                let containerProgressbar = document.querySelector('#containerProgressbar');
                containerProgressbar.innerHTML = `
                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${indice * multiplicador}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${indice * multiplicador}%"></div>
                </div>
                `;
    
                indice++;
            }else{
                // console.log(respostes)
                verify();
                // window.location.href = "finish.html";
                allFunctions.cargarPage(document.querySelector('#app'), '../pages/finish.html', '../js/finish.js', 'finishLoaded');
            }
        })
        .catch(error => console.error('Error:', error));
}

let initPregunta = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=initPregunta')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        multiplicador = 100/data.numQuestions;
        console.log(multiplicador)
        containerQuestion.textContent = data.pregunta.pregunta;
            containerAnswers.innerHTML = ``;
            let answersHtml = ``;
            data.pregunta.respostes.forEach(resposta => {
                answersHtml += `
                <div class="col-lg-5 col-12 mb-lg-4 mb-2">
                <button class="btn btn-primary btn-lg w-75 py-10 btnOpcion" data-option-id="${resposta.id}">${resposta.resposta}</button>
            </div>`
            });

            containerAnswers.innerHTML = answersHtml;

            let btnsOption = document.querySelectorAll('.btnOpcion');;

            btnsOption.forEach((btnOpcion) => {
                btnOpcion.addEventListener('click', function () {
                    // verify(this.dataset.optionId)
                    pushResposta(this.dataset.optionId);
                    cargarQuestion(indice)
                });
            })

            let containerProgressbar = document.querySelector('#containerProgressbar');
            containerProgressbar.innerHTML = `
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${indice * multiplicador}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${indice * multiplicador}%"></div>
            </div>
            `;

            indice++;
    })
}

let verify = function () {
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=verifyAnswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idsRespostes': respostes
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

let pushResposta = function (resposta){
    respostes.push(resposta);
}

let initBtnDiscardOptions = function(){
    btnDiscardOptions.addEventListener('click', function(){
        console.log("discard options")
    });
}

let initBtnDiscardQuestion = function(){
    btnDiscardQuestion.addEventListener('click', function(){
        console.log("discard question")
    });
}

let initBtnReloadAnotherQuestion = function(){
    btnReloadAnotherQuestion.addEventListener('click', function(){
        console.log("reload question")
    });
}

document.querySelector('#app').addEventListener("juegoLoaded", function () {
    init();
    initPregunta();
    initBtnDiscardOptions();
    initBtnDiscardQuestion();
    initBtnReloadAnotherQuestion();
});