<?php

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "employemanagement";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = file_get_contents(__DIR__ . '/schema.sql'); 

    if ($sql === false) {
        throw new Exception("Failed to read schema.sql file.");
    }

    $pdo->exec($sql);

    echo "Tables created successfully";

} catch(PDOException $e) {
    echo "Error creating tables: " . $e->getMessage();
} 

$pdo = null; 

?>