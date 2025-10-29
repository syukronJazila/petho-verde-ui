<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    echo json_encode(["error" => true, "message" => "ID tidak valid"]);
    exit;
}

try {
    $stmt = $mysqli->prepare("DELETE FROM budidaya WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["error" => false, "message" => "Budidaya berhasil dihapus"]);
    } else {
        echo json_encode(["error" => true, "message" => "Gagal menghapus budidaya"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
}
