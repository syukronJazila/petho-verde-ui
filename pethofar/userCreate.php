<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$nama = trim($data['nama'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role = trim($data['role'] ?? '');

if (!$nama || !$email || !$password || !$role) {
    echo json_encode(["error" => true, "message" => "Data tidak lengkap"]);
    exit;
}

// Hash password
$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $mysqli->prepare("INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nama, $email, $hashed, $role);

if ($stmt->execute()) {
    echo json_encode(["error" => false, "message" => "User berhasil dibuat"]);
} else {
    echo json_encode(["error" => true, "message" => $stmt->error]);
}
?>
