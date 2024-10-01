<?php
include('conexion.php');
// Inicia la sesión si es necesario
session_start();
// Recoge el método de la petición
$requestMethod = $_SERVER['REQUEST_METHOD'];
// Recoge la ruta solicitada (por ejemplo, api.php?route=algo)
$route = isset($_GET['route']) ? $_GET['route'] : '';

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
            // back/server.php?route=getAuthenticate
        case 'getAuthenticate':
            if (!isset($_SESSION['user'])) {
                echo json_encode(['login' => false, "msg" => "No hay una sesion iniciada."]);
            } else {
                echo json_encode(['login' => true, "msg" => "Hay una sesion iniciada.", 'user'=>$_SESSION['user']]);
            }
            break;
            // back/server.php?route=logout
        case 'logout':
            session_destroy();
            echo json_encode(['status'=>"success", 'msg'=>"Se cerro la sesión con exitó"]);
            break;
        case 'preguntas':
            // http://localhost/PR0/PR0/back/server.php?route=preguntas preguntas sin la correcta
            $selectQuestions = json_decode(getQuestions(), true);
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
            setPoints($_SESSION['user']['id'], $totalPoints);
            echo json_encode([
                "nAnswersCorrect" => $_SESSION['answersSuccess'],
                "startDate" => $_SESSION['start'],
                "endDate" => $_SESSION['end'],
                "diff" => $diff,
                'totalPoints' => $totalPoints,
                'user' => $_SESSION['user']
            ]);
            break;
            // http://localhost/PR0/PR0/back/server.php?route=ranking
        case 'ranking':
            echo getRanking();
            break;
        case 'getQuestion':
            // Verifica si el parámetro 'id' está presente en la URL
            if (isset($_GET['id'])) {
                $id = intval($_GET['id']);

                $question = json_decode(getQuestion($id), true);

                if ($question) {
                    header('Content-Type: application/json');
                    echo json_encode($question);
                } else {
                    // Si la pregunta no existe, devuelve un error
                    http_response_code(404);
                    echo json_encode(["error" => "Pregunta no encontrada"]);
                }
            } else {
                // Si no se proporciona el 'id', devuelve un error
                http_response_code(400);
                echo json_encode(["error" => "ID no proporcionado"]);
            }
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
            // /back/server.php?route=authenticate necesita data
        case 'authenticate':
            $data = json_decode(file_get_contents('php://input'), true);

            if (is_null($data)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "No se han enviado datos o el formato es incorrecto"]);
                return;
            }

            if ($data['register']) {
                $validatorName = json_decode(validatorName($data['name']), true);
                $validatorEmail = json_decode(validatorEmail($data['email']), true);

                // echo json_encode(['name'=>$validatorName, 'email'=>$validatorEmail]);
                if ($validatorEmail['users'] != null || $validatorName['users'] != null) {
                    echo json_encode(['status' => false, 'msg' => "El nombre o el correo ya existen.", 'name' => $validatorName, 'email' => $validatorEmail]);
                } else {
                    $result = json_decode(addUser($data['name'], $data['email'], $data['password']), true);
                    // Devolver la respuesta en formato JSON
                    $_SESSION['user'] = $result['users'];
                    header('Content-Type: application/json');
                    echo json_encode($result);
                }
            } else {
                $result = json_decode(authenticateUser($data['email'], $data['password']), true);
                $_SESSION['user'] = $result['users'];
                // Devolver la respuesta en formato JSON
                header('Content-Type: application/json');
                echo json_encode($result);
            }

            break;
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
        case 'addQuestion':
            $data = json_decode(file_get_contents('php://input'), true);
            if (is_null($data)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "No se han enviado datos o el formato es incorrecto"]);
                return;
            }
            $result = json_decode(insertQuestion($data['pregunta'], $data['imatgeURL'], $data['dificultat'], $data['answers']), true);
            echo json_encode($result);
            break;
        case 'updateQuestion':
            $data = json_decode(file_get_contents('php://input'), true);
            if (is_null($data)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "No se han enviado datos o el formato es incorrecto"]);
                return;
            }
            // echo json_encode($data);
            $result = json_decode(updateQuestion($data['question'], $data['answers']), true);

            echo json_encode($result);
            break;
        case 'deleteQuestion':
            $data = json_decode(file_get_contents('php://input'), true);
            if (is_null($data)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "No se han enviado datos o el formato es incorrecto"]);
                return;
            }
            $resultDeleteAnswers = json_decode(deleteAnswers($data['idQuestion']), true);

            $result = json_decode(deleteQuestion($data['idQuestion']), true);
            echo json_encode(["preguntas" => $result, "respuesotas" => $resultDeleteAnswers]);
            break;
        default:
            // Ruta no encontrada para POST
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
            break;
    }
}
