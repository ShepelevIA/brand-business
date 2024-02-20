<?php
require __DIR__ . '/../../app/admin/header.php';

$errors = array();

if (isset($_SESSION['access'])) {
    if ($_SESSION['access']) {
        $url = '/app/admin/feedback.php';
        header('location: ' . $url);
    }
}

if (isset($_POST['submit'])) {
    if ($_POST['login'] && $_POST['password'] && $_POST['password_conformation'] ) {
        // логика проверки
        $login = $_POST['login'];
        $password = $_POST['password'];
        $passwordConformation = $_POST['password_conformation'];

        if ($password === $passwordConformation) {
           try {
                // Хешируем пароль
                $cost = 8;
                $password = password_hash($password, PASSWORD_BCRYPT, ["cost" => $cost]);
                // оправляем в БД
                $db = DB::getInstance();
                $sql = "INSERT INTO users (login, password) VALUES (:login, :password)";
                $params = [':login' => $login, ':password' => $password];
                $user = $db->query($sql, $params);
                //редиректим на страницу авторизации
               $url = '/app/admin/login.php';
               header('location: ' . $url);
            }
            catch (PDOException $e) {
                if ($e->getMessage() === "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'admin' for key 'users.login_UNIQUE'") {
                    $errors[] = 'Пользователь с таким логином уже существует';
                } else {
                    $errors[] = "Database error: " . $e->getMessage();
                }

            }
        } else {
            $errors[] = 'Пароли не совпадают, попробуйте еще раз';
        }

    } else {
        $errors[] = 'Заполните поля';
    }
}
require __DIR__ . '/../../app/admin/menu.php';
?>
<body class="m-5">
<div class="w-25">
    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
        <div class="mb-3">
            <label class="form-label">Login</label>
            <input type="text" name="login" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" name="password" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Password conformation</label>
            <input type="password" name="password_conformation" class="form-control">
        </div>
<?php
if ($errors) {
    foreach ($errors as $error) {
        echo ' <p class="text-danger">' . $error . '</p>';
    }
}
?>
        <button type="submit" value="submit" name="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
</body>
</html>
