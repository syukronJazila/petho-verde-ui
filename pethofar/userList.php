<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require 'db.php';

try {
    $sql = "SELECT * FROM users ORDER BY id ASC";
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
