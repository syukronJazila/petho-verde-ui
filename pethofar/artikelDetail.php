<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Invalid article ID']);
    exit;
}

$sql = "
    SELECT 
        a.id,
        a.judul,
        a.image,
        u.nama AS author,
        a.tanggal,
        a.waktu_baca,
        a.kategori,
        a.tags,
        a.konten
    FROM artikel a
    LEFT JOIN users u ON a.author = u.id
    WHERE a.id = ?
";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Decode tags JSON jika ada
    $row['tags'] = json_decode($row['tags'], true);
    
    echo json_encode($row, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(['error' => true, 'message' => 'Article not found']);
}

$stmt->close();
$mysqli->close();
?>
