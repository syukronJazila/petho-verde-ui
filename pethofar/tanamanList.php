<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require 'db.php';

try {
    $sql = "
        SELECT 
            t.id,
            t.nama_tanaman AS nama,
            t.nama_lain AS nama_latin,
            t.link_gambar AS image,
            k.nama_kategori AS kategori,
            t.created_at,
            (
                SELECT m.manfaat 
                FROM manfaat m 
                WHERE m.tanaman_id = t.id 
                LIMIT 1
            ) AS manfaat
        FROM tanaman t
        LEFT JOIN kategori_tanaman k ON t.kategori_id = k.id
        ORDER BY t.created_at DESC
    ";

    $stmt = $mysqli->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    $plants = [];
    while ($row = $result->fetch_assoc()) {
        $plants[] = $row;
    }

    echo json_encode([
        "error" => false,
        "data" => $plants
    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => "Gagal mengambil data tanaman: " . $e->getMessage()
    ]);
}
?>
