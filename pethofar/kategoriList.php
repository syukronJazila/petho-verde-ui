<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require_once "db.php"; // pastikan koneksi ke DB

$response = [
    "error" => false,
    "kategori" => [],
];

// Ambil semua kategori dari tabel
$query = "SELECT id, nama_kategori, deskripsi FROM kategori_tanaman ORDER BY nama_kategori ASC";
$result = $mysqli->query($query);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response["kategori"][] = [
            "id" => $row["id"],
            "nama" => $row["nama_kategori"],
            "deskripsi" => $row["deskripsi"]
        ];
    }
} else {
    $response["error"] = true;
    $response["message"] = "Tidak ada kategori ditemukan";
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$mysqli->close();
