<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

require 'vendor/autoload.php';
require 'app/DB.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$InvId = $_GET['InvId'];

$db = DB::getInstance();
$sql = "SELECT InvId, email FROM payment WHERE InvId = $InvId LIMIT 1";


$client = $db->query($sql);


// Получите данные из запроса или другого источника
$recipientEmail = $client[0]['email'];
$subject = 'Успешная оплата курса';
$message = 'Привет, это Настя ✋👋 <br>

Оплата прошла успешно, и я хочу сказать вам большое спасибо за доверие ко мне ❤ <br>

Важные моменты: <br>

1. Войти в телеграмм-канал марафона "Brand Business" можно по этой ссылке 
https://t.me/+-U7diIkgWVQ0OWEy  <br>

2. Если по каким-то причинам ссылка не работает, просто напишите нам об этом в телеграм
 @Launch_you. <br>

3. Старт марафона 28-ого ноября в 12:00 по Московскому времени. <br>
До встречи в канале марафона, Ваша Настя.';

// Путь к изображению
$imagePath = 'https://brand-business.ru/img/mail.jpg'; // Укажите путь к вашему изображению

// Генерация уникального разделителя для границы между частями письма
$boundary = md5(time());

// Формирование HTML-текста письма с встроенным изображением
$htmlMessage = "
<html>
<head>
  <title>$subject</title>
</head>
<body>
    <img src='data:image/jpeg;base64," . base64_encode(file_get_contents($imagePath)) . "' alt='Встроенное изображение'>
    <p>$message</p>
</body>
</html>
";

// Создаем экземпляр PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройки сервера отправки почты
/*    $mail->isSMTP();
    $mail->Host = 'smtp.mail.ru'; // Укажите свой SMTP-сервер
    $mail->SMTPAuth = true;
    $mail->Username = 'balabo.nastya@mail.ru';
    $mail->Password = 'WEeRGVwkpm2ynmnGp8th';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;*/

    $mail->isSMTP();
    $mail->Host = 'smtp.beget.com'; // Укажите свой SMTP-сервер
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@brand-business.ru';
    $mail->Password = 'Ganster12345!';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;


    // Отправитель и получатель
    $mail->setFrom('noreply@brand-business.ru', 'BRAND BUSINESS');
    $mail->addAddress($recipientEmail);
    $mail->CharSet = 'UTF-8';

    // Заголовок письма
    $mail->Subject = $subject;

    // Текст письма
    $mail->isHTML(true);
    $mail->Body = $htmlMessage;

    // Отправляем письмо
    $mail->send();

    $sql_paymented = "UPDATE clients SET paymented = 1 WHERE email = :email ORDER BY id DESC LIMIT 1";
    $params = [':email' => $recipientEmail];
    $db->query($sql_paymented, $params);


    header('Location: https://brand-business.ru/');
} catch (Exception $e) {
    echo 'Ошибка при отправке письма: ', $mail->ErrorInfo;
}


?>