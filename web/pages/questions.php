<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <style>
        .center-screen {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        body {
            background-color: #71CBF0;
        }
    </style>
</head>

<body>
    <div class="center-screen w-100 text-center">
        <div class="w-75">
            <div class="text-start py-4">
                <p class="fs-1 fw-bold text-white">Preguntas</p>
            </div>

            <div class="card w-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <div class="input-group mb-3 w-25">
                            <input type="text" class="form-control" placeholder="Buscar..." aria-label="Buscar" aria-describedby="basic-addon1">
                        </div>
                        <button class="btn btn-primary">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </span>
                            <span>Pregunta</span>
                        </button>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Pregunta</th>
                                    <th scope="col">Imatge</th>
                                    <th scope="col">Respostes</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../bootstrap/js/bootstrap.min.js"></script>

</body>

</html>