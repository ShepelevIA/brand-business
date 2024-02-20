<?php
require __DIR__ . '/../../app/admin/header.php';

if (isset($_SESSION['access'])) {
    if (!$_SESSION['access']) {
        $url = '/app/admin/login.php';
        header('location: ' . $url);
    }
}
else {
    $url = '/app/admin/login.php';
    header('location: ' . $url);
}



try {
    // Добавление записи в БД
    $db = DB::getInstance();
    $sql = "SELECT * FROM clients WHERE deleted = 0";

    $clients = $db->query($sql);

}
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
require __DIR__ . '/../../app/admin/menu.php';
?>
<div class="w-50">
<table class="table">
    <thead>
    <tr>
        <th scope="col">№</th>
        <th scope="col">Имя</th>
        <th scope="col">Телефон</th>
        <th scope="col">E-mail</th>
        <th scope="col">Тариф</th>
        <th scope="col">Цена</th>
        <th scope="col">Оплачено</th>
        <th scope="col">Удалить</th>
    </tr>
    </thead>
    <tbody>
<?php
$i = 0;
foreach ($clients as $client) {
    ++$i;
?>
    <tr>
        <th scope="row"><?php echo $i; ?></th>
        <td><?php echo $client['name_client']; ?></td>
        <td><?php echo $client['number_phone']; ?></td>
        <td><?php echo $client['email']; ?></td>
        <td><?php echo $client['rate']; ?></td>
        <td><?php echo $client['price']; ?></td>
        <td>
            <?php
                if ($client['paymented'] === 0) {
                    echo 'Нет';
                } else {
                    echo 'Да';
                }
            ?>
        </td>
        <td>
            <a href="/../../app/admin/delete.php?id=<?php echo  $client['id']; ?>">Удалить</a>
        </td>
    </tr>
<?php  } ?>
    </tbody>
</table>
</div>
</body>
</html>