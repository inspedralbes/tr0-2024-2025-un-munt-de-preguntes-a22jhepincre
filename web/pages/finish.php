<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <style>
         body {
            background-color: #71CBF0;
        }
        
        .center-screen {
            height: 100vh; 
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    </style>
</head>
<body>
    <div class="center-screen">
        <p class="fs-1 fw-bold text-white">Acabaste</p>
        <div class="card">
            <div class="card-body">
                <p class="fs-3 fw-bold m-0" id="result"></p>
                <p class="fs-3 fw-bold m-0" id="totalPoints"></p>
                <a href="home.php" class="btn btn-primary">Home</a>
                <a href="juego.php" class="btn btn-primary">Retry</a>
            </div>
        </div>
    </div>
<script src="../bootstrap/js/bootstrap.min.js"></script>
<script src="../js/finish.js"></script>
</body>
</html>