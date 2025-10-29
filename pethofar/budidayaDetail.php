<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Invalid cultivation ID']);
    exit;
}

$sql = "
    SELECT 
        b.id,
        b.judul,
        b.image,
        k.nama_kategori AS kategori,
        b.nama_tanaman,
        b.type,
        b.waktu_tanam,
        b.kutipan,
        b.cara_tanam,
        b.perawatan,
        b.pupuk,
        b.penyiraman,
        b.hama,
        b.created_at,
        k.id as kategori_id
    FROM budidaya b
    LEFT JOIN kategori_tanaman k ON b.kategori = k.id
    WHERE b.id = ?
";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} else {
    http_response_code(404);
    echo json_encode(['error' => true, 'message' => 'Cultivation not found']);
}

$stmt->close();
$mysqli->close();
?>
