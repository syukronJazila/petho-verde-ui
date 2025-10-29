<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require 'db.php';

$sql = "
    SELECT 
        b.id, 
        b.judul, 
        b.image, 
        k.nama_kategori AS kategori,
        b.waktu_tanam, 
        b.kutipan, 
        b.nama_tanaman
    FROM budidaya b
    LEFT JOIN kategori_tanaman k ON b.kategori = k.id
";

$stmt = $mysqli->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$list = [];
while ($row = $result->fetch_assoc()) {
    $list[] = $row;
}

echo json_encode($list);
?>
