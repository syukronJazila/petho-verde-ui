<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require 'db.php';

$sql = "SELECT * FROM kontak ORDER BY tanggal DESC";
$result = $mysqli->query($sql);

$kontak = [];
while ($row = $result->fetch_assoc()) {
    // Ubah "1"/"0" jadi boolean
    $row['is_read'] = $row['is_read'] == "1";
    $row['consent'] = $row['consent'] == "1";

    $kontak[] = $row;
}

echo json_encode([
    "error" => false,
    "data" => $kontak
]);
