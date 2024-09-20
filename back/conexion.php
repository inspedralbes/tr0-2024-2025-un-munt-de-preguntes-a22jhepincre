<?php

function conectDB()
{
    $server = "localhost";
    $user = "a22jhepincre";
    $password = "root";
    $dbName = "PR0";

    return mysqli_connect($server, $user, $password, $dbName);
}

function closeDB($conex)
{
    mysqli_close($conex);
}

//functions for user
function addUser($name)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $stmt = mysqli_prepare($conex, "INSERT INTO user (name) VALUES (?)");

    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    }

    mysqli_stmt_bind_param($stmt, "s", $name);

    if (mysqli_stmt_execute($stmt)) {
        $userId = mysqli_insert_id($conex);
        $response = json_encode(['status' => 'success', 'message' => 'Usuario añadido exitosamente.', 'idUser' => $userId]);
    } else {
        $response = json_encode(['status' => 'error', 'message' => 'Error al añadir el usuario: ' . mysqli_error($conex)]);
    }

    // Cierra la sentencia y la conexión
    mysqli_stmt_close($stmt);
    closeDB($conex);

    return $response;
}

function getRanking()
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $result = mysqli_query($conex, "SELECT * FROM user ORDER BY total_score DESC;");

    if ($result === false) {
        return json_encode(['status' => 'error', 'message' => 'Error al seleccionar usuarios: ' . mysqli_error($conex)]);
    }

    $users = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    $response = json_encode(['status' => 'success', 'users' => $users]);

    closeDB($conex);

    return $response;
}

function setPoints($id, $points)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $stmt = mysqli_prepare($conex, "UPDATE user SET total_score = ? WHERE id = ?");

    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    }

    mysqli_stmt_bind_param($stmt, "ii", $points, $id);

    if (mysqli_stmt_execute($stmt)) {
        $response = json_encode(['status' => 'success', 'message' => 'Usuario modificado exitosamente.']);
    } else {
        $response = json_encode(['status' => 'error', 'message' => 'Error al modificar usuario: ' . mysqli_error($conex)]);
    }

    // Cierra la sentencia y la conexión
    mysqli_stmt_close($stmt);
    closeDB($conex);

    return $response;
}

//functions for questions
function getRandomQuestions()
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $result = mysqli_query($conex, "SELECT * FROM questions ORDER BY RAND() LIMIT 10;");

    if ($result === false) {
        return json_encode(['status' => 'error', 'message' => 'Error al seleccionar questions: ' . mysqli_error($conex)]);
    }

    $questions = [];

    while ($row = mysqli_fetch_assoc($result)) {

        $queryAnswers = mysqli_query($conex, "SELECT id, resposta FROM answers WHERE idQuestion=${row['id']}");

        if ($queryAnswers === false) {
            return json_encode(['status' => 'error', 'message' => 'Error al seleccionar respuestas: ' . mysqli_error($conex)]);
        }

        $row['respostes'] = [];

        while ($rowAnswer = mysqli_fetch_assoc($queryAnswers)) {
            $row['respostes'][] = $rowAnswer;
        }

        $questions[] = $row;
    }

    $response = json_encode(['status' => 'success', 'questions' => $questions]);

    closeDB($conex);

    return $response;
}

//crud questions and answers
function insertQuestion($pregunta, $imatge, $difficult, $answers)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $stmt = mysqli_prepare($conex, "INSERT INTO questions (pregunta, imatge, difficult) VALUES (?,?,?)");

    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    }

    mysqli_stmt_bind_param($stmt, "sss", $pregunta, $imatge, $difficult);

    if (mysqli_stmt_execute($stmt)) {
        $questionId = mysqli_insert_id($conex);
        insertAnswers($questionId, $answers);
        $response = json_encode(['status' => 'success', 'message' => 'Usuario añadido exitosamente.', 'idQuestion' => $questionId]);
    } else {
        $response = json_encode(['status' => 'error', 'message' => 'Error al añadir el pregunta: ' . mysqli_error($conex)]);
    }

    // Cierra la sentencia y la conexión
    mysqli_stmt_close($stmt);
    closeDB($conex);

    return $response;
}

/**
 * @param answers array [object] object {resposta:string, correcta:boolean}
 * @param questionId question id
 */
function insertAnswers($questionId, $answers)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    foreach ($answers as $answer) {
        $stmt = mysqli_prepare($conex, "INSERT INTO answers (idQuestion, resposta, correcta) VALUES (?,?,?)");

        if ($stmt === false) {
            return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
        }

        mysqli_stmt_bind_param($stmt, "sss", $questionId, $answer['resposta'], $answer['correcta']);

        if (mysqli_stmt_execute($stmt)) {
            $response = json_encode(['status' => 'success', 'message' => 'Resposta añadido exitosamente.']);
        } else {
            $response = json_encode(['status' => 'error', 'message' => 'Error al añadir el resposta: ' . mysqli_error($conex)]);
        }

        // Cierra la sentencia y la conexión
        mysqli_stmt_close($stmt);
    }

    return $response;
}

//functions verifyAnswers
function verfiyAnswer($idAnswer, $idQuestion)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $query = mysqli_query($conex, "SELECT correcta FROM `answers` WHERE idQuestion=${idQuestion} and id=${idAnswer};");

    if ($query === false) {
        return json_encode(['status' => 'error', 'message' => 'Error al seleccionar questions: ' . mysqli_error($conex)]);
    }

    $result = mysqli_fetch_assoc($query);

    $response = json_encode($result);

    return $response;
}

?>
