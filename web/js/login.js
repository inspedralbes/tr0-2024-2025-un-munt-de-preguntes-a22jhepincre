import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnSeePassword;
let btnLogin;
let btnRedirigirRegister;

function init() {
    btnSeePassword = document.querySelector('#btnSeePassword');
    btnLogin = document.querySelector('#btnLogin');
    btnRedirigirRegister = document.querySelector('#btnRedirigirRegister');
}

let initBtnSeePassword = function () {
    btnSeePassword.addEventListener('click', function () {
        let notSeeIcon = document.querySelector('#notSeeIcon');
        let seeIcon = document.querySelector('#seeIcon');
        let password = document.querySelector('#password');

        if (notSeeIcon.classList.contains('d-none')) {
            notSeeIcon.classList.remove('d-none');
            seeIcon.classList.add('d-none');
            password.type = "password";
        } else {
            seeIcon.classList.remove('d-none');
            notSeeIcon.classList.add('d-none');
            password.type = "text";
        }

    });
}

let passwordCheck = function () {
    let password = document.querySelector('#password');
    let email = document.querySelector('#email');
    let validatorEmail = document.querySelector('#validatorEmail');
    let validatorPassword = document.querySelector('#validatorPassword');
    btnLogin.disabled = true;

    let passwordValidator = false;
    let emailValidator = false;

    email.addEventListener('keyup', function () {
        if (this.value.length == 0) {
            validatorEmail.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
            emailValidator = false;
        } else {
            validatorEmail.innerHTML = ``;
            emailValidator = true;
        }

        if (emailValidator && passwordValidator) btnLogin.disabled = false;
        else btnLogin.disabled = true
    });

    password.addEventListener('keyup', function () {
        if (this.value.length == 0) {
            validatorPassword.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
        } else {
            validatorPassword.innerHTML = ``;
            passwordValidator = true;
        }

        if (emailValidator && passwordValidator) btnLogin.disabled = false;
        else btnLogin.disabled = true
    });
}

let initBtnLogin = function () {
    btnLogin.addEventListener('click', function () {
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');

        let liveToastError = document.querySelector('#liveToastError');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToastError);

        console.log(email.value);
        console.log(password.value);

        // /back/server.php?route=authenticate
        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'register': false,
                'email': email.value,
                'password': password.value
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === 'success' && data.users != null) {
                    allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
                } else {
                    toastMsg.textContent = "No se encontro el usuario";
                    toastBootstrap.show();
                }
            })
            .catch(error => console.error('Error:', error));
    });
}

let initBtnRedirigirRegister = function () {
    btnRedirigirRegister.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/register.html', '../js/register.js', 'registerLoaded');
    });
}

document.querySelector('#app').addEventListener('loginLoaded', function (event) {
    init();
    initBtnSeePassword();
    initBtnLogin();
    initBtnRedirigirRegister();
    passwordCheck();
});