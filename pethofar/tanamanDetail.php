<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => true, 'message' => 'Invalid plant ID']);
    exit;
}

try {
    // Ambil data utama tanaman + nama kategori
    $sql = "
        SELECT 
            t.id,
            t.nama_tanaman AS nama,
            t.nama_lain AS nama_latin,
            t.link_gambar AS image,
            k.nama_kategori AS kategori,
            t.deskripsi,
            t.referensi,
            t.created_at,
            k.id as kategori_id
        FROM tanaman t
        LEFT JOIN kategori_tanaman k ON t.kategori_id = k.id
        WHERE t.id = ?
    ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {

        // Ambil fakta singkat dari tabel fakta_singkat
        $sqlFakta = "
            SELECT air, cahaya, iklim, panen 
            FROM fakta_singkat 
            WHERE tanaman_id = ?
            LIMIT 1
        ";
        $stmtFakta = $mysqli->prepare($sqlFakta);
        $stmtFakta->bind_param("i", $id);
        $stmtFakta->execute();
        $resFakta = $stmtFakta->get_result();

        if ($f = $resFakta->fetch_assoc()) {
            $row['fakta_singkat'] = $f;
        } else {
            $row['fakta_singkat'] = (object)[];
        }

        // Ambil daftar manfaat dari tabel manfaat
        $sqlManfaat = "SELECT manfaat FROM manfaat WHERE tanaman_id = ?";
        $stmt2 = $mysqli->prepare($sqlManfaat);
        $stmt2->bind_param("i", $id);
        $stmt2->execute();
        $resManfaat = $stmt2->get_result();

        $manfaatList = [];
        while ($m = $resManfaat->fetch_assoc()) {
            $manfaatList[] = $m['manfaat'];
        }
        $row['manfaat'] = $manfaatList;

        // Decode kolom referensi (format JSON di database)
        $row['referensi'] = json_decode($row['referensi'], true) ?: [];

        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => true, 'message' => 'Plant not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
