<?php
include('conexion.php');
// Inicia la sesión si es necesario
session_start();

// Recoge el método de la petición
$requestMethod = $_SERVER['REQUEST_METHOD'];
// Recoge la ruta solicitada (por ejemplo, api.php?route=algo)
$route = isset($_GET['route']) ? $_GET['route'] : '';

// function getPreguntas()
// {
//     $preguntasFile = json_decode(file_get_contents("data.json"), true);

//     if ($preguntasFile === null) {
//         http_response_code(500);
//         echo json_encode(["error" => "No se pudo leer el archivo de preguntas"]);
//         exit;
//     }
//     $_SESSION['preguntasFileJSON'] = $preguntasFile;
//     $idsRandom = [];

//     while (count($idsRandom) < 10) {
//         $idRandom = rand(0, count($_SESSION['preguntasFileJSON']['preguntes']) - 1);

//         if (!in_array($idRandom, $idsRandom)) {
//             $idsRandom[] = $idRandom;
//         }
//     }

//     $preguntasRandom = [];

//     foreach ($idsRandom as $id) {
//         $preguntasRandom[] = $_SESSION['preguntasFileJSON']['preguntes'][$id];
//     }

//     $_SESSION['preguntasFile'] = $preguntasRandom;

//     $preguntas = [];

//     foreach ($preguntasRandom as $pregunta) {
//         $questionWithoutCorrect = [];
//         foreach ($pregunta['respostes'] as $resposta) {
//             $questionWithoutCorrect[] = [
//                 'id' => $resposta['id'],
//                 'resposta' => $resposta['resposta']
//             ];
//         }
//         $preguntas[] = [
//             'id' => $pregunta['id'],
//             'pregunta' => $pregunta['pregunta'],
//             'respostes' => $questionWithoutCorrect,
//             'imatge' => $pregunta['imatge']
//         ];
//     }

//     $_SESSION['preguntasWithoutCorrect'] = $preguntas;
//     // return $preguntas;
// }

function getNow()
{
    return date('Y-m-d H:i:s');
}

// Define las rutas para GET y POST
switch ($requestMethod) {
    case 'GET':
        handleGetRequest($route);
        break;

    case 'POST':
        handlePostRequest($route);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Función para manejar las peticiones GET
function handleGetRequest($route)
{
    switch ($route) {
        case 'preguntas':
            // http://localhost/PR0/PR0/back/server.php?route=preguntas preguntas sin la correcta
            $selectQuestions = json_decode(getRandomQuestions(), true);
            $_SESSION['preguntasFile'] = $selectQuestions['questions'];

            $preguntas = $_SESSION['preguntasFile'];
            header('Content-Type: application/json');
            echo json_encode($preguntas);
            break;
            // http://localhost/PR0/PR0/back/server.php?route=initPregunta
        case 'initPregunta':
            $_SESSION['indicePreguntasWithoutCorrect'] = 0;
            $_SESSION['answersSuccess'] = 0;
            $_SESSION['start'] = getNow();

            $selectQuestions = json_decode(getRandomQuestions(), true);
            $_SESSION['preguntasWithoutCorrect'] = $selectQuestions['questions'];

            $id = $_SESSION['indicePreguntasWithoutCorrect'];
            $preguntas = $_SESSION['preguntasWithoutCorrect'];
            if (isset($preguntas[$id])) {
                header('Content-Type: application/json');
                echo json_encode($preguntas[$id]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Pregunta no encontrada"]);
            }
            break;
        case 'pregunta':
            // http://localhost/PR0/PR0/back/server.php?route=pregunta una pregunta dependiendo del indice
            // $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
            if ($_SESSION['indicePreguntasWithoutCorrect'] == null) {
                $_SESSION['indicePreguntasWithoutCorrect'] = 0;
            }
            $_SESSION['indicePreguntasWithoutCorrect'] += 1;
            $id = $_SESSION['indicePreguntasWithoutCorrect'];
            $preguntas = $_SESSION['preguntasWithoutCorrect'];
            if (isset($preguntas[$id])) {
                header('Content-Type: application/json');
                echo json_encode(['preguntas' => $preguntas[$id], 'status' => true]);
            } else {
                // http_response_code(404);
                $_SESSION['end'] = getNow();
                echo json_encode(["status" => false]);
            }
            break;
            // http://localhost/PR0/PR0/back/server.php?route=results
        case 'results':
            //calculate time
            $startDate = strtotime($_SESSION['start']);
            $endDate = strtotime($_SESSION['end']);
            $diff = $endDate - $startDate;

            $totalPoints = ($_SESSION['answersSuccess'] * 20) + $diff;
            setPoints($_SESSION['idUser'], $totalPoints);
            echo json_encode([
                "nAnswersCorrect" => $_SESSION['answersSuccess'],
                "startDate" => $_SESSION['start'],
                "endDate" => $_SESSION['end'],
                "diff" => $diff,
                'totalPoints' => $totalPoints,
                'idUser' => $_SESSION['idUser']
            ]);
            break;
            // http://localhost/PR0/PR0/back/server.php?route=ranking
        case 'ranking':
            echo getRanking();
            break;
        default:
            // Ruta no encontrada
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
            break;
    }
}

// Función para manejar las peticiones POST
function handlePostRequest($route)
{
    switch ($route) {
            // http://localhost/PR0/PR0/back/server.php?route=verifyAnswer necesita data
        case 'verifyAnswer':
            // Leer el contenido JSON desde la petición POST
            $data = json_decode(file_get_contents('php://input'), true);

            if (is_null($data)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "No se han enviado datos o el formato es incorrecto"]);
                return;
            }

            //calculate correct answers
            $idRespostaCorrecta = $data['idsRespostes'];

            $preguntas = $_SESSION['preguntasWithoutCorrect'];
            // $_SESSION['answersSuccess'];
            foreach ($preguntas as $key => $pregunta) {
                $verify = json_decode(verfiyAnswer($idRespostaCorrecta[$key], $pregunta['id']), true);
                if ($verify['correcta'] == 1) {
                    $_SESSION['answersSuccess'] += 1;
                }
            }

            // Devolver la respuesta en formato JSON
            header('Content-Type: application/json');
            echo json_encode($_SESSION['answersSuccess']);
            break;
            // http://localhost/PR0/PR0/back/server.php?route=addUser necesita data
        case 'addUser':
            $data = json_decode(file_get_contents('php://input'), true);
            if (is_null($data)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "No se han enviado datos o el formato es incorrecto"]);
                return;
            }

            $name = $data['name'];

            $result = json_decode(addUser($name), true);
            $_SESSION['idUser'] = $result['idUser'];
            echo json_encode($result);
            break;
        default:
            // Ruta no encontrada para POST
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
            break;
    }
}
