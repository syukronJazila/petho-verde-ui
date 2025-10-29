<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
require 'db.php'; // koneksi PDO ke database
ini_set('display_errors', 1);
error_reporting(E_ALL);

$judul = trim($_POST['judul'] ?? '');
$author_id = trim($_POST['author_id'] ?? ''); // id user sekarang
$tanggal = trim($_POST['tanggal'] ?? '');
$waktu_baca = trim($_POST['waktu_baca'] ?? '');
$kategori = trim($_POST['kategori'] ?? '');
$konten = $_POST['konten'] ?? '';
$tags = $_POST['tags'] ?? '[]';

// Validasi sederhana
if (!$judul || !$author_id || !$tanggal || !$waktu_baca || !$kategori || !$konten) {
    echo json_encode(['error' => true, 'message' => 'Semua field wajib diisi']);
    exit;
}

// 🔹 Upload gambar thumbnail
$image_url = '';
if (!empty($_FILES['image']['name'])) {
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        $image_url = "http://" . $_SERVER['HTTP_HOST'] . "/pethofar/" . $targetFilePath;
    } else {
        echo json_encode(["error" => true, "message" => "Gagal upload gambar"]);
        exit;
    }
} else {
    echo json_encode(["error" => true, "message" => "Gambar wajib diupload"]);
    exit;
}

// 🔹 Insert ke database
try {
    $stmt = $mysqli->prepare("INSERT INTO artikel (judul, author, tanggal, waktu_baca, kategori, konten, tags, image) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$judul, $author_id, $tanggal, $waktu_baca, $kategori, $konten, $tags, $image_url]);

    echo json_encode(['error' => false, 'message' => 'Artikel berhasil ditambahkan']);
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>
