<?php
require 'app/DB.php';

$OutSum = $_GET['OutSum'];
$InvId = $_GET['InvId'];
$Fee = $_GET['Fee'];
$EMail = $_GET['EMail'];
$SignatureValue = $_GET['SignatureValue'];
$PaymentMethod = $_GET['PaymentMethod'];
$IncCurrLabel = $_GET['IncCurrLabel'];
$Shp_ = $_GET['Shp_'];



$db = DB::getInstance();
$sql = "INSERT INTO payment (OutSum, InvId, Fee, email, SignatureValue, PaymentMethod, IncCurrLabel, Shp_) VALUES (:OutSum, :InvId, :Fee, :EMail, :SignatureValue, :PaymentMethod, :IncCurrLabel, :Shp_)";
$params = [':OutSum' => $OutSum, ':InvId' => $InvId, ':Fee' => $Fee, ':EMail' => $EMail, ':SignatureValue' => $SignatureValue, 'PaymentMethod' => $PaymentMethod, 'IncCurrLabel' => $IncCurrLabel, 'Shp_' => $Shp_];
$result = $db->query($sql, $params);