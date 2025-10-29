<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(["error" => true, "message" => "ID tidak valid"]);
    exit;
}

$stmt = $mysqli->prepare("DELETE FROM kontak WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["error" => false, "message" => "Pesan berhasil dihapus"]);
} else {
    echo json_encode(["error" => true, "message" => "Gagal menghapus pesan"]);
}
?>
