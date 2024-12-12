<?php

class Evaluation{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function create(int $employeeId, string $date, float $note): bool
    {
        $evl = $this->pdo->prepare("INSERT INTO evaluations (employe_id, date, note) VALUES (:employeeId, :date, :note)");
        $evl->bindParam(':employeeId', $employeeId);
        $evl->bindParam(':date', $date);
        $evl->bindParam(':note', $note);

        return $evl->execute();
    }

    public function get(int $evaluationId): ?array
    {
        $evl = $this->pdo->prepare("SELECT * FROM evaluations WHERE id = :evaluationId");
        $evl->bindParam(':evaluationId', $evaluationId);
        $evl->execute();

        return $evl->fetch(PDO::FETCH_ASSOC);
    }
    public function getAll(): array{
        try {
            $stmt = $this->pdo->query("SELECT * FROM evaluations");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return []; 
        }
    }

    public function getByEmployeeId(int $employeeId): array
    {
        $evl = $this->pdo->prepare("SELECT * FROM evaluations WHERE employe_id = :employeeId");
        $evl->bindParam(':employeeId', $employeeId);
        $evl->execute();

        return $evl->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update(int $evaluationId, string $date, float $note): bool
    {
        $evl = $this->pdo->prepare("UPDATE evaluations SET date = :date, note = :note WHERE id = :evaluationId");
        $evl->bindParam(':date', $date);
        $evl->bindParam(':note', $note);
        $evl->bindParam(':evaluationId', $evaluationId);

        return $evl->execute();
    }

    public function delete(int $evaluationId): bool
    {
        $evl = $this->pdo->prepare("DELETE FROM evaluations WHERE id = :evaluationId");
        $evl->bindParam(':evaluationId', $evaluationId);

        return $evl->execute();
    }
}

?>