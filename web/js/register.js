import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

let btnSeePassword1;
let btnSeePassword2;
let btnRegister;
let btnRedirigirLogin;

function init() {
    btnSeePassword1 = document.querySelector('#btnSeePassword1');
    btnSeePassword2 = document.querySelector('#btnSeePassword2');
    btnRegister = document.querySelector('#btnRegister');
    btnRedirigirLogin = document.querySelector('#btnRedirigirLogin');

}

let initBtnSeePassword1 = function () {
    btnSeePassword1.addEventListener('click', function () {
        let notSeeIcon = document.querySelector('#notSeeIcon1');
        let seeIcon = document.querySelector('#seeIcon1');
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

let initBtnSeePassword2 = function () {
    btnSeePassword2.addEventListener('click', function () {
        let notSeeIcon = document.querySelector('#notSeeIcon2');
        let seeIcon = document.querySelector('#seeIcon2');
        let password = document.querySelector('#passwordConfirm');

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
    let passwordConfirm = document.querySelector('#passwordConfirm');
    let email = document.querySelector('#email');
    let name = document.querySelector('#name');
    let validatorName = document.querySelector('#validatorName');
    let validatorEmail = document.querySelector('#validatorEmail');
    let validatorPassword = document.querySelector('#validatorPassword');
    let validatorPasswordConfirm = document.querySelector('#validatorPasswordConfirm');
    btnRegister.disabled = true;

    let passwordValidator = false;
    let emailValidator = false;
    let nameValidator = false;

    name.addEventListener('keyup', function () {
        if (this.value.length == 0) {
            validatorName.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
            nameValidator = false;
        } else {
            validatorName.innerHTML = ``;
            nameValidator = true;
        }

        if (emailValidator && passwordValidator && nameValidator) btnRegister.disabled = false;
        else btnRegister.disabled = true
    });

    email.addEventListener('keyup', function () {
        if (this.value.length == 0) {
            validatorEmail.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
            emailValidator = false;
        } else {
            validatorEmail.innerHTML = ``;
            emailValidator = true;
        }

        if (emailValidator && passwordValidator && nameValidator) btnRegister.disabled = false;
        else btnRegister.disabled = true
    });

    password.addEventListener('keyup', function () {
        if (this.value.length == 0) {
            validatorPassword.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
            validatorPasswordConfirm.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`

        } else {
            if (this.value != passwordConfirm.value) {
                validatorPassword.innerHTML = `<label class="text-danger fs-7">Las contraseñas deben ser iguales</label>`
                validatorPasswordConfirm.innerHTML = `<label class="text-danger fs-7">Las contraseñas deben ser iguales</label>`
                passwordValidator = false;
            } else {
                validatorPassword.innerHTML = ``;
                validatorPasswordConfirm.innerHTML = ``;
                passwordValidator = true;
            }
        }

        if (emailValidator && passwordValidator && nameValidator) btnRegister.disabled = false;
        else btnRegister.disabled = true
    });

    passwordConfirm.addEventListener('keyup', function () {
        if (this.value.length == 0) {
            validatorPassword.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
            validatorPasswordConfirm.innerHTML = `<label class="text-danger fs-7">Este campo no puede estar vacio</label>`
        } else {
            if (this.value != password.value) {
                validatorPassword.innerHTML = `<label class="text-danger fs-7">Las contraseñas deben ser iguales</label>`
                validatorPasswordConfirm.innerHTML = `<label class="text-danger fs-7">Las contraseñas deben ser iguales</label>`
                passwordValidator = false;
            } else {
                validatorPassword.innerHTML = ``;
                validatorPasswordConfirm.innerHTML = ``;
                passwordValidator = true;
            }
        }

        if (emailValidator && passwordValidator && nameValidator) btnRegister.disabled = false;
        else btnRegister.disabled = true
    });
}

let initBtnRedirigirLogin = function(){
    btnRedirigirLogin.addEventListener('click', function(){
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/login.html', '../js/login.js', 'loginLoaded');
    });
}

let initBtnRegister = function () {
    btnRegister.addEventListener('click', function () {
        let validatorName = document.querySelector('#validatorName');
        let validatorEmail = document.querySelector('#validatorEmail');
        let toastMsg = document.querySelector('#toastMsg');

        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        let name = document.querySelector('#name');
        let liveToastError = document.querySelector('#liveToastError');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToastError)

        console.log(email.value);
        console.log(password.value);
        console.log(name.value);

        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'register': true,
                'email': email.value,
                'password': password.value,
                'name': name.value
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (!data.status) {
                    console.log("ya existe.")
                    if(data.name.users != null){
                        validatorName.innerHTML = `<label class="text-danger fs-7">Este campo ya existe</label>`;
                        toastMsg.textContent = "El nombre ya existe";
                    }
                    if(data.email.users != null){
                        validatorEmail.innerHTML = `<label class="text-danger fs-7">Este campo ya existe</label>`;   
                        toastMsg.textContent = "El email ya existe";
                    }

                    if(data.name.users != null && data.email.users != null) toastMsg.textContent = "El nombre o el email ya existen.";

                    toastBootstrap.show();
                } else {
                    console.log("creado exitosamente")
                    allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');

                }
            })
            .catch(error => console.error('Error:', error));
    });
}

document.querySelector('#app').addEventListener('registerLoaded', function (event) {
    init();
    initBtnSeePassword1();
    initBtnSeePassword2();
    initBtnRegister();
    passwordCheck();
    initBtnRedirigirLogin();
});