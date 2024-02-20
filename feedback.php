<?php
require 'app/DB.php';



// your registration data
$mrh_login = "brandbusinessru";
$mrh_pass1 = "yDIN7pa8jb0M4pP5Tdhi";

// order number. "" for random value
$inv_id = "";

// urlencoded receipt
$receipt = "%7B%22items%22:%5B%7B%22name%22:%22name%22,%22quantity%22:1,".
    "%22sum%22:11,%22tax%22:%22none%22%7D%5D%7D";

// double urlencode for headers
$receipt_urlencode = urlencode($receipt);

// description of the order, if you need
$inv_desc = "Оплата курса BRAND BUSINESS по базовому тарифу";

// build own CRC


// payment form

$nameClient = $_POST['name'];
$numberPhone = $_POST['phone'];
$rate = $_POST['rate'];
$price = $_POST['price'];
$email = $_POST['email'];

$out_sum = str_replace(" ", '', trim($price, '₽'));

$crc = md5("$mrh_login:$out_sum:$inv_id:$receipt:$mrh_pass1");

$url = "https://auth.robokassa.ru/Merchant/Index.aspx?MrchLogin=$mrh_login&".
    "OutSum=$out_sum&InvId=$inv_id&Receipt=$receipt_urlencode&Desc=$inv_desc&".
    "Email=$email&".
    "SignatureValue=$crc";

try {
    // Добавление записи в БД
   /* $db = DB::getInstance();
    $sql = "INSERT INTO clients (name_client, number_phone, email, rate, price) VALUES (:nameClient, :numberPhone, :email, :rate, :price)";
    $params = [':nameClient' => $nameClient, ':numberPhone' => $numberPhone, ':email' => $email, ':rate' => $rate, ':price' => $price];
    $result = $db->query($sql, $params);

    // Отправка сообщения в ТГ
    $txt = null;
    $token = "6347040373:AAGOk6Oiq96FL-h8D8BpNfxxYSTR5fSQwG4";
    $chat_id = "-4005494812";
    $message = array(
        'Имя клиента: ' => $nameClient,
        'Телефон: ' => $numberPhone,
        'E-mail: ' => $email,
        'Тариф: ' => $rate,
        'Цена: ' => $price,
    );
    foreach ($message as $key => $value) {
        $txt .= "<b>" . $key . "</b> " . $value . "%0A";
    };
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");*/

   $answer = [
        'redirectUrl' => $url,
   ];

   // header('Content-Type: application/json');
    echo json_encode($url);
}
catch (PDOException $e) {
   // echo "Database error: " . $e->getMessage();
}