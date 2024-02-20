<?php
          // регистрационная информация (Идентификатор магазина, пароль №1)
          // registration info (Merchant ID, password #1)
          $merchant_login = "brandbusinessru";
          $password_1 = "yDIN7pa8jb0M4pP5Tdhi";
          // номер заказа
          // number of order
          $invid = 12345;
          // описание заказа
          // order description
          $description = "Техническая документация по ROBOKASSA";
          // сумма заказа
          // sum of order
          $out_sum = "8.96";
          // пользовательский параметр
          // сustom parameter
          $out_sum = "8.96";
          // Товарная номенклатура (Receipt) в url encode
          // Product Nomenclature (Receipt) in url encode
          // Before url encode - {"items":[{"name":"product","quantity":1,"sum":1,"tax":"none"}]}
          $receipt = "%7B%22items%22%3A%5B%7B%22name%22%3A%22product%22%2C%22quantity%22%3A1%2C%22sum%22%3A1%2C%22tax%22%3A%22none%22%7D%5D%7D";
          // предлагаемая валюта платежа
          // default payment e-currency
          $incurrlabel = "BANKOCEAN2R";
          // язык
          // language
          $culture = "ru";
          // кодировка
          // encoding
          $encoding = "utf-8";
          // Адрес электронной почты покупателя
          // E-mail
          $Email = "test@test.ru";
          // Срок действия счёта
          // Expiration Date
          $ExpirationDate = "2029-01-16T12:00";
          // Дополнительные пользовательские параметры
          // Shp_item
          $shp_item = "Shp_oplata=1";
          // формирование подписи
          // generate signature
          $signature_value =md5("$merchant_login:$out_sum:$invid:$receipt:$password_1:Shp_item=$shp_item");
          // форма оплаты товара
          // payment form
          print
              "<html>".
              "<form action='https://auth.robokassa.ru/Merchant/Index.aspx' method=POST>".
              "<input type=hidden name=MerchantLogin value=$merchant_login>".
              "<input type=hidden name=OutSum value=$out_sum>".
              "<input type=hidden name=InvId value=$invid>".
              "<input type=hidden name=Description value='$description'>".
              "<input type=hidden name=SignatureValue value=$signature_value>".
              "<input type=hidden name=Shp_item value='$shp_item'>".
              "<input type=hidden name=IncCurrLabel value=$incurrlabel>".
              "<input type=hidden name=Culture value=$culture>".
              "<input type=hidden name=Email value=$Email>".
              "<input type=hidden name=ExpirationDate value=$ExpirationDate>".
              "<input type=hidden name=Receipt value=$receipt>".
              "<input type=submit value='Оплатить'>".
              "</form></html>";
        ?>