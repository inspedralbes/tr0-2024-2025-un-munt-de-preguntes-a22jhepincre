<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <style>
        .btn-shadow {
            box-shadow: 15px 15px 15px rgba(113, 154, 174, 1);
        }

        .center-screen {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        body {
            background-color: #71CBF0;
        }

        .w-btn-play {
            width: 60%;
        }

        /* Si quieres mantener proporciones entre texto e imagen en todos los tamaños */
        @media (min-width: 768px) {
            .w-btn-play {
                width: 30% !important;
            }

            .w-lg-25 {
                width: 25% !important;
            }
        }
    </style>
</head>

<body>
    <div class="center-screen w-100 text-center" id="content">
        <div class="row w-100">
            <div class="col-lg-12 col-12">
                <img src="../img/question.png" class="img-fluid" />
            </div>
        </div>
        <div class="row w-100 mt-3">
            <div class="col-lg-12 col-12">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="w-50 w-lg-25">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        </div>
                        <button class="btn btn-primary btn-lg fs-2 fw-bold btn-shadow w-100" id="btnPlay">JUGAR</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-absolute bottom-0 end-0 p-4">
            <div class="card">
                <div class="card-body">
                    <a class="btn btn-primary" href="ranking.php">Ir a ranking</a>
                </div>
            </div>
        </div>
        <div class="position-absolute top-0 end-0 p-4">
            <button class="btn btn-secondary">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                </span>
                <span class="ms-2">Configuración</span>
            </button>
        </div>

        <div class="position-absolute top-0 start-0 p-4">
            <a class="btn btn-secondary" href="questions.php">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                </span>
                <span class="ms-2">Administrar questions</span>
            </a>
        </div>
    </div>

    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../js/home.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script> -->
</body>

</html>