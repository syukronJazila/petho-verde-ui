<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php'; 

// Ambil data dari body JSON
$input = json_decode(file_get_contents("php://input"), true);

$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');

// Validasi input
if (empty($email) || empty($password)) {
    echo json_encode([
        "error" => true,
        "message" => "Email dan password wajib diisi."
    ]);
    exit;
}

try {
    // Cek apakah user ada
    $sql = "SELECT id, nama, email, password, role FROM users WHERE email = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            "error" => true,
            "message" => "Email tidak ditemukan."
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    // Verifikasi password
    if (!password_verify($password, $user['password'])) {
        echo json_encode([
            "error" => true,
            "message" => "Password salah."
        ]);
        exit;
    }

    // Generate token sederhana (bisa diganti JWT)
    $token = bin2hex(random_bytes(32));

    echo json_encode([
        "error" => false,
        "message" => "Login berhasil.",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "nama" => $user['nama'],
            "email" => $user['email'],
            "role" => $user['role']
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => "Terjadi kesalahan server: " . $e->getMessage()
    ]);
}
?>
