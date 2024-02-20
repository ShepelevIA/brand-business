<?php
require __DIR__ . '/../../app/admin/header.php';
unset($_SESSION['access']);
session_destroy();
$url = '/app/admin/login.php';
header('location: ' . $url);