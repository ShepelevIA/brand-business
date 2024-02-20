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
    if ($_POST['login'] && $_POST['password']) {
        // логика проверки
        $login = $_POST['login'];
        $password = $_POST['password'];

        try {
            // Получение пользователя
            $db = DB::getInstance();
            $sql = "SELECT * FROM users WHERE login=:login";
            $params = [':login' => $login];
            $user = $db->query($sql, $params);

            if (count($user) === 1) {
                if (password_verify($password, $user[0]['password'])) {
                    if ($user[0]['activ'] === 1) {
                        $_SESSION['access'] = true;
                        header('location: /app/admin/feedback.php');
                    } else {
                        $errors[] = 'Доступ запрещен';
                    }
                } else {
                    $errors[] = 'Пароль не верный';
                }
            } else {
                $errors[] = 'Логин не верный';
            }
        }
        catch (PDOException $e) {
            $errors[] = "Database error: " . $e->getMessage();
        }
    } else {
        $errors[] = 'Введите логин и пароль';
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
