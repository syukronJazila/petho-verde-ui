<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require 'db.php';

$sql = "
    SELECT 
        a.id, 
        a.judul, 
        a.image, 
        u.nama AS author, 
        a.tanggal, 
        a.waktu_baca, 
        a.kategori
    FROM artikel a
    LEFT JOIN users u ON a.author = u.id
    ORDER BY a.tanggal DESC
";

$stmt = $mysqli->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$articles = [];
while ($row = $result->fetch_assoc()) {
    $articles[] = $row;
}

echo json_encode($articles, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$stmt->close();
$mysqli->close();
?>
