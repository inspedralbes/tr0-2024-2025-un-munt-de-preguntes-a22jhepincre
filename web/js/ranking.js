let containerRanking;


function init(){
    containerRanking = document.querySelector('#container-ranking');
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
                        ${user['name']} - ${user['total_score']}
                    </div>
                </div>
            `;
        });

        containerRanking.innerHTML = html;
    })
}

document.querySelector('#app').addEventListener("rankingLoaded", function () {
    init();

    getRanking();
});