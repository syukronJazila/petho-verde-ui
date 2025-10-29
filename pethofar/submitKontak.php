<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require 'db.php';

// Ambil data POST
$nama    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subjek  = trim($_POST['subject'] ?? '');
$pesan   = trim($_POST['message'] ?? '');
$consent = isset($_POST['consent']) ? 1 : 0;

// Validasi sederhana
if (!$nama || !$email || !$subjek || !$pesan || !$consent) {
    echo json_encode(['error' => true, 'message' => 'Semua field wajib diisi dan persetujuan harus dicentang.']);
    exit;
}

// Prepared statement untuk mencegah SQL injection
$stmt = $mysqli->prepare("INSERT INTO kontak (nama_lengkap, email, subjek, pesan, consent) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssi", $nama, $email, $subjek, $pesan, $consent);

if ($stmt->execute()) {
    echo json_encode(['error' => false, 'message' => 'Pesan berhasil dikirim!']);
} else {
    echo json_encode(['error' => true, 'message' => 'Gagal menyimpan pesan: '.$stmt->error]);
}

$stmt->close();
$mysqli->close();
?>

