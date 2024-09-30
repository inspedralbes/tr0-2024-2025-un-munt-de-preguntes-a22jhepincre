import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnSeePassword;
let btnLogin;

function init() {
    btnSeePassword = document.querySelector('#btnSeePassword');
    btnLogin = document.querySelector('#btnLogin');
}

let initBtnSeePassword = function(){
    btnSeePassword.addEventListener('click', function(){
        let notSeeIcon = document.querySelector('#notSeeIcon');
        let seeIcon = document.querySelector('#seeIcon');
        let password = document.querySelector('#password');

        if(notSeeIcon.classList.contains('d-none')){
            notSeeIcon.classList.remove('d-none');
            seeIcon.classList.add('d-none');
            password.type = "password"; 
        }else{
            seeIcon.classList.remove('d-none');
            notSeeIcon.classList.add('d-none');
            password.type = "text"; 
        }

    });
}

let initBtnLogin = function(){
    btnLogin.addEventListener('click', function(){
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');

        console.log(email.value);
        console.log(password.value);

    });
}

document.querySelector('#app').addEventListener('loginLoaded', function(event) {
    init();
    initBtnSeePassword();
    initBtnLogin();
});