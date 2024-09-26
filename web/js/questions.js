import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones


const pencilIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`;
const garbageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`;

let tableQuestionBody;
let imatge;
let containerImg;
let btnAddQuestion;
let btnDeleteQuestion;
let btnHome;
let btnOpenModalUpdateQuestion;
let btnOpenAddModalQuestion;
let labelModal;
let btnCloseModal;
let modalElement;
let exampleModal;
let btnUpdateQuestion;

function init() {
    tableQuestionBody = document.querySelector('#tableQuestionBody');
    imatge = document.querySelector('#imatgeURL');
    containerImg = document.querySelector('#containerImg');
    btnAddQuestion = document.querySelector('#btnAddQuestion');
    btnHome = document.querySelector('#btnHome');
    btnOpenAddModalQuestion = document.querySelector('#btnOpenAddModalQuestion');
    labelModal = document.querySelector('#labelModal');
    btnCloseModal = document.querySelector('#btnCloseModal');
    modalElement = document.getElementById('exampleModal');
    exampleModal = new bootstrap.Modal(modalElement);
    btnUpdateQuestion = document.querySelector('#btnUpdateQuestion');
}

let initBtnCloseModal = function () {
    btnCloseModal.addEventListener('click', function () {
        emptyForm();
        exampleModal.hide();
    })
}

let initTable = function () {

    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=preguntas')
        .then(response => response.json())
        .then(data => {
            tableQuestionBody.innerHTML = ``;
            data.forEach(pregunta => {
                tableQuestionBody.innerHTML +=
                    `
                <tr>
                    <td>${pregunta.id}</td>
                    <td>${pregunta.pregunta}</td>
                    <td>${pregunta.imatge}</td>
                    <td>RESPOSTA</td>
                    <td>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-secondary me-1 btnOpenModalUpdateQuestion"
                                data-id-question="${pregunta.id}">
                                ${pencilIcon}
                            </button>
                            <button class="btn btn-sm btn-danger btnDeleteQuestion"
                                data-id-question="${pregunta.id}">
                                ${garbageIcon}
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            });
            initBtnDeleteQuestion();
            initbtnOpenModalUpdateQuestion();

        })
}

let cargarImg = function () {
    imatge.addEventListener('change', function () {
        let url = imatge.value;
        containerImg.innerHTML = `<img src="${url}" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;" alt="ERROR"/>`
    });
}

let initBtnAddQuestion = function () {
    btnAddQuestion.addEventListener('click', function () {
        let pregunta = document.querySelector('#pregunta');
        let difficult = document.querySelector('#difficult');
        let imatge = document.querySelector('#imatgeURL');
        let respostasInput = document.querySelectorAll('.resposta');
        let checkRespostaCorrecta = document.querySelectorAll('.checkRespostaCorrecta');
        let respostas = [];
        let i = 0;
        respostasInput.forEach((resposta) => {
            respostas.push(
                {
                    "resposta": resposta.value,
                    "correcta": checkRespostaCorrecta[i].checked
                });
            i++;
        })
        // $data['pregunta'], $data['imatgeURL'], $data['dificultat'], $data['answers']
        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=addQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "pregunta": pregunta.value,
                "dificultat": difficult.value,
                "imatgeURL": imatge.value,
                "answers": respostas
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                emptyForm();
                exampleModal.hide();
                initTable();
            })
            .catch(error => console.error('Error:', error));
    })
}

let initBtnDeleteQuestion = function () {
    btnDeleteQuestion = document.querySelectorAll('.btnDeleteQuestion');
    btnDeleteQuestion.forEach((btnDelete) => {
        btnDelete.addEventListener('click', function () {
            let idQuestion = this.dataset.idQuestion
            console.log(idQuestion)
            fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=deleteQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'idQuestion': idQuestion
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    initTable();
                })
                .catch(error => console.error('Error:', error));
        });
    })
}

let initbtnOpenModalUpdateQuestion = function () {
    btnOpenModalUpdateQuestion = document.querySelectorAll('.btnOpenModalUpdateQuestion');
    btnOpenModalUpdateQuestion.forEach((btnOpenModalUpdate) => {
        btnOpenModalUpdate.addEventListener('click', function () {
            let idQuestion = this.dataset.idQuestion;
            let pregunta = document.querySelector('#pregunta');
            let difficult = document.querySelector('#difficult');
            let imatge = document.querySelector('#imatgeURL');
            let respostasInput = document.querySelectorAll('.resposta');
            let checkRespostaCorrecta = document.querySelectorAll('.checkRespostaCorrecta');
            let idQuestionInput = document.querySelector('#idQuestion');

            fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=getQuestion&id=' + idQuestion)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    idQuestionInput.value = idQuestion;
                    pregunta.value = data.questions.pregunta;
                    imatge.value = data.questions.imatge;
                    difficult.value = data.questions.difficult;
                    respostasInput.forEach((resposta, key) => {
                        resposta.value = data.questions.respostes[key].resposta;
                        resposta.dataset.idResposta = data.questions.respostes[key].id;
                        if (data.questions.respostes[key].correcta == 1) {
                            checkRespostaCorrecta[key].checked = true;
                        }
                    })
                    let btnAddQuestion = document.querySelector('#btnAddQuestion');
                    let btnUpdateQuestion = document.querySelector('#btnUpdateQuestion');

                    btnAddQuestion.classList.add('d-none');
                    btnUpdateQuestion.classList.remove('d-none');
                    labelModal.textContent = "Actualizar pregunta"

                    exampleModal.show();

                })
        });
    });
}

let initBtnUpdateQuestion = function(){
    btnUpdateQuestion.addEventListener('click', function(){
        let pregunta = document.querySelector('#pregunta');
        let difficult = document.querySelector('#difficult');
        let imatge = document.querySelector('#imatgeURL');
        let respostasInput = document.querySelectorAll('.resposta');
        let checkRespostaCorrecta = document.querySelectorAll('.checkRespostaCorrecta');
        let idQuestionInput = document.querySelector('#idQuestion');

        let answers = [];

        respostasInput.forEach((resposta, key)=>{
            let answer = {
                "id": resposta.dataset.idResposta,
                "resposta":resposta.value,
                "correcta":checkRespostaCorrecta[key].checked
            }

            answers.push(answer);
        });

        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=updateQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "question": {
                    "id":idQuestionInput.value,
                    "pregunta":pregunta.value,
                    "imatgeURL": imatge.value,
                    "dificultat": difficult.value
                },
                "answers":answers
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                emptyForm();
                exampleModal.hide();
                initTable();
            })
            .catch(error => console.error('Error:', error));
    });  
}

let initBtnOpenAddModalQuestion = function () {
    btnOpenAddModalQuestion.addEventListener('click', function () {
        emptyForm();

        let btnAddQuestion = document.querySelector('#btnAddQuestion');
        let btnUpdateQuestion = document.querySelector('#btnUpdateQuestion');

        labelModal.textContent = "Añadir pregunta"
        btnAddQuestion.classList.remove('d-none');
        btnUpdateQuestion.classList.add('d-none');

        exampleModal.show();

    });
}

let initBtnHome = function () {
    btnHome.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
    })
}

function emptyForm() {
    let pregunta = document.querySelector('#pregunta');
    let difficult = document.querySelector('#difficult');
    let imatge = document.querySelector('#imatgeURL');
    let respostasInput = document.querySelectorAll('.resposta');
    let checkRespostaCorrecta = document.querySelectorAll('.checkRespostaCorrecta');

    pregunta.value = "";
    difficult.value = "easy";
    imatge.value = "";
    respostasInput.forEach((resposta, key) => {
        resposta.value = "";
    })

    checkRespostaCorrecta[0].checked = true;
}

document.querySelector('#app').addEventListener("questionsLoaded", function () {
    init();
    initTable();
    cargarImg();
    initBtnAddQuestion();
    initBtnUpdateQuestion();
    initBtnHome();
    initBtnOpenAddModalQuestion();
    initBtnCloseModal();
});