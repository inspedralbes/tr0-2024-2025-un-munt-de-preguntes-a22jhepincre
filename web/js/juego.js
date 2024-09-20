let containerQuestion;
let containerAnswers;
let indice = 0;
let respostes = [];

function init() {
    containerQuestion = document.querySelector('#containerQuestion');
    containerAnswers = document.querySelector('#containerAnswers');
}

let cargarQuestion = function (indice) {
    fetch('/DAW2/PR0/PR0/back/server.php?route=pregunta')
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
                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${indice * 10}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${indice * 10}%"></div>
                </div>
                `;
    
                indice++;
            }else{
                // console.log(respostes)
                verify();
                window.location.href = "finish.php";
            }
        })
        .catch(error => console.error('Error:', error));
}

let initPregunta = function(){
    fetch('/DAW2/PR0/PR0/back/server.php?route=initPregunta')
    .then(response => response.json())
    .then(data => {
        containerQuestion.textContent = data.pregunta;
            containerAnswers.innerHTML = ``;
            let answersHtml = ``;
            data.respostes.forEach(resposta => {
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
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${indice * 10}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${indice * 10}%"></div>
            </div>
            `;

            indice++;
    })
}

let verify = function () {
    fetch('/DAW2/PR0/PR0/back/server.php?route=verifyAnswer', {
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

document.addEventListener("SPAContentLoaded", function () {
    init();

    initPregunta();
});