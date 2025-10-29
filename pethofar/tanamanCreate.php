<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
require 'db.php';

try {
    // 🔹 Deteksi JSON body dan merge ke $_POST jika ada
    $rawInput = file_get_contents("php://input");
    if (!empty($rawInput)) {
        $jsonData = json_decode($rawInput, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($jsonData)) {
            $_POST = array_merge($_POST, $jsonData);
        }
    }

    // --- Ambil data dasar dari form / json ---
    $nama         = trim($_POST['nama'] ?? '');
    $nama_latin   = trim($_POST['nama_latin'] ?? '');
    $kategori_id  = intval($_POST['kategori_id'] ?? 0);
    $deskripsi    = trim($_POST['deskripsi'] ?? '');
    $manfaat_list = $_POST['manfaat'] ?? [];
    $referensi_in = $_POST['referensi'] ?? [];
    $fakta_in     = $_POST['_fakta_singkat'] ?? null;
    $image_url    = '';

    // Validasi minimal
    if ($nama === '' || $nama_latin === '' || $kategori_id <= 0) {
        http_response_code(400);
        echo json_encode(["error" => true, "message" => "nama, nama_latin, dan kategori wajib diisi"]);
        exit;
    }

    // --- Upload gambar (wajib) ---
    if (!empty($_FILES['image']['name'])) {
        $targetDir = "uploads/"; 
        if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

        $fileName = time() . "_" . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', basename($_FILES["image"]["name"]));
        $targetFilePath = $targetDir . $fileName;

        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            throw new Exception("Gagal mengupload gambar");
        }

        // URL public sesuai domain
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        $image_url = $protocol . $_SERVER['HTTP_HOST'] . '/pethofar/' . $targetFilePath; // 🟢 hasil sama dengan update.php
    } else {
        throw new Exception("Gambar wajib diupload");
    }

    // --- Normalisasi input manfaat ---
    if (is_string($manfaat_list)) {
        $decoded = json_decode($manfaat_list, true);
        $manfaat_list = is_array($decoded) ? $decoded : [$manfaat_list];
    }
    if (!is_array($manfaat_list)) $manfaat_list = [];

    // --- Normalisasi referensi ---
    if (is_string($referensi_in)) {
        $decoded = json_decode($referensi_in, true);
        $referensi_in = is_array($decoded) ? $decoded : [$referensi_in];
    }
    $referensi_json = json_encode(array_values($referensi_in), JSON_UNESCAPED_UNICODE);

    // --- Normalisasi fakta singkat ---
    $fakta = ['air' => null, 'cahaya' => null, 'iklim' => null, 'panen' => null];
    if (!empty($fakta_in)) {
        if (is_string($fakta_in)) {
            $decoded = json_decode($fakta_in, true);
            if (is_array($decoded)) $fakta_in = $decoded;
        }
        if (is_array($fakta_in)) {
            $fakta['air']    = $fakta_in['air'] ?? null;
            $fakta['cahaya'] = $fakta_in['cahaya'] ?? null;
            $fakta['iklim']  = $fakta_in['iklim'] ?? null;
            $fakta['panen']  = $fakta_in['panen'] ?? null;
        }
    }

    // --- Mulai transaksi ---
    $mysqli->begin_transaction();

    // --- Insert tanaman ---
    $stmt = $mysqli->prepare("
        INSERT INTO tanaman (nama_tanaman, nama_lain, link_gambar, kategori_id, deskripsi, referensi, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    ");
    if (!$stmt) throw new Exception("Prepare tanaman gagal: " . $mysqli->error);

    $stmt->bind_param("sssiss", $nama, $nama_latin, $image_url, $kategori_id, $deskripsi, $referensi_json);
    if (!$stmt->execute()) throw new Exception("Insert tanaman gagal: " . $stmt->error);

    $tanaman_id = $stmt->insert_id;
    $stmt->close();

    // --- Insert fakta_singkat ---
    $stmtF = $mysqli->prepare("
        INSERT INTO fakta_singkat (tanaman_id, air, cahaya, iklim, panen)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmtF->bind_param("issss", $tanaman_id, $fakta['air'], $fakta['cahaya'], $fakta['iklim'], $fakta['panen']);
    if (!$stmtF->execute()) throw new Exception("Insert fakta_singkat gagal: " . $stmtF->error);
    $stmtF->close();

    // --- Insert manfaat ---
    if (!empty($manfaat_list)) {
        $stmtM = $mysqli->prepare("INSERT INTO manfaat (tanaman_id, manfaat) VALUES (?, ?)");
        foreach ($manfaat_list as $m) {
            $m = trim($m);
            if ($m === '') continue;
            $stmtM->bind_param("is", $tanaman_id, $m);
            if (!$stmtM->execute()) throw new Exception("Insert manfaat gagal: " . $stmtM->error);
        }
        $stmtM->close();
    }

    $mysqli->commit();

    echo json_encode(["error" => false, "message" => "Tanaman berhasil ditambahkan", "id" => $tanaman_id]);

} catch (Exception $e) {
    if ($mysqli->errno) $mysqli->rollback();
    http_response_code(500);
    echo json_encode(["error" => true, "message" => $e->getMessage()]);
}
?>
