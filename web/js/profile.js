import * as allFunctions from '../helpers/all.js'; // Importar todas las funciones

const iconError = "bi bi-exclamation-triangle-fill fs-5 me-2";
const iconSuccess = "bi bi-check-circle-fill fs-5 me-2";

let btnHome;
let btnLogOut;
let btnUpdateProfilePic;
let idUser;
let profilePicUser;
let toastIcon;
let toastMsg;
let liveToast;
let toastBootstrap;
let toastType;
let profilePicUserData;
let tableGamesBody;
let nameUserData;
let emailUserData;
let btnUpdateUser;


function init() {
    btnHome = document.querySelector('#btnHome');
    btnLogOut = document.querySelector('#btnLogOut');
    btnUpdateProfilePic = document.querySelectorAll('.btnUpdateProfilePic');
    idUser = document.querySelector('#idUser');
    profilePicUser = document.querySelector('#profilePicUser');
    toastIcon = document.querySelector('#toastIcon');
    toastMsg = document.querySelector('#toastMsg');
    liveToast = document.querySelector('#liveToast');
    toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
    toastType = document.querySelector('#toastType');
    profilePicUserData = document.querySelector('#profilePicUserData');
    tableGamesBody = document.querySelector('#tableGamesBody');
    nameUserData = document.querySelector('#nameUserData');
    emailUserData = document.querySelector('#emailUserData');
    btnUpdateUser = document.querySelector('#btnUpdateUser');
}


let initProfile = function () {
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=getAuthenticate')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.login) {
                //no logeado
                allFunctions.cargarPage(document.querySelector('#app'), '../pages/login.html', '../js/login.js', 'loginLoaded');
            } else {
                //logeado
                idUser.value = data['user']['id'];
                profilePicUser.src = data['user']['profile_pic'];
                profilePicUserData.src = data['user']['profile_pic'];
                nameUserData.value = data['user']['name'];
                emailUserData.value = data['user']['email'];
                initHistory(data['user']['id']);
            }

        })
}

let initHistory = function(idUser){
    // back/server.php?route=getHistory&idUser=123
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=getHistory&idUser='+idUser)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            tableGamesBody.innerHTML = ``; 
            if(data['status'] === 'success'){
                data['games'].forEach((game, key) =>{
                    tableGamesBody.innerHTML += 
                    `
                    <tr>
                        <td>${game.id}</td>
                        <td>${game.n_questions}</td>
                        <td>${game.n_questions_correct}</td>
                        <td>${game.n_questions_incorrect}</td>
                        <td>${game.score}</td>
                        <td>${game.time}</td>
                    </tr>
                    `;
                });
            }
        })
}

let initBtnUpdateUser = function(){
    btnUpdateUser.addEventListener('click', function(){
        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=updateUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "idUser": idUser.value,
                "data": {
                    "name": nameUserData.value,
                    "email": emailUserData.value
                }
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                toastBootstrap.show();
                toastIcon.classList = iconSuccess;
                toastMsg.textContent = data['message'];
                toastType.classList.add('bg-success')
            })
            .catch(error => {
                console.error('Error:', error)
                toastBootstrap.show();
                toastIcon.classList = iconError;
                toastMsg.textContent = error;
                toastType.classList.add('bg-danger')
            });
    });
}

let initBtnHome = function () {
    btnHome.addEventListener('click', function () {
        allFunctions.cargarPage(document.querySelector('#app'), '../pages/home.html', '../js/home.js', 'homeLoaded');
    })
}

let initBtnLogOut = function () {
    btnLogOut.addEventListener('click', function () {
        fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=logout')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "success") {
                    allFunctions.cargarPage(app, '../pages/login.html', '../js/login.js', 'loginLoaded');
                }

            })
    });
}

let initBtnUpdateProfilePic = function () {
    btnUpdateProfilePic.forEach(btn => {
        btn.addEventListener('click', function () {
            let newProfilePic = this.dataset.profilePicUrl;
            console.log(newProfilePic);

            fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=updateProfilePic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "idUser": idUser.value,
                    "profilePic": newProfilePic
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    profilePicUser.src = data['user']['users']['profile_pic'];
                    profilePicUserData.src = data['user']['users']['profile_pic'];
                    toastBootstrap.show();
                    toastIcon.classList = iconSuccess;
                    toastMsg.textContent = data['message'];
                    toastType.classList.add('bg-success')
                })
                .catch(error => {
                    console.error('Error:', error)
                    toastBootstrap.show();
                    toastIcon.classList = iconError;
                    toastMsg.textContent = error;
                    toastType.classList.add('bg-danger')
                });
        });
    });
}

document.querySelector('#app').addEventListener('profileLoaded', function (event) {
    init();
    initProfile();
    initBtnHome();
    initBtnLogOut();
    initBtnUpdateProfilePic();
    initBtnUpdateUser();
});