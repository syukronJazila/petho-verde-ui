<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Koneksi database
require 'db.php';

// Ambil total tanaman
$totalPlants = $mysqli->query("SELECT COUNT(*) as count FROM tanaman")->fetch_assoc()['count'];

// Ambil total budidaya
$totalBudidaya = $mysqli->query("SELECT COUNT(*) as count FROM budidaya")->fetch_assoc()['count'];

// Ambil total artikel
$totalArticles = $mysqli->query("SELECT COUNT(*) as count FROM artikel")->fetch_assoc()['count'];

// Ambil pesan belum dibaca
$unreadMessages = $mysqli->query("SELECT COUNT(*) as count FROM kontak WHERE is_read = 0")->fetch_assoc()['count'];

// 🔹 Output JSON
echo json_encode([
    "error" => false,
    "data" => [
        "totalPlants" => (int) $totalPlants,
        "totalBudidaya" => (int) $totalBudidaya,
        "totalArticles" => (int) $totalArticles,
        "unreadMessages" => (int) $unreadMessages
    ]
]);
?>
