let result;
let totalPoints;


function init(){
    result = document.querySelector('#result');
    totalPoints = document.querySelector('#totalPoints');
}

let getResults = function(){
    fetch('/tr0-2024-2025-un-munt-de-preguntes-a22jhepincre/back/server.php?route=results')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        result.textContent = data['nAnswersCorrect'] + "/10";
        totalPoints.textContent = data['totalPoints'];
    })
}



document.addEventListener("DOMContentLoaded", function () {
    init();

    getResults();
});