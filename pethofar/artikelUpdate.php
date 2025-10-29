<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // CORS
require 'db.php'; // koneksi PDO ke database

$id = intval($_GET['id'] ?? 0);
$judul = trim($_POST['judul'] ?? '');
$author_id = trim($_POST['author_id'] ?? '');
$tanggal = trim($_POST['tanggal'] ?? '');
$waktu_baca = trim($_POST['waktu_baca'] ?? '');
$kategori = trim($_POST['kategori'] ?? '');
$konten = $_POST['konten'] ?? '';
$tags = $_POST['tags'] ?? '[]';

//  echo json_encode(["error" => true, "message" => $author_id]);
//         exit;

if ($id <= 0) {
    echo json_encode(['error' => true, 'message' => 'ID artikel tidak valid.']);
    exit;
}

// Validasi sederhana
if (!$judul || !$author_id || !$tanggal || !$waktu_baca || !$kategori || !$konten) {
    echo json_encode(['error' => true, 'message' => 'Semua field wajib diisi.']);
    exit;
}

// 🔹 Upload gambar (jika ada gambar baru)
$image_url = '';
if (!empty($_FILES['image']['name'])) {
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        $image_url = "http://" . $_SERVER['HTTP_HOST'] . "/pethofar/" . $targetFilePath;
    } else {
        echo json_encode(["error" => true, "message" => "Gagal upload gambar baru"]);
        exit;
    }
}

// 🔹 Update data
try {
    if ($image_url) {
        $stmt = $mysqli->prepare("UPDATE artikel 
            SET judul=?, author=?, tanggal=?, waktu_baca=?, kategori=?, konten=?, tags=?, image=? 
            WHERE id=?");
        $stmt->execute([$judul, $author_id, $tanggal, $waktu_baca, $kategori, $konten, $tags, $image_url, $id]);
    } else {
        $stmt = $mysqli->prepare("UPDATE artikel 
            SET judul=?, author=?, tanggal=?, waktu_baca=?, kategori=?, konten=?, tags=? 
            WHERE id=?");
        $stmt->execute([$judul, $author_id, $tanggal, $waktu_baca, $kategori, $konten, $tags, $id]);
    }

    echo json_encode(['error' => false, 'message' => 'Artikel berhasil diupdate']);
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>
