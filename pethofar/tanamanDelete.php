<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require 'db.php';

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if (!$id) {
    echo json_encode(["error" => true, "message" => "ID tanaman tidak diberikan"]);
    exit;
}

try {
    // Mulai transaksi biar aman
    $mysqli->begin_transaction();

    // Hapus data terkait dulu di tabel anak
    $stmt1 = $mysqli->prepare("DELETE FROM fakta_singkat WHERE tanaman_id = ?");
    $stmt1->bind_param("i", $id);
    $stmt1->execute();
    $stmt1->close();

    $stmt2 = $mysqli->prepare("DELETE FROM manfaat WHERE tanaman_id = ?");
    $stmt2->bind_param("i", $id);
    $stmt2->execute();
    $stmt2->close();

    // Hapus data utama di tabel tanaman
    $stmt3 = $mysqli->prepare("DELETE FROM tanaman WHERE id = ?");
    $stmt3->bind_param("i", $id);
    $stmt3->execute();

    if ($stmt3->affected_rows > 0) {
        $mysqli->commit();
        echo json_encode(["error" => false, "message" => "Tanaman dan data terkait berhasil dihapus"]);
    } else {
        $mysqli->rollback();
        echo json_encode(["error" => true, "message" => "Tanaman tidak ditemukan"]);
    }

    $stmt3->close();

} catch (Exception $e) {
    $mysqli->rollback();
    echo json_encode(["error" => true, "message" => "Gagal menghapus tanaman: " . $e->getMessage()]);
}
?>
