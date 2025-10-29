<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => true, "message" => "ID budidaya tidak valid"]);
    exit;
}

try {
    // Ambil data lama untuk mempertahankan gambar jika tidak diganti
    $stmtOld = $mysqli->prepare("SELECT image FROM budidaya WHERE id = ?");
    $stmtOld->bind_param("i", $id);
    $stmtOld->execute();
    $old = $stmtOld->get_result()->fetch_assoc();
    $stmtOld->close();

    $image_url = $old['image'] ?? '';

    // === Ambil data dari form ===
    $judul         = trim($_POST['judul'] ?? '');
    $kategori      = trim($_POST['kategori_id'] ?? '');
    $nama_tanaman  = trim($_POST['nama_tanaman'] ?? '');
    $type          = trim($_POST['type'] ?? '');
    $waktu_tanam   = trim($_POST['waktu_tanam'] ?? '');
    $kutipan       = trim($_POST['kutipan'] ?? '');
    $cara_tanam    = trim($_POST['cara_tanam'] ?? '');
    $perawatan     = trim($_POST['perawatan'] ?? '');
    $pupuk         = trim($_POST['pupuk'] ?? '');
    $penyiraman    = trim($_POST['penyiraman'] ?? '');
    $hama          = trim($_POST['hama'] ?? '');

    // === Upload gambar baru jika ada ===
    if (!empty($_FILES['image']['name'])) {
        $targetDir = "uploads/";
        if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

        $fileName = time() . "_" . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', basename($_FILES["image"]["name"]));
        $targetFilePath = $targetDir . $fileName;

        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            throw new Exception("Gagal mengunggah gambar baru");
        }

        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        $image_url = $protocol . $_SERVER['HTTP_HOST'] . '/pethofar/' . $targetFilePath;
    }

    // === Validasi minimal ===
    if (empty($judul) || empty($kategori) || empty($nama_tanaman)) {
        throw new Exception("Judul, kategori, dan nama tanaman wajib diisi");
    }

    // === Update data ===
    $stmt = $mysqli->prepare("
        UPDATE budidaya
        SET judul = ?, image = ?, kategori = ?, nama_tanaman = ?, type = ?, waktu_tanam = ?, 
            kutipan = ?, cara_tanam = ?, perawatan = ?, pupuk = ?, penyiraman = ?, hama = ?
        WHERE id = ?
    ");

    if (!$stmt) throw new Exception("Prepare gagal: " . $mysqli->error);

    $stmt->bind_param(
        "ssssssssssssi",
        $judul, $image_url, $kategori, $nama_tanaman, $type, $waktu_tanam,
        $kutipan, $cara_tanam, $perawatan, $pupuk, $penyiraman, $hama, $id
    );

    if (!$stmt->execute()) {
        throw new Exception("Gagal memperbarui data budidaya: " . $stmt->error);
    }

    echo json_encode(["error" => false, "message" => "Budidaya berhasil diperbarui"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
}
?>
