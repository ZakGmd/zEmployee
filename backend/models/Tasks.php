<?php 
  class Tasks{
    private $pdo ;
    public function __construct(PDO $pdo){
        $this->pdo = $pdo ;
    }
    public function create(int $employeeId, string $title, string $description, string $status, ?string $deadline = null): bool
    {
        $task = $this->pdo->prepare("INSERT INTO tasks (employe_id, title, description, status) VALUES (:employeeId, :title, :description, :status )");
        $task->bindParam(':employeeId', $employeeId);
        $task->bindParam(':title', $title);
        $task->bindParam(':description', $description);
        $task->bindParam(':status', $status);
        return $task->execute();
    }
    public function find(int $taskId): ?array{
        $task = $this->pdo->prepare("SELECT * FROM tasks WHERE id = :taskId");
        $task->bindParam(':taskId', $taskId);
        $task->execute();
        return $task->fetch(PDO::FETCH_ASSOC);
    }
    public function update(int $taskId, string $title, string $description, string $status): bool{
        $task = $this->pdo->prepare("UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :taskId");
        $task->bindParam(':title', $title);
        $task->bindParam(':description', $description);
        $task->bindParam(':status', $status);
        $task->bindParam(':taskId', $taskId);
        return $task->execute();
    }
    public function delete(int $taskId): bool{
        $task = $this->pdo->prepare("DELETE  FROM tasks WHERE id = :taskId");
        $task->bindParam(':taskId', $taskId);
        return $task->execute();
    }
    public function getAll(): array{
        $task = $this->pdo->query("SELECT * FROM tasks"); 
        return $task->fetchAll(PDO::FETCH_ASSOC);
    }
    public function findByEmployeeId(int $employeeId): array{
        $task = $this->pdo->prepare("SELECT * FROM tasks WHERE employe_id = :employeeId");
        $task->bindParam(':employeeId', $employeeId);
        $task->execute();
        return $task->fetchAll(PDO::FETCH_ASSOC);
    }
    public function countTotalTasks(int $employeeId): int
    {
        try {
            $stmt = $this->pdo->prepare("SELECT COUNT(*) as total_tasks FROM tasks WHERE employe_id = :employeeId");
            $stmt->bindParam(':employeeId', $employeeId);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return (int)$result['total_tasks'];
        } catch (PDOException $e) {
            return 0; 
        }
    }

    public function countCompletedTasks(int $employeeId): int
    {
        try {
            $stmt = $this->pdo->prepare("SELECT COUNT(*) as completed_tasks FROM tasks WHERE employe_id = :employeeId AND status = 'done'");
            $stmt->bindParam(':employeeId', $employeeId);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return (int)$result['completed_tasks'];
        } catch (PDOException $e) {
            return 0; 
        }
    }

  }


?>