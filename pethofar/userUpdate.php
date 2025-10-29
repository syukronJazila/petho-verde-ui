<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    echo json_encode(["error" => true, "message" => "ID tidak valid"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$nama = trim($data['nama'] ?? '');
$email = trim($data['email'] ?? '');
$role = trim($data['role'] ?? '');
$password = $data['password'] ?? '';

if ($password) {
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $mysqli->prepare("UPDATE users SET nama = ?, email = ?, role = ?, password = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $nama, $email, $role, $hashed, $id);
} else {
    $stmt = $mysqli->prepare("UPDATE users SET nama = ?, email = ?, role = ? WHERE id = ?");
    $stmt->bind_param("sssi", $nama, $email, $role, $id);
}

if ($stmt->execute()) {
    echo json_encode(["error" => false, "message" => "User berhasil diupdate"]);
} else {
    echo json_encode(["error" => true, "message" => $stmt->error]);
}
?>
