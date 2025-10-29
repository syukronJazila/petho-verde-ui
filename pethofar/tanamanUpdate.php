<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => true, "message" => "ID tanaman tidak valid"]);
    exit;
}

// 🔹 Deteksi JSON body
$rawInput = file_get_contents("php://input");
if (!empty($rawInput)) {
    $jsonData = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($jsonData)) {
        $_POST = array_merge($_POST, $jsonData);
    }
}

try {
    // === Ambil Data Utama ===
    $nama_tanaman = trim($_POST['nama'] ?? '');
    $nama_lain    = trim($_POST['nama_latin'] ?? '');
    $kategori_id  = isset($_POST['kategori_id']) ? (int)$_POST['kategori_id'] : null;
    $deskripsi    = trim($_POST['deskripsi'] ?? '');

    // --- Fakta Singkat ---
    $fakta_singkat = json_decode($_POST['_fakta_singkat'] ?? '{}', true);
    if (!is_array($fakta_singkat)) $fakta_singkat = [];
    $air    = $fakta_singkat['air'] ?? '';
    $cahaya = $fakta_singkat['cahaya'] ?? '';
    $iklim  = $fakta_singkat['iklim'] ?? '';
    $panen  = $fakta_singkat['panen'] ?? '';

    // echo json_encode(["error" => true, "message" => $fakta_singkat]);
    // exit;

    // --- Manfaat ---
    $manfaat_array = $_POST['manfaat'] ?? [];
    if (is_string($manfaat_array)) {
        $decoded = json_decode($manfaat_array, true);
        $manfaat_array = is_array($decoded) ? $decoded : [$manfaat_array];
    }
    if (!is_array($manfaat_array)) $manfaat_array = [];

    // --- Referensi ---
    $referensi_array = $_POST['referensi'] ?? [];
    if (is_string($referensi_array)) {
        $decoded = json_decode($referensi_array, true);
        $referensi_array = is_array($decoded) ? $decoded : [$referensi_array];
    }
    $referensi_json = json_encode(array_values($referensi_array), JSON_UNESCAPED_UNICODE);

    // --- Gambar (opsional) ---
    $link_gambar = $_POST['image'] ?? '';
    if (!empty($_FILES['image']['name'])) {
        $targetDir = "pethofar/uploads/";
        if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);
        $fileName = time() . "_" . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', basename($_FILES["image"]["name"]));
        $targetFilePath = $targetDir . $fileName;
        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            throw new Exception("Gagal mengunggah gambar baru");
        }
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        $link_gambar = $protocol . $_SERVER['HTTP_HOST'] . '/pethofar/' . $targetFilePath;
    }

    // === Validasi Minimal ===
    if (empty($nama_tanaman)) throw new Exception("Nama tanaman tidak boleh kosong");

    // === Mulai Transaksi ===
    $mysqli->begin_transaction();

    // --- Update Tabel Tanaman ---
    $stmt = $mysqli->prepare("
        UPDATE tanaman
        SET nama_tanaman = ?, nama_lain = ?, kategori_id = ?, deskripsi = ?, link_gambar = ?, referensi = ?
        WHERE id = ?
    ");
    if (!$stmt) throw new Exception("Prepare gagal: " . $mysqli->error);

    $stmt->bind_param("ssisssi",
        $nama_tanaman,
        $nama_lain,
        $kategori_id,
        $deskripsi,
        $link_gambar,
        $referensi_json,
        $id
    );

    if (!$stmt->execute()) throw new Exception("Gagal memperbarui tanaman: " . $stmt->error);
    $stmt->close();

    // --- Fakta Singkat ---
    $cek = $mysqli->prepare("SELECT id FROM fakta_singkat WHERE tanaman_id = ?");
    $cek->bind_param("i", $id);
    $cek->execute();
    $hasFakta = $cek->get_result()->num_rows > 0;
    $cek->close();

    if ($hasFakta) {
        $stmtF = $mysqli->prepare("UPDATE fakta_singkat SET air=?, cahaya=?, iklim=?, panen=? WHERE tanaman_id=?");
        $stmtF->bind_param("ssssi", $air, $cahaya, $iklim, $panen, $id);
    } else {
        $stmtF = $mysqli->prepare("INSERT INTO fakta_singkat (tanaman_id, air, cahaya, iklim, panen) VALUES (?, ?, ?, ?, ?)");
        $stmtF->bind_param("issss", $id, $air, $cahaya, $iklim, $panen);
    }
    if (!$stmtF->execute()) throw new Exception("Gagal menyimpan fakta singkat: " . $stmtF->error);
    $stmtF->close();

    // --- Manfaat ---
    $del = $mysqli->prepare("DELETE FROM manfaat WHERE tanaman_id = ?");
    $del->bind_param("i", $id);
    if (!$del->execute()) throw new Exception("Gagal menghapus manfaat lama");
    $del->close();

    if (!empty($manfaat_array)) {
        $stmtM = $mysqli->prepare("INSERT INTO manfaat (tanaman_id, manfaat) VALUES (?, ?)");
        foreach ($manfaat_array as $m) {
            $m = trim($m);
            if ($m === '') continue;
            $stmtM->bind_param("is", $id, $m);
            if (!$stmtM->execute()) throw new Exception("Gagal menambah manfaat: " . $stmtM->error);
        }
        $stmtM->close();
    }

    $mysqli->commit();
    echo json_encode(["error" => false, "message" => "Data tanaman berhasil diperbarui"]);

} catch (Exception $e) {
    $mysqli->rollback();
    http_response_code(500);
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
}
?>
