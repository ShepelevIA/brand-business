<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <title>Админка</title>
</head>
<body class="m-3">

<ul class="nav">
    <li class="nav-item" <?php echo isset($_SESSION['access']) && $_SESSION['access'] ? '' : 'style="display: none"';?> >
        <a class="nav-link active" aria-current="page" href="/app/admin/feedback.php">Клиенты</a>
    </li>
    <li class="nav-item" <?php echo isset($_SESSION['access']) && $_SESSION['access'] ? 'style="display: none"' : '';?> >
        <a class="nav-link" href="/app/admin/login.php"">Войти</a>
    </li>
    <li class="nav-item" <?php  echo isset($_SESSION['access']) && $_SESSION['access'] ? 'style="display: none"' : '';?> >
        <a class="nav-link" href="/app/admin/regist.php"">Регистрация</a>
    </li>
    <li class="nav-item" <?php echo isset($_SESSION['access']) && $_SESSION['access'] ? '' : 'style="display: none"';?>>
        <a class="nav-link" href="/app/admin/logout.php"">Выйти</a>
    </li>
</ul>