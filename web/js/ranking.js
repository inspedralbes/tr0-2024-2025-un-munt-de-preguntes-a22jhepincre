let containerRanking;


function init(){
    containerRanking = document.querySelector('#container-ranking');
}

function getRanking(){
    fetch('/DAW2/PR0/PR0/back/server.php?route=ranking')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let html = ``;
        data['users'].forEach(user => {
            html += `
                <div class="card">
                    <div class="card-body">
                        ${user['name']} - ${user['total_score']}
                    </div>
                </div>
            `;
        });

        containerRanking.innerHTML = html;
    })
}

document.addEventListener("DOMContentLoaded", function () {
    init();

    getRanking();
});