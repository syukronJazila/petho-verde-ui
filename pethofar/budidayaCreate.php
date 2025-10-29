<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require 'db.php';

try {
    // Ambil data dari form
    $judul = $_POST['judul'] ?? '';
    $kategori_id = $_POST['kategori_id'] ?? ''; // 🔹 pakai id, bukan nama
    $nama_tanaman = $_POST['nama_tanaman'] ?? '';
    $type = $_POST['type'] ?? '';
    $waktu_tanam = $_POST['waktu_tanam'] ?? '';
    $kutipan = $_POST['kutipan'] ?? '';
    $cara_tanam = $_POST['cara_tanam'] ?? '';
    $perawatan = $_POST['perawatan'] ?? '';
    $pupuk = $_POST['pupuk'] ?? '';
    $penyiraman = $_POST['penyiraman'] ?? '';
    $hama = $_POST['hama'] ?? '';

    // Validasi minimal
    if (empty($judul) || empty($kategori_id) || empty($nama_tanaman)) {
        echo json_encode(["error" => true, "message" => "Judul, kategori, dan nama tanaman wajib diisi"]);
        exit;
    }

    // Handle upload gambar
    $image_url = '';
    if (!empty($_FILES['image']['name'])) {
        $targetDir = "uploads/";

        // Pastikan folder uploads ada
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Buat nama file unik
        $fileName = time() . "_" . basename($_FILES["image"]["name"]);
        $targetFilePath = $targetDir . $fileName;

        // Pindahkan file
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

    // 🔹 Query insert menyesuaikan kolom kategori_id
    $stmt = $mysqli->prepare("INSERT INTO budidaya 
        (judul, image, kategori, nama_tanaman, type, waktu_tanam, kutipan, cara_tanam, perawatan, pupuk, penyiraman, hama) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "ssisssssssss",
        $judul, $image_url, $kategori_id, $nama_tanaman, $type, $waktu_tanam, $kutipan, $cara_tanam, $perawatan, $pupuk, $penyiraman, $hama
    );

    if ($stmt->execute()) {
        echo json_encode(["error" => false, "message" => "Budidaya berhasil ditambahkan"]);
    } else {
        echo json_encode(["error" => true, "message" => "Gagal menambahkan budidaya"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
}
?>
