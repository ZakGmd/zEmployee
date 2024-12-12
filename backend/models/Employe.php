<?php

class Employee
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function create(string $name, string $position, float $salary): bool
    {
        $empl = $this->pdo->prepare("INSERT INTO employes (name, position, salary) VALUES (:name, :position, :salary)");
        $empl->bindParam(':name', $name);
        $empl->bindParam(':position', $position);
        $empl->bindParam(':salary', $salary);

        return $empl->execute();
    }

    public function find(int $id): ?array
    {
        $empl = $this->pdo->prepare("SELECT * FROM employes WHERE id = :id");
        $empl->bindParam(':id', $id);
        $empl->execute();

        return $empl->fetch(PDO::FETCH_ASSOC);
    }

    public function update(int $id, string $name, string $position, float $salary): bool
    {
        $empl = $this->pdo->prepare("UPDATE employes SET name = :name, position = :position, salary = :salary WHERE id = :id");
        $empl->bindParam(':name', $name);
        $empl->bindParam(':position', $position);
        $empl->bindParam(':salary', $salary);
        $empl->bindParam(':id', $id);

        return $empl->execute();
    }

    public function delete(int $id): bool
    {
        $empl = $this->pdo->prepare("DELETE FROM employes WHERE id = :id");
        $empl->bindParam(':id', $id);

        return $empl->execute();
    }

    public function getAll(): array
    {
        $empl = $this->pdo->query("SELECT * FROM employes"); 
        return $empl->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCompletedTasksCount(int $employeeId): int
    {
        $empl = $this->pdo->prepare("SELECT COUNT(*) as completed_tasks_count FROM tasks WHERE employe_id = :employeeId AND status = 'done'");
        $empl->bindParam(':employeeId', $employeeId);
        $empl->execute();

        $result = $empl->fetch(PDO::FETCH_ASSOC);
        return (int)$result['completed_tasks_count'];
    }
}

?>