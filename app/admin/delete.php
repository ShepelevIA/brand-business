<?php
if (isset($_SESSION['access'])) {
    if (!$_SESSION['access']) {
        $url = '/app/admin/login.php';
        header('location: ' . $url);
    }
    else {
        require __DIR__ . '/../../app/admin/header.php';
        $id = $_GET['id'];
        try {
            // Добавление записи в БД
            $db = DB::getInstance();
            $sql = "UPDATE clients SET deleted = 1 WHERE id = $id";
            $db->query($sql);
            header('location: /app/admin/feedback.php');
        }
        catch (PDOException $e) {
            echo "Database error: " . $e->getMessage();
        }
    }
}
else {
    $url = '/app/admin/login.php';
    header('location: ' . $url);
}
