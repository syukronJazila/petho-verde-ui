<?php
$host = 'localhost';
$user = 'root';
$pass = ''; 
$db   = 'pethofar';

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['error' => true, 'message' => 'Failed to connect to database']);
    exit;
}

$mysqli->set_charset("utf8");
