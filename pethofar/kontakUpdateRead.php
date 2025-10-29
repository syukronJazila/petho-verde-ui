<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$is_read = $data['is_read'] ?? null;

if ($id === null || $is_read === null) {
    echo json_encode(["error" => true, "message" => "ID atau status tidak valid"]);
    exit;
}

$stmt = $mysqli->prepare("UPDATE kontak SET is_read = ? WHERE id = ?");
$stmt->bind_param("ii", $is_read, $id);

if ($stmt->execute()) {
    echo json_encode(["error" => false, "message" => "Status berhasil diperbarui"]);
} else {
    echo json_encode(["error" => true, "message" => "Gagal memperbarui status"]);
}
?>
