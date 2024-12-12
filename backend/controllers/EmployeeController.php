<?php

require_once 'Database.php'; 

class EmployeeController
{
    private $pdo;

    public function __construct()
    {
        $db = new Database();
        $this->pdo = $db->getConnection();
    }

    public function getAll()
    {
        $sql = "SELECT * FROM employes";
        $empl = $this->pdo->query($sql);
        $employees = $empl->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($employees);
    }

    public function get($id)
    {
        $empl = $this->pdo->prepare("SELECT * FROM employes WHERE id = :id");
        $empl->bindParam(':id', $id);
        $empl->execute();
        $employee = $empl->fetch(PDO::FETCH_ASSOC);

        if ($employee) {
            header('Content-Type: application/json');
            echo json_encode($employee);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Employee not found']);
        }
    }

    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['name']) || !isset($data['position']) || !isset($data['salary'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Missing required fields']);
            return;
        }

        $name = $data['name'];
        $position = $data['position'];
        $salary = (float)$data['salary'];

        $empl = $this->pdo->prepare("INSERT INTO employes (name, position, salary) VALUES (:name, :position, :salary)");
        $empl->bindParam(':name', $name);
        $empl->bindParam(':position', $position);
        $empl->bindParam(':salary', $salary);

        if ($empl->execute()) {
            http_response_code(201);
            echo json_encode(['message' => 'Employee created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to create employee']);
        }
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['name']) || !isset($data['position']) || !isset($data['salary'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Missing required fields']);
            return;
        }

        $name = $data['name'];
        $position = $data['position'];
        $salary = (float)$data['salary'];

        $empl = $this->pdo->prepare("UPDATE employes SET name = :name, position = :position, salary = :salary WHERE id = :id");
        $empl->bindParam(':name', $name);
        $empl->bindParam(':position', $position);
        $empl->bindParam(':salary', $salary);
        $empl->bindParam(':id', $id);

        if ($empl->execute()) {
            http_response_code(200);
            echo json_encode(['message' => 'Employee updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to update employee']);
        }
    }

    public function delete($id)
    {
        $empl = $this->pdo->prepare("DELETE FROM employes WHERE id = :id");
        $empl->bindParam(':id', $id);

        if ($empl->execute()) {
            http_response_code(200);
            echo json_encode(['message' => 'Employee deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to delete employee']);
        }
    }
}

?>