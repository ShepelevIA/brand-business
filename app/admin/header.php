<?php
session_start([
    'cookie_lifetime' => 86400,
]);

ini_set('display_errors', 'On');
error_reporting(E_ALL);

require '../DB.php';