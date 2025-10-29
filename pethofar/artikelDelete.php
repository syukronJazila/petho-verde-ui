<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *"); // CORS
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);

if (!$id) {
    echo json_encode(['error' => true, 'message' => 'ID artikel tidak valid.']);
    exit;
}

try {
    $stmt = $mysqli->prepare("DELETE FROM artikel WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['error' => false, 'message' => 'Artikel berhasil dihapus.']);
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>
