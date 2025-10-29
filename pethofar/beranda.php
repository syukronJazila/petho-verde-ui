<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db.php';

try {
    // Ambil 4 tanaman terbaru
    $stmtPlants = $mysqli->prepare("
        SELECT 
            t.id,
            t.nama_tanaman AS nama,
            t.nama_lain AS nama_latin,
            t.link_gambar AS image,
            t.created_at
        FROM tanaman t
        ORDER BY t.created_at DESC
        LIMIT 4
    ");
    $stmtPlants->execute();
    $resultPlants = $stmtPlants->get_result();
    $plants = $resultPlants->fetch_all(MYSQLI_ASSOC);

    // Ambil manfaat pertama untuk tiap tanaman
    foreach ($plants as $key => $plant) {
        $stmtManfaat = $mysqli->prepare("
            SELECT manfaat 
            FROM manfaat 
            WHERE tanaman_id = ? 
            LIMIT 1
        ");
        $stmtManfaat->bind_param("i", $plant['id']);
        $stmtManfaat->execute();
        $resultManfaat = $stmtManfaat->get_result();
        $manfaat = $resultManfaat->fetch_assoc();
        
        $plants[$key]['manfaat'] = $manfaat['manfaat'] ?? null;
    }

    // Ambil 3 artikel terbaru
    $stmtArticles = $mysqli->prepare("
        SELECT id, judul, image, tanggal 
        FROM artikel 
        ORDER BY tanggal DESC 
        LIMIT 3
    ");
    $stmtArticles->execute();
    $resultArticles = $stmtArticles->get_result();
    $articles = $resultArticles->fetch_all(MYSQLI_ASSOC);

    // Kembalikan data dalam format JSON
    echo json_encode([
        "popularPlants" => $plants,
        "recentArticles" => $articles
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Database error: " . $e->getMessage()
    ]);
    exit;
}
?>
