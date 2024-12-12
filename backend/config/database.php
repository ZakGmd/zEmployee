<?php

class Database
{
    private $host;
    private $dbName;
    private $user;
    private $password;

    public function __construct()
    {
       
        $this->host = 'localhost';
        $this->dbName = 'employemanagement';
        $this->user = 'root';
        $this->password = '';
    }

    public function getConnection()
    {
        try {
            $dsn = "mysql:host={$this->host};dbName={$this->dbName}";
            $pdo = new PDO($dsn, $this->user, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}

?>